const setupStarter = 
`function setup () {
  createCanvas(200, 200);
  background('blue');
}`;

const mouseCirclesFun = code => {
  return `function setup () {
  createCanvas(200, 200);
  background('blue');
}

function draw () {
  ${code}
}`;
}

const mouseCircles = 
`function setup () {
  createCanvas(200, 200);
  background('blue');
}

function draw () {
  circle(mouseX, mouseY, 10);
}`;

const mouseCirclesSnippet = 
`circle(mouseX, mouseY, 10);`;

export {
    setupStarter,
    mouseCirclesFun,
    mouseCircles,
    mouseCirclesSnippet
};