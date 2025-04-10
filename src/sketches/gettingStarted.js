const firstSketch = 
`function setup() {
  createCanvas(200, 200);
  background('yellow');
}`;

const exploringColorsFun = code => {
  return `function setup() {
  createCanvas(200, 200);
  ${code}
}`;
};

// const exploringColorsSingleNum = 
// `function setup() {
//   createCanvas(200, 200);
//   background(180);
// }`;

const exploringColorsSingleNum = 
`background(180);`;

// const exploringColorsString = 
// `function setup() {
//   createCanvas(200, 200);
//   background('aqua');
// }`;

const exploringColorsString = 
`background('aqua');`;

// const exploringColorsRGB = 
// `function setup() {
//   createCanvas(200, 200);
//   background(180, 0, 240);
// }`;

const exploringColorsRGB = 
`background(180, 0, 240);`;

const hueRotateFun = code => {
  return `function setup() {
  createCanvas(200, 200);
  background(180, 0, 240);
}
  ${code}
`
}

const hueRotate = 
`function draw() {
  background(50, 0, frameCount);
}`;


const spriteStarter = 
`let shape;

function setup() {
  createCanvas(200, 200);
  shape = new Sprite();
}

function draw () {
}`;

const spriteFun = code => {
return `let shape;

function setup() {
  createCanvas(200, 200);
  background(200);
  
  shape = new Sprite();
  ${code}
}

function draw () {
}`;
};

const spriteDimensions = 
`let shape;

function setup() {
  createCanvas(200, 200);
  background(200);

  shape = new Sprite();
  shape.w = 50;
  shape.h = 50;
}

function draw () {

}`;

const circleSprite = 
`let shape;

function setup() {
  createCanvas(200, 200);
  background(200);

  shape = new Sprite();
  shape.d = 50;
}

function draw () {

}`;

const spritePosition = 
`let shape;

function setup() {
  createCanvas(200, 200);
  background(200);

  shape = new Sprite();
  shape.x = 50;
  shape.y = 50;
}

function draw () {

}`;

const spriteX = 
`shape.x = 50;`;

const spriteY = 
`shape.y = 50;`;

const gravityBroken = 
`let shape;

function setup() {
  createCanvas(200, 200);
  background(200);

  shape = new Sprite();

  world.gravity.y = 10;
}

function draw () {

}`;

const gravityFixed = 
`let shape;

function setup() {
  createCanvas(200, 200);
  shape = new Sprite();
  world.gravity.y = 10;
}

function draw () {
  background(200);
}`;

// const mouseCircles = 
// `function setup () {
//   createCanvas(200, 200);
//   background('blue');
// }

// function draw () {
//   circle(mouseX, mouseY, 10);
// }`;

export {
    firstSketch,
    exploringColorsFun,
    exploringColorsSingleNum,
    exploringColorsString,
    exploringColorsRGB,
    hueRotateFun,
    hueRotate,
    spriteStarter,
    spriteDimensions,
    circleSprite,
    spriteFun,
    spritePosition,
    spriteX,
    spriteY,
    gravityBroken,
    gravityFixed
    // mouseCircles
};