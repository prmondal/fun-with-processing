var ray, box, rayStart, rayEnd, isMousePressed = false

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ray = {
    start: null,
    end: null
  };

  box = {
    min: createVector(width / 2 - 100, height / 2 + 100),
    max: createVector(width / 2 + 100, height / 2 - 100)
  };
}

function draw() {
  background(0);
  var isIntersected = false;
  
  if(ray.start && ray.end) {
    var isIntersected = intersect(ray, box);
  
    if(!isIntersected) {
      stroke(255);
    } else {
      stroke(255, 0, 0);
    }
    
    line(ray.start.x, ray.start.y, ray.end.x, ray.end.y);
  }
  
  drawBox(box, isIntersected);
}

function drawBox(box, isIntersected) {
  if(!isIntersected) {
    stroke(255);
  } else {
    stroke(0, 255, 255);
  }
  
  noFill();
  rect(box.min.x, box.max.y, box.max.x - box.min.x, box.min.y - box.max.y);
}

function mousePressed() {
  isMousePressed = true;
  ray.start = createVector(mouseX, mouseY);
}

function mouseDragged() {
  if(isMousePressed) {
    ray.end = createVector(mouseX, mouseY);
  }
}

function mouseReleased() {
  isMousePressed = false;
}

function intersect(ray, box) {
  var rayDir = p5.Vector.sub(ray.end, ray.start).normalize();
  var tmin, tmax;
  
  //x-dim
  var txmin = (box.min.x - ray.start.x) / rayDir.x;
  var txmax = (box.max.x - ray.start.x) / rayDir.x;
  
  if(txmin > txmax) {
    var t = txmin, txmin = txmax, txmax = t;
  }
  
  //y-dim
  var tymin = (box.min.y - ray.start.y) / rayDir.y;
  var tymax = (box.max.y - ray.start.y) / rayDir.y;
  
  if(tymin > tymax) {
    var t = tymin, tymin = tymax, tymax = t;
  }
  
  //console.log("tymax: " + tymax + " , txmin: " + txmin);
  //console.log("tymin: " + tymin + " , txmax: " + txmax);
  
  if(tymax < txmin || tymin > txmax) return false;
  
  //update tmin and tmax
  tmin = Math.max(txmin, tymin);
  tmax = Math.min(txmax, tymax);
  
  //if nearest intersection length is more than the actual ray length line segment is not intersected
  if(tmin > p5.Vector.sub(ray.end, ray.start).mag()) return false;
  
  //draw hit point
  fill(0, 255, 0);
  ellipse(ray.start.x + rayDir.x * tmin, ray.start.y + rayDir.y * tmin, 10, 10);
  
  return true;
}

function swap(a, b) {
  var t = a;
  a = b;
  b = t;
}