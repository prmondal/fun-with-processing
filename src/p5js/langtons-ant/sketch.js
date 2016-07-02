var cells = [];
var cellSizeX = 10;
var cellSizeY = 10;
var cellColors = [{r: 0, g: 0, b: 0, label: 'color1'},
                  {r: 51, g: 51, b: 255, label: 'color2'}
                 ];

var rows = 50;
var cols = 50;
var gridOffsetX
var gridOffsetY;

var ant;
var antColor = {r: 255, g: 0, b: 0};

var iterations = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(1);
  
  //place at center
  gridOffsetX = width / 2 - cols * cellSizeX / 2;
  gridOffsetY = height / 2 - rows * cellSizeY / 2;
  
  initCells();
  
  //place ant in the center of the grid
  ant = new ant(Math.floor(rows / 2), Math.floor(cols / 2), rows, cols, cellSizeX / 2, cellSizeY / 2, antColor, cells);
}

function draw() {
  background(0);
  drawCells();
  ant.draw();
  drawInfo();
  
  update();
}

function drawInfo() {
  textSize(10);
  fill(255);
  text("Iterations: " + iterations, 15, 15);
}

function update() {
  ant.update();
  iterations++;
}

function initCells() {
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      cells.push(new cell(createVector(i * cellSizeX + gridOffsetX, j * cellSizeY + gridOffsetY), cellSizeX, cellSizeY, cellColors));
    }
  }
}

function drawCells() {
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      cells[j + i * cols].draw();
    }
  }
}