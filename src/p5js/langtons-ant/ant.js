function ant(cellX, cellY, rows, cols, width, height, color, cells) {
  this.cellX = cellX;
  this.cellY = cellY;
  this.width = width;
  this.height = height;
  this.color = color;
  
  //cell where ant resides now
  this.home = cells[cellY + cols * cellX];
  
  this.direction = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
  };
  
  this.currentDirection = this.direction.NORTH;
  this.home.isVisited = true;
  
  this.draw = function() {
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.home.pos.x, this.home.pos.y, this.home.width, this.home.height); //TODO: draw actual small ant
  }
  
  this.update = function() {
    if(this.currentDirection === this.direction.NORTH) {
      (this.home.currentColor.label === 'color1') ? this.cellX++ : this.cellX--;
      this.currentDirection = (this.home.currentColor.label === 'color1') ? this.direction.EAST : this.direction.WEST;
    } else if(this.currentDirection === this.direction.SOUTH) {
      (this.home.currentColor.label === 'color1')? this.cellX-- : this.cellX++;
      this.currentDirection = (this.home.currentColor.label === 'color1') ? this.direction.WEST : this.direction.EAST;
    } else if(this.currentDirection === this.direction.EAST) {
      (this.home.currentColor.label === 'color1') ? this.cellY++ : this.cellY--;
      this.currentDirection = (this.home.currentColor.label === 'color1') ? this.direction.SOUTH : this.direction.NORTH;
    } else if(this.currentDirection === this.direction.WEST) {
      (this.home.currentColor.label === 'color1') ? this.cellY-- : this.cellY++;
      this.currentDirection = (this.home.currentColor.label === 'color1') ? this.direction.NORTH : this.direction.SOUTH;
    }
    
    //update cell idx at boundary
    if(this.cellX < 0) this.cellX = cols - 1;
    if(this.cellX >= cols) this.cellX = 0;
    if(this.cellY < 0) this.cellY = rows - 1;
    if(this.cellY >= rows) this.cellY = 0;
    
    //toggle current cell color state
    this.home.toggleColor = !this.home.toggleColor;
    this.home = cells[this.cellY + cols * this.cellX];
    this.home.isVisited = true;
  }
};