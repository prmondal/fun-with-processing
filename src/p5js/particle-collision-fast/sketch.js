var canvas;
var timer = 0;
var numberOfParticles = 50;
var fps;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  fps = Math.ceil(frameRate());
  
  World.createRandomParticles(numberOfParticles);
}

function draw() {
  background(0);
  update();
  World.draw();
  
  if(millis() - timer >= 1000) {
    fps = Math.ceil(frameRate());
    timer = millis();
  }
  
  World.drawFPS(fps);
}

function update() {
  World.update();
}