const spriteStarter = 
`let shape;

function setup() {
  createCanvas(200, 200);
  shape = new Sprite();
}

function draw() {
}`;

const spriteFun = code => {
return `let shape;

function setup() {
  createCanvas(200, 200);
  background(200);
  
  shape = new Sprite();
  ${code}
}

function draw() {
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

function draw() {

}`;

const circleSprite = 
`let shape;

function setup() {
  createCanvas(200, 200);
  background(200);

  shape = new Sprite();
  shape.d = 50;
}

function draw() {

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

function draw() {

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

function draw() {

}`;

const gravityFixed = 
`let shape;

function setup() {
  createCanvas(200, 200);
  shape = new Sprite();
  world.gravity.y = 10;
}

function draw() {
  background(200);
}`;

const spriteMouseXY = 
`let shape;

function setup() {
  createCanvas(200, 200);
  shape = new Sprite();
}

function draw() {
  background(200);
  
  shape.x = mouse.x;
  shape.y = mouse.y;

}`;

const exploringSprites = 
`let shape;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(200);

  // shape = new Sprite();
  // shape.x = mouse.x;
  // shape.y = mouse.y;
}`;

const exploringSpritesStop = 
`let shape;

function setup() {
  createCanvas(400, 300);
  background(200);
}
`;

// const mouseCircles = 
// `function setup () {
//   createCanvas(200, 200);
//   background('blue');
// }

// function draw () {
//   circle(mouseX, mouseY, 10);
// }`;

export {
    spriteStarter,
    spriteDimensions,
    circleSprite,
    spriteFun,
    spritePosition,
    spriteX,
    spriteY,
    spriteMouseXY,
    exploringSprites,
    exploringSpritesStop,
    gravityBroken,
    gravityFixed
    // mouseCircles
};