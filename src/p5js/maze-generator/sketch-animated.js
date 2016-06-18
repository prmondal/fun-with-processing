var m = 40, 
    n = 40, 
    roomWidth = 20, 
    roomHeight = 20, 
    rooms = [],
    stack = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
  
  //start with random room
  var startRoomIdx = [Math.floor(random(0, m)), Math.floor(random(0, n))];
  var room = rooms[startRoomIdx[0] * n + startRoomIdx[1]];
  room.visited = true;
  stack.push(room);
  
  frameRate(20);
}

function draw() {
  background(0);
  
  var neighbours;
  var current;
  
  if(stack.length > 0) {
    current = stack[stack.length - 1];
    current.isPointer = true;
    neighbours = current.neighbours(m, n, rooms);
  }
  
  drawRooms();
  current.isPointer = false;
  
  if(neighbours && neighbours.length > 0) {
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
  } else {
    if(stack.length > 0) stack.pop();
  }
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