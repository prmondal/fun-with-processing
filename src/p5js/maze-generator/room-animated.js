function Room(idx, center, width, height) {
  this.idx = idx; // [i, j], i: row idx, j: col idx
  
  this.visited = false;
  
  this.walls = {
    west: true,
    south: true,
    east: true,
    north: true
  };
  
  this.isPointer = false;
  
  this.center = center;
  this.width = width;
  this.height = height;
  
  this.corners = {
    SW: createVector(this.center.x - this.width / 2, this.center.y + this.height / 2), 
    SE: createVector(this.center.x + this.width / 2, this.center.y + this.height / 2),
    NE: createVector(this.center.x + this.width / 2, this.center.y - this.height / 2),
    NW: createVector(this.center.x - this.width / 2, this.center.y - this.height / 2)
  }
}

//return unvisited neighbours
//input- m: #grid rows, n: #grid cols, rooms: rooms grid array
Room.prototype.neighbours = function(m, n, rooms) {
  var neighbours = [];
  var room;
  
  //west room
  if(this.idx[1] - 1 >= 0) {
    room = rooms[this.idx[0] * n + this.idx[1] - 1];
    if(!room.visited) neighbours.push(room);
  }
  
  //south room
  if(this.idx[0] + 1 < m) {
    room = rooms[(this.idx[0] + 1) * n + this.idx[1]];
    if(!room.visited) neighbours.push(room);
  }
  
  //east room
  if(this.idx[1] + 1 < n) {
    room = rooms[this.idx[0] * n + this.idx[1] + 1];
    if(!room.visited) neighbours.push(room);
  }
  
  //north room
  if(this.idx[0] - 1 >= 0) {
    room = rooms[(this.idx[0] - 1) * n + this.idx[1]];
    if(!room.visited) neighbours.push(room);
  }
  
  return neighbours;
};

Room.prototype.draw = function() {
  //paint room
  noStroke();
  
  if(this.isPointer) {
    fill(255, 0, 0);
    rect(this.corners.NW.x, this.corners.NW.y, this.width, this.height);
  } else if(this.visited) {
    fill(0, 0, 153);
    rect(this.corners.NW.x, this.corners.NW.y, this.width, this.height);
  }
  
  stroke(255);
  
  //draw west wall
  if(this.walls.west) line(this.corners.SW.x, this.corners.SW.y, this.corners.NW.x, this.corners.NW.y);
  
  //draw south wall
  if(this.walls.south) line(this.corners.SW.x, this.corners.SW.y, this.corners.SE.x, this.corners.SE.y);
  
  //draw east wall
  if(this.walls.east) line(this.corners.SE.x, this.corners.SE.y, this.corners.NE.x, this.corners.NE.y);
  
  //draw north wall
  if(this.walls.north) line(this.corners.NW.x, this.corners.NW.y, this.corners.NE.x, this.corners.NE.y);
};