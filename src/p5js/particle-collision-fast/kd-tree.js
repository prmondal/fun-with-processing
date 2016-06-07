function node() {
  this.data = 0;
  this.left = null;
  this.right = null;
}

function kdTree(k) {
  this.list = [];
  this.k = k;
  this.best = null;
  this.bestDist = Infinity;
  this.size = 0;
  this.root = null;
  
  this.manhattanDist = function(splitDimension, p1, p2) {
    if(splitDimension === 0) {
      return Math.abs(p1.pos.x - p2.pos.x);
    } else if(splitDimension === 1){
      return Math.abs(p1.pos.y - p2.pos.y);
    }
  };
}

//build kd-tree from list
kdTree.prototype.buildFromList = function(depth, s, e, list) {
  if(s > e) return null;
  
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
  
  var root = new node();
  root.data = list[m].clone();
  root.left = this.buildFromList(depth + 1, s, m - 1, list.slice(s, m));
  root.right = this.buildFromList(depth + 1, m + 1, e, list.slice(m + 1, e + 1));
  
  this.size++;
  this.list.push(root.data);
  
  return root;
};

kdTree.prototype.build = function(list) {
  if(list.length === 0) return;
  this.root = this.buildFromList(0, 0, list.length - 1, list);
};

kdTree.prototype.insert = function(root, p, depth) {
  if(!root) {
    root = new node();  
    root.data = p;
    this.size++;
    
    return root;
  }
  
  if(root.data.pos.equals(p.oos)) return; //dont insert duplicate
  
  var sd = depth % this.k;
  
  if(sd === 0) {
    if(p.pos.x < root.data.pos.x) {
      root.left = this.insert(root.left, p, depth + 1);
    } else {
      root.right = this.insert(root.right, p, depth + 1);
    } 
  } else if(sd === 1) {
    if(p.pos.y < root.data.pos.y) {
      root.left = this.insert(root.left, p, depth + 1);
    } else {
      root.right = this.insert(root.right, p, depth + 1);
    } 
  }
  
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

//Implement 2-NN to avoid getting same particle against the particle queried
kdTree.prototype.findNearest = function(root, queryPoint, distanceFn, depth) {
  if(!root) return;
  
  //TODO 
  if(root.data.pos.equals(queryPoint.pos)) {
    this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
    this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
    
    return;
  }
  
  //compare query point with current node data
  var currDist = distanceFn(queryPoint, root.data); //distance squared
  
  //update nearest
  if(currDist < this.bestDist) {
    this.best = root.data;
    this.bestDist = currDist;
  }
  
  //recur to specific subtree depends on splitting dimension
  var sd = depth % this.k;
  var manhattanDist = this.manhattanDist(sd, queryPoint, root.data);
  
  if(manhattanDist < 0) {
    this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
  } else {
    this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
  }
  
  //check if the hypersphere with best distance crosses the splitting hyperplane
  //if so check in other subtree to find the nearest
  if(manhattanDist < this.bestDist) {//CHECK squared
    //check in other subtree
    if(manhattanDist < 0) {
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
