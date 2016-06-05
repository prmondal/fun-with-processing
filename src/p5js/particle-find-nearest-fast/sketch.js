var canvas;
var numOfParticles = 500;
var nearest = null;

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

function mousePressed() {
  if(mouseButton === LEFT) {
    //restore last one if click happens quickly on the canvas
    if(nearest) nearest.color = nearest.oldColor
    
    //update nearest
    nearest = World.getNearest(mouseX, mouseY);
    nearest.color = {r: 255, g: 255, b: 255};
  }
  
  //highlight nearest
  setTimeout(function(){nearest.color = nearest.oldColor}, 100);
}