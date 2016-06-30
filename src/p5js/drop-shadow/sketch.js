var shapeW = 200;
var shapeH = 100;
var offset = 5;
var angle = Math.PI / 2;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(255);
  
  fill(100);
  push();
  translate(width/2, height/2);
  translate(2 * offset, offset / 2);
  rotate(angle);
  translate(-width/2, -height/2);
  rect(width / 2 - shapeW / 2 + offset, height / 2 - shapeH / 2 + offset, shapeW, shapeH);
  pop();
  
  fill(0);
  push();
  translate(width/2, height/2);
  rotate(angle);
  translate(-width/2, -height/2);
  rect(width / 2 - shapeW / 2, height / 2 - shapeH / 2, shapeW, shapeH);
  pop();
}

function mousePressed() {
  if(mouseButton === LEFT) {
    angle += Math.PI / 18;
  }
}