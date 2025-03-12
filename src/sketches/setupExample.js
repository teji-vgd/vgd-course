const setupStarter = 
`function setup () {
  createCanvas(200, 200);
  background('blue');
}`;

const mouseCircles = 
`function setup () {
  createCanvas(200, 200);
  background('blue');
}

function draw () {
  circle(mouseX, mouseY, 10);
}`;

export {
    setupStarter,
    mouseCircles
};