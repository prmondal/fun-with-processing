var walkers = [];
var canvas;

function setup() {
  canvas = createCanvas(800, 600);
  
  canvas.mouseClicked(function() {
    walkers.push(new walker(mouseX, mouseY));
  });
}

function draw() {
  background(0);
  
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

