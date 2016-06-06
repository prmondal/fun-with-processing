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
  
  this.root = this.build(0, 0, this.list.length - 1, this.list);
}

//build kd-tree
kdTree.prototype.build = function(depth, s, e, list) {
  if(s > e) return null;
  
  var splittingDimension = depth % this.k;
  
  //sort to find median in splitting dimension
  list.sort(function(a, b) {
    if(splittingDimension === 0) {
      return a.pos.x - b.pos.x;
    } else if(splittingDimension === 1) {
      return a.pos.y - b.pos.y;
    }
  });
  
  //update range
  s = 0;
  e = list.length - 1;
  
  var m = Math.ceil(s + (e - s) / 2);
  
  var root = new node();
  root.data = list[m];
  root.left = this.build(depth + 1, s, m - 1, list.slice(s, m));
  root.right = this.build(depth + 1, m + 1, e, list.slice(m + 1, e + 1));
  
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
  
  //compare query point with current node data
  var currDist = distanceFn(root.data, queryPoint); //distance squared
  
  //update nearest
  if(currDist < this.bestDist) {
    this.best = root.data;
    this.bestDist = currDist;
  }
  
  //recur to specific subtree depends on splitting dimension
  var sd = depth % this.k;
  var compare = (sd === 0) ? queryPoint.pos.x < root.data.pos.x : queryPoint.pos.y < root.data.pos.y; //TODO: general
  
  if(compare) 
    this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
  else
    this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
    
  //check if the hypersphere with best distance crosses the splitting hyperplane
  //if so check in other subtree to find the nearest
  var manhattanDist = (sd === 0) ? Math.abs(queryPoint.pos.x - root.data.pos.x) : Math.abs(queryPoint.pos.y - root.data.pos.y);
  
  if(manhattanDist < this.bestDist) {
    //check in other subtree tree
    if(compare) 
      this.findNearest(root.right, queryPoint, distanceFn, depth + 1);
    else
      this.findNearest(root.left, queryPoint, distanceFn, depth + 1);
    }
};

kdTree.prototype.reset = function() {
  this.best = null;
  this.bestDist = Infinity;
};
