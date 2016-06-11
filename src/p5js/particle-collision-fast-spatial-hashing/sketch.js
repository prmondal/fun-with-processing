var canvas;
var timer = 0;
var maxNumberOfParticles = 100;
var fps;

function setup() {
  canvas = createCanvas(800, 600);
  fps = Math.ceil(frameRate());
  
  World.createRandomParticles(maxNumberOfParticles);
}

function draw() {
  background(0);
  update();
  World.draw();
  
  if(millis() - timer >= 1000) {
    fps = Math.ceil(frameRate());
    timer = millis();
  }
  
  if(World.drawFPS) World.drawFPS(fps);
}

function update() {
  World.update();
}

function mousePressed() {
  if(mouseButton === LEFT) {
    if(World.debugDraw) World.highlightNearest(createVector(mouseX, mouseY));
  }
}