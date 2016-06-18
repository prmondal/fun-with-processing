var m = 40, 
    n = 40, 
    roomWidth = 10, 
    roomHeight = 10, 
    rooms = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
  generateMaze();
}

function draw() {
  background(0);
  
  drawRooms();
}

function initGrid() {
  for(var i = 0; i < m; i++) {
    for(var j = 0; j < n; j++) {
      var center = createVector(roomWidth / 2 + j * roomWidth, roomHeight / 2 + i * roomHeight);
      center.add(createVector((width - n * roomWidth) / 2, (height - m * roomHeight) / 2)); //place the grid at center of window
      
      rooms.push(new Room([i, j], center, roomWidth, roomHeight));
    }
  }
}

function drawRooms() {
  rooms.forEach(function(room) {room.draw();});
}

function generateMaze() {
  var stack = [];
  var startRoomIdx = [Math.floor(random(0, m)), Math.floor(random(0, n))];
  
  //mark visited
  var room = rooms[startRoomIdx[0] * n + startRoomIdx[1]];
  room.visited = true;
  
  stack.push(room);
  
  //dfs with random strategy 
  while(stack.length !== 0) {
    var current = stack[stack.length - 1];
    var neighbours = current.neighbours(m, n, rooms);
    
    if(neighbours.length === 0) {
      stack.pop();
      continue;
    }
    
    //pick neighbour room randomly
    var pickedRoom = neighbours[Math.floor(random(0, neighbours.length))];
    
    //break the wall
    if(pickedRoom.idx[1] > current.idx[1]) {//east wall
      current.walls.east = false;
      pickedRoom.walls.west = false;
    }
    
    if(pickedRoom.idx[1] < current.idx[1]) {//west wall
      current.walls.west = false;
      pickedRoom.walls.east = false;
    }
    
    if(pickedRoom.idx[0] > current.idx[0]) {//south wall
      current.walls.south = false;
      pickedRoom.walls.north = false;
    }
    
    if(pickedRoom.idx[0] < current.idx[0]) {//north wall
      current.walls.north = false;
      pickedRoom.walls.south = false;
    }
    
    pickedRoom.visited = true;
    stack.push(pickedRoom);
  }
}