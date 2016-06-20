var particles = [];
var mousePos = [];
var numberParticle = 40;
var particleSize = 40;
var prevMouseX, prevMouseY; //needed for mousemove bug. mousemove always called
var isMouseMoved = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initParticles();
}

function draw() {
  background(0);
  
  for(var i = 0; i < mousePos.length; i++) {
    particles[i].pos = mousePos[i];
    particles[i].size = particleSize * i / mousePos.length;
    particles[i].color.a = i * 255 / mousePos.length;
  }
  
  //draw particles
  for(var i = 0; i < mousePos.length; i++) {
    particles[i].draw();
  }
}

function mouseMoved() {
  var currMouseX = mouseX,
      currMouseY = mouseY;
  
  isMouseMoved = true;
  
  if(prevMouseX && prevMouseY) {
    if(Math.abs(currMouseX - prevMouseX) < 0.01 && Math.abs(currMouseY - prevMouseY) < 0.01) {
      isMouseMoved = false;
      mousePos = [];
      return;
    }
  }
  
  if(mousePos.length >= numberParticle) {
    mousePos.shift();
  }
  
  mousePos.push(createVector(currMouseX, currMouseY));
  
  prevMouseX = currMouseX;
  prevMouseY = currMouseY;
  
  return false;
}

function initParticles() {
  for(var i = 0; i < numberParticle; i++) {
    particles.push(new particle(null, particleSize, {r: 128, g: 128, b: 128, a: 255}));
  }
}