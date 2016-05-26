var walkers = [];
var numberWalkers;
var canvas;
var fishTankBackground;
var winWidth = 1600;
var winHeight = 900;
var sprites = [];

function loadSprites() {
    sprites.push(loadImage("asset/fish-animation/1.png"));
    sprites.push(loadImage("asset/fish-animation/2.png"));
    sprites.push(loadImage("asset/fish-animation/3.png"));
    sprites.push(loadImage("asset/fish-animation/4.png"));
    sprites.push(loadImage("asset/fish-animation/5.png"));
    sprites.push(loadImage("asset/fish-animation/6.png"));
}

function setup() {
  canvas = createCanvas(winWidth, winHeight);
  numberWalkers = round(random(10, 15));
  fishTankBackground = loadImage("asset/background2.jpg");
  loadSprites();
  createWalkers();
}

function createWalkers() {
  for(var i = 0; i < numberWalkers; i++) {
    var sdf = random(2, 4);
    walkers.push(new walker(random(2 * sprites[0].width / sdf, width - 2 * sprites[0].width / sdf), random(2 * sprites[0].height / sdf, height - 2 * sprites[0].height / sdf), sdf));
  }
}

function draw() {
  background(fishTankBackground);
  
  drawWalkers();
  updateWalkers();
}

function drawWalkers() {
  walkers.forEach(function(w) {
    w.draw();
  });
}

function updateWalkers() {
  walkers.forEach(function(w) {
    w.update();
  });
}

