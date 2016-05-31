var canvas;
var numOfParticles = 10;
var pickedParticle;
var lastMousePos, mouseDirection;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  World.createRandomParticles(numOfParticles);
}

function draw() {
  background(0);
  update();
  World.draw();
  
  if(pickedParticle && mouseDirection) {
    var lineEnd = pickedParticle.pos.copy().add(mouseDirection.copy().mult(pickedParticle.size * 2));
    
    stroke(255, 0, 255);
    line(pickedParticle.pos.x, pickedParticle.pos.y, lineEnd.x, lineEnd.y); 
  }
}

function update() {
  World.update();
}

function mousePressed() {
  lastMousePos = createVector(mouseX, mouseY);
  pickedParticle = World.mousePick(lastMousePos);
}

function mouseDragged() {
  mouseDirection = createVector(mouseX, mouseY).sub(lastMousePos).normalize();
}

function mouseReleased() {
   if(pickedParticle && mouseDirection) {
      pickedParticle.velocity = mouseDirection.mult(50);
      pickedParticle = null;
      mouseDirection = null;
  }
}
