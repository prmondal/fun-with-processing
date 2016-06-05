function node() {
  this.data = 0;
  this.left = null;
  this.right = null;
}

function kdTree(list, k) {
  this.list = list;
  this.k = k;
  this.best = null;
  this.bestDist = Infinity;
  
  this.copy = function(list, s, e) {
    var copyList = [];
  
    for(var i = s; i <= e; i++) copyList.push(list[i]);
    return copyList;
  };
  
  this.closeBoundaryPoint = function(p1, p2) {
    var dir = p1.pos.copy().sub(p2.pos).normalize();
    var closestBoundaryPoint = p2.pos.copy().add(dir.mult(p2.size / 2));
    return closestBoundaryPoint;
  };
  
  //p1: queryPoint, p2: root.data
  this.compareFn = function(splitDimension, p1, p2) {
    var closestBoundaryPoint = this.closeBoundaryPoint(p1, p2);
      
    if(splitDimension === 0) {
      return p1.pos.x < closestBoundaryPoint.x;
    } else if(splitDimension === 1){
      return p1.pos.y < closestBoundaryPoint.y;
    }
  };
  
  this.compareSortFn = function(splitDimension, p1, p2) {
    var closestBoundaryPoint = this.closeBoundaryPoint(p1, p2);
      
    if(splitDimension === 0) {
      return p1.pos.x - closestBoundaryPoint.x;
    } else if(splitDimension === 1){
      return p1.pos.y - closestBoundaryPoint.y;
    }
  };
  
  this.manhattanDist = function(splitDimension, p1, p2) {
    var closestBoundaryPoint = this.closeBoundaryPoint(p1, p2);
    
    if(splitDimension === 0) {
      return Math.abs(p1.pos.x - closestBoundaryPoint.x);
    } else if(splitDimension === 1){
      return Math.abs(p1.pos.y - closestBoundaryPoint.y);
    }
  };
  
  this.root = this.build(0, 0, this.list.length - 1, this.list);
}

//build kd-tree
kdTree.prototype.build = function(depth, s, e, list) {
  if(s > e) return null;
  
  var self = this;
  var sd = depth % this.k;
  
  list.sort(function(a, b) {
    if(sd === 0) {
      return a.pos.x - b.pos.x;
    } else if(sd === 1) {
      return a.pos.y - b.pos.y;
    }
  });
  
  //update range
  s = 0;
  e = list.length - 1;
  
  var m = Math.ceil(s + (e - s) / 2);
  var leftList = this.copy(list, s, m - 1);
  var rightList = this.copy(list, m + 1, e);
  
  var root = new node();
  
  root.data = list[m];
  root.left = this.build(depth + 1, s, m - 1, leftList);
  root.right = this.build(depth + 1, m + 1, e, rightList);
  
  return root;
};

kdTree.prototype.traverse = function(root) {
  if(!root) return;
  
  //support general kdtree
  this.traverse(root.left);
  console.log("(" + root.data.pos.x + ", " + root.data.pos.y + ")");
  this.traverse(root.right);
  
  return;
};

kdTree.prototype.findNearest = function(root, queryPoint, distanceFn, depth) {
  if(!root) return;
  
  //if the query point is same as the center of one of the particles check in both subtree
  //it reduces performance need to check
  /*if(root.data.pos.equals(queryPoint.pos)) {
    this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
    this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
    
    return;
  }*/
  
  //compare query point with current node data
  var currDist = distanceFn(queryPoint, root.data); //distance squared
  
  //update nearest
  if(currDist < this.bestDist) {
    this.best = root.data;
    this.bestDist = currDist;
  }
  
  //recur to specific subtree depends on splitting dimension
  var sd = depth % this.k;
  var compare = this.compareFn(sd, queryPoint, root.data);
  
  if(compare) {
    this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
  } else {
    this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
  }
  
  //check if the hypersphere with best distance crosses the splitting hyperplane
  //if so check in other subtree to find the nearest
  var manhattanDist = this.manhattanDist(sd,  queryPoint, root.data);
  
  if(manhattanDist < this.bestDist) {
    //check in other subtree tree
    if(compare) {
      this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
    } else {
      this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
    }
  }
};

kdTree.prototype.reset = function() {
  this.best = null;
  this.bestDist = Infinity;
};
