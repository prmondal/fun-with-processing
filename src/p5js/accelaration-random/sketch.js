var walkers = [];
var numberOfWalkers = 40;

function setup() {
  createCanvas(600, 600);
  
  createWalkers();
}

function draw() {
  background(0);
  
  drawWalkers();
  updateWalkers();
}

function createWalkers() {
  for(var i = 0; i < numberOfWalkers; i++) {
    walkers.push(new walker());
  }
}

function drawWalkers() {
  for(var i = 0; i < numberOfWalkers; i++) {
    walkers[i].draw();
  }
}

function updateWalkers() {
  for(var i = 0; i < numberOfWalkers; i++) {
    walkers[i].update();
  }
}

