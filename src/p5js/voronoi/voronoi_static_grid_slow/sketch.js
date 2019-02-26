let w = 400;
let h = 400;
let siteSpaceX = w/5;
let siteSpaceY = h/5;
let siteRadius = 0.15*siteSpaceX;
let filledSmoothVoronoi = true;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(p) {
    return this.x == p.x && this.y == p.y;
  }
}

let DISTANCE_TYPE = {
  "EUCLIDEAN": 1,
  "MANHATTAN": 2
};

let distanceType = DISTANCE_TYPE.EUCLIDEAN;
let sites = [];
let voronoiMap = null;

function distance(p1, p2) {
  if (distanceType == DISTANCE_TYPE.EUCLIDEAN) {
    return dist(p1.x, p1.y, p2.x, p2.y);
  } else {
    return abs(p1.x - p2.x) + abs(p1.y - p2.y);
  }
}

function initSites() {
  for (let i = siteSpaceX; i < w; i += siteSpaceX) {
    for (let j = siteSpaceY; j < h; j += siteSpaceY) {
      sites.push(new Point(i, j));
    }
  }
}

function initVoronoiMap() {
  voronoiMap = new Array(w * h);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      voronoiMap[i + w * j] = {
        minDist: Number.MAX_VALUE,
        nearest: null
      };
    }
  }
}

function drawSites() {
  for (const s of sites) {
    fill(0, 120, 255);
    noStroke();
    ellipse(s.x, s.y, siteRadius, siteRadius);
  }
}

function drawVoronoi() {
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let pixCoord = new Point(x, y);
      let v = voronoiMap[x + y * w];

      for (const s of sites) {
        let siteDist = distance(s, pixCoord);

        if (abs(siteDist - v.minDist) < 1e-5) {
          if (!v.nearest[0].isEqual(s)) v.nearest.push(s);
        } else if (siteDist < v.minDist) {
          v.minDist = siteDist;
          v.nearest = [s];
        }
      }
			
      if(filledSmoothVoronoi) {
        if(v.minDist >= siteRadius/2) {
          let b = 255 * (siteSpaceX - v.minDist) / siteSpaceX;
          b = constrain(b, 0, 255);
        	stroke(b);
        	point(x,y);
        }
      } else {
      	//draw edges (points with more than one nearest site)
        if (v.nearest.length > 1) {
          stroke(255, 0, 0);
          point(x, y);
        }
      }
    }
  }
}

function setup() {
  createCanvas(w, h);
  noLoop();

  initSites();
  initVoronoiMap();
}

function draw() {
  background(255);

  drawSites();
  drawVoronoi();
}