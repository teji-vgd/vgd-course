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
`let sprite;

function setup() {
  createCanvas(200, 200);
  sprite = new Sprite();
}

function draw () {
}`;

const spriteFun = code => {
return `let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);
  
  sprite = new Sprite();
  ${code}
}

function draw () {
}`;
};

const spriteDimensions = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);

  sprite = new Sprite();
  sprite.w = 50;
  sprite.h = 50;
}

function draw () {

}`;

const circleSprite = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);

  sprite = new Sprite();
  sprite.d = 50;
}

function draw () {

}`;

const spritePosition = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);

  sprite = new Sprite();
  sprite.x = 50;
  sprite.y = 50;
}

function draw () {

}`;

const spriteX = 
`sprite.x = 50;`;

const spriteY = 
`sprite.y = 50;`;

const gravityBroken = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);

  sprite = new Sprite();

  world.gravity.y = 10;
}

function draw () {

}`;

const gravityFixed = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  sprite = new Sprite();
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