var canvas;
var numOfParticles = 50;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  World.createRandomParticles(numOfParticles);
}

function draw() {
  background(0);
  update();
  World.draw();
}

function update() {
  World.update();
}