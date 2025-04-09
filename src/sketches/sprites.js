const spriteStarter = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  sprite = new Sprite();
}

function draw() {
}`;

const spriteFun = code => {
return `let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);
  
  sprite = new Sprite();
  ${code}
}

function draw() {
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

function draw() {

}`;

const circleSprite = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  background(200);

  sprite = new Sprite();
  sprite.d = 50;
}

function draw() {

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

function draw() {

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

function draw() {

}`;

const gravityFixed = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  sprite = new Sprite();
  world.gravity.y = 10;
}

function draw() {
  background(200);
}`;

const spriteMouseXY = 
`let sprite;

function setup() {
  createCanvas(200, 200);
  sprite = new Sprite();
}

function draw() {
  background(200);
  
  sprite.x = mouse.x;
  sprite.y = mouse.y;

}`;

const exploringSprites = 
`let sprite;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(200);

  sprite = new Sprite();
  sprite.x = mouse.x;
  sprite.y = mouse.y;

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
    spriteStarter,
    spriteDimensions,
    circleSprite,
    spriteFun,
    spritePosition,
    spriteX,
    spriteY,
    spriteMouseXY,
    exploringSprites,
    gravityBroken,
    gravityFixed
    // mouseCircles
};