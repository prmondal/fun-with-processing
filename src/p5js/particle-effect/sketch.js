var canvas;
var winWidth = 800;
var winHeight = 600;
var numOfParticles = 1;

var mousePingPongForce = 0.5;
var mousePingPongForceEnabled = false;

var blowStrength = 5;
var blowUpEnabled = true;
var isBlown = false;

function setup() {
  canvas = createCanvas(winWidth, winHeight);
  World.createRandomParticles(numOfParticles);
}

function draw() {
  background(0);
  update();
  World.draw();
}

function update() {
  World.update();
  
  //click mouse button to move particles up defying gravity and release to fall
  if(blowUpEnabled) {
    if(mouseIsPressed) {
      if(!isBlown) {
        World.particles.forEach(function(p) {p.applyForce(createVector(0, -blowStrength));});
        isBlown = true;
      }
    } else {
      if(isBlown) {
        World.particles.forEach(function(p) {p.applyForce(createVector(0, blowStrength));});
        isBlown = false;
      }
    }
  }
}

function mousePressed() {
  if(mousePingPongForceEnabled) {
    if(mouseButton === LEFT) {
      World.particles.forEach(function(p) {p.applyForce(createVector(0, -mousePingPongForce));});
    } else if(mouseButton === RIGHT) {
      World.particles.forEach(function(p) {p.applyForce(createVector(0, mousePingPongForce));});
    }
  }
}