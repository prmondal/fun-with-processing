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
    
    //find nearest for selected ball
    for(var i = 0, l = World.particles.length; i < l; i++) {
      if(World.particles[i].contains(createVector(mouseX, mouseY))) {
        nearest = World.particles[i].nearest;
        nearest.color = {r: 255, g: 255, b: 255};
        break;
      }
    }
  }
  
  //highlight nearest
  setTimeout(function(){if(nearest) nearest.color = nearest.oldColor}, 100);
}