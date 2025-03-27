/* Mini Editor Library, adapted (and react-ified) from https://github.com/quinton-ashley/mie */

import p5Convert from './p5-global2instance/p5-global2instance';

let mie = {};

mie.lang ??= {
	js: {
		// eslint-disable-next-line no-unused-vars
		play: function (code) {}
	}
};
mie.bases = {};

mie.lang.p5 = {};

mie.lang.p5.functionNames = [
	'preload',
	'setup',
	'update',
	'draw',
	'drawFrame',
	'postProcess',
	'keyPressed',
	'keyReleased',
	'keyTyped',
	'mouseMoved',
	'mouseDragged',
	'mousePressed',
	'mouseReleased',
	'mouseClicked',
	'touchStarted',
	'touchMoved',
	'touchEnded',
	'windowResized'
];

mie.lang.p5.play = function (code, previewElem) {
    // TODO WIP handle having a base sketch
	if (!code.includes('function setup')) {
		code = mie.bases[this.base || 0] + code + '}';
	}

    const s = ($_p) => {
        console.log("Input Code: ", code);

        // Convert global mode p5js sketch into instance mode (e.g. everything in the sketch is namespaced)
        let mySketchStr = p5Convert(code);
        console.log("p5Convert output: ", mySketchStr);

        // Remove outer wrapper function so that the input string is just the set of functions that would be in
        // a p5 sketch (e.g. setup, draw, etc.);
        mySketchStr = mySketchStr.replace('const sketch = function ($_p) {\n', '');
        mySketchStr = mySketchStr.slice(0, mySketchStr.lastIndexOf('};'));

        // Replacement for: with (p) eval(code)
        eval(`
            var { ${Object.keys($_p).join(",")} } = $_p;
            ${mySketchStr}
        `);
    }
    
    // p5 and p5play are now pulled in from top level script tags
    // eslint-disable-next-line no-undef
    return new p5(s, previewElem.current);
};

mie.lang.q5 = mie.lang.p5;

export default mie;