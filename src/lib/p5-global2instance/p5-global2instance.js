/* Adapted from p5-global2instance (converted to ES6 style code): https://github.com/DrSensor/p5-global2instance */

import escodegen from 'escodegen';
import esquery from 'esquery';
import estemplate from 'estemplate';
// eslint-disable-next-line no-undef
const esprima = require('esprima'); // Vite plugin handles the 'require'

import { p5scopeFuncs, p5vars, p5funcs } from './list-p5func.js';
import opts from './config.js';

var instance = 'sketch';

const ast2code = (ast, options = opts) => escodegen.generate(ast, options.escodegen).code;
const code2ast = (code, options = opts) => esprima.parseModule(code, options.esprima);


// eslint-disable-next-line no-unused-vars
const printAST = (ast) => {
  const asts = estemplate('%= body%', { body: ast });
  console.log(ast2code(asts));
}


const wrapP5Scope = (ast) => {
  let code = ast2code(ast);
  for (const p5var of p5vars) {
    code = code.replace(new RegExp(`([^.\\w])(${p5var})[;\\s]?`, 'gm'), (match, p1, p2) => `${p1}${instance}.${p2}`);
  }
  for (const p5func of p5funcs) {
    code = code.replace(new RegExp(`([^.\\w])(${p5func}[(])`, 'gm'), (match, p1, p2) => `${p1}${instance}.${p2}`);
  }
  return code2ast(code);
}


const wrapP5Func = (ast) => {
  if (!['VariableDeclaration', 'FunctionDeclaration'].includes(ast.type)) {
    throw Error(`wrong type ${ast.type}`);
  }

  const name = ast.id ? ast.id.name : ast.declarations[0].id.name;
  const expr = ast.id ? ast : ast.declarations[0].init;

  if (p5scopeFuncs.includes(name)) {
    expr.id.name = null;
    ast = estemplate(`${instance}.${name} = <%= expr%>`, {
      expr: expr
    });
  }
  return wrapP5Scope(ast);
}

const wrapP5Funcs = ASTs => ASTs.map(wrapP5Func);


export default (sourceCode, options = opts) => {
  instance = options.instance;

  // Updated so that it doesn't export sketch as a module, instead it's just a function
  // (this function wrapper gets trimmed later by play function inside mie lib)
  const templateCode = `
  const sketch = function (${instance}) {
    %= p5Main %
  }
  `;

  // https://github.com/estools/estemplate#advanced-generation-with-source-map
  const template = estemplate.compile(templateCode, options.esprima);
  const source = esprima.parseModule(sourceCode, options.esprima);

  let vars = esquery(source, 'VariableDeclaration');
  let funcs = esquery(source, 'FunctionDeclaration');
  let ast = template({
    p5Main: vars.concat(wrapP5Funcs(funcs))
  });

  let output = escodegen.generate(ast, options.escodegen).code;
  if (output.includes('p5.')) output = `import p5 from 'p5'\n${output}`;
  return output;
}
