function SpatialHash(width, height, cellSize) {
  this.width = width;
  this.height = height;
  this.cellSize = cellSize;
  
  this.gridSize = Math.floor((this.width * this.height) / (this.cellSize * this.cellSize));
  this.buckets = [];
  
  //create buckets
  this.fill = function() {
    for(var i = 0; i < this.gridSize; i++) this.buckets.push([]);
  };
  
  this.fill();
}

//hash - index of grid cell where the object falls into
SpatialHash.prototype.getHash = function getHash(point) {
  return Math.floor(point.x / this.cellSize) + Math.floor(point.y / this.cellSize) * this.width / this.cellSize;
};

SpatialHash.prototype.getCollidedBucketsIdx = function(obj) {
  var collidedBucketsIdx = [];
  
  //object can span upto multiple cells
  //use bbox of object to find all overlapping cells and add this object to buckets to corresponding cells
  var bb = obj.getBBox(),
      bbMin = bb.min,
      bbMax = bb.max;
      
  var topLeftCell = this.getHash(bbMin),
      topRightCell = this.getHash(createVector(bbMax.x, bbMin.y)),
      downLeftCell = this.getHash(createVector(bbMin.x, bbMax.y)),
      downRightCell = this.getHash(bbMax);
  
  //insert this object in all overlapping cell's buckets
  for(var i = topLeftCell; i <= topRightCell; i++) {
    for(var j = i, verticalCellIndexStepSize = this.width / this.cellSize; j <= downRightCell; j += verticalCellIndexStepSize) {
      collidedBucketsIdx.push(j);
    }
  }
  
  return collidedBucketsIdx;
};

SpatialHash.prototype.insert = function(obj) {
  if(!obj) return;
  
  var self = this;
  var collidedBucketsIdx = this.getCollidedBucketsIdx(obj);

  collidedBucketsIdx.forEach(function(idx) {
    if(self.buckets[idx])self.buckets[idx].push(obj.clone());
  });
};

//broad phase
SpatialHash.prototype.findNearest = function(obj) {
  if(!obj) return;
  
  var self = this;
  var collidedBucketsIdx = this.getCollidedBucketsIdx(obj);
  
  //remove duplicate and create a new list of all possible colliding objects
  var nearbyObjectSet = new buckets.Set(function(obj) {return obj.pos.x + ' ' + obj.pos.y;});
  
  collidedBucketsIdx.forEach(function(idx) {
    if(self.buckets[idx]) self.buckets[idx].forEach(function(o) {
      if(!obj.equals(o))
        nearbyObjectSet.add(o);
    });
  });
  
  //narrow phase
  //check for possible collision with the nearbyObjectSet
  var minDistance = Infinity,
      best = null;
  
  nearbyObjectSet.forEach(function(o) {
    var distance = obj.getSqauredDistance(o);
    
    if(distance < minDistance) {
      minDistance = distance;
      best = o;
    }
  });
  
  return best;
};

SpatialHash.prototype.findNearby = function(obj) {
  if(!obj) return;
  
  var self = this;
  var collidedBucketsIdx = this.getCollidedBucketsIdx(obj);
  
  //remove duplicate and create a new list of all possible colliding objects
  var nearbyObjectSet = new buckets.Set(function(obj) {return obj.pos.x + ' ' + obj.pos.y;});
  
  collidedBucketsIdx.forEach(function(idx) {
    if(self.buckets[idx]) self.buckets[idx].forEach(function(o) {
      if(!obj.equals(o))
        nearbyObjectSet.add(o);
    });
  });
  
  return nearbyObjectSet.toArray();
};

SpatialHash.prototype.clear = function() {
  this.buckets = [];
  this.fill();
};

SpatialHash.prototype.build = function(list) {
  var self = this;
  
  list.forEach(function(o) {
    self.insert(o);
  });
};
