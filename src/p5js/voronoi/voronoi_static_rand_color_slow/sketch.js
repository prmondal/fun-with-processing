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

let CELL_COLORS = [
  {r:255, g:0, b:0},
  {r:0, g:255, b:0},
  {r:0, g:0, b:255},
  {r:255, g:255, b:0},
  {r:0, g:255, b:255},
  {r:255, g:0, b:255}
];

let distanceType = DISTANCE_TYPE.EUCLIDEAN;
let sites = [];
let cellColors = [];
let voronoiMap = null;

function distance(p1, p2) {
  if (distanceType == DISTANCE_TYPE.EUCLIDEAN) {
    return dist(p1.x, p1.y, p2.x, p2.y);
  } else {
    return abs(p1.x - p2.x) + abs(p1.y - p2.y);
  }
}

function initSites() {
  for(let i = 1; i <= 50; i++) {
    let x = floor(randomGaussian(w/2, w/3));
    let y = floor(randomGaussian(h/2, h/3));
    sites.push(new Point(x, y));
    cellColors.push(CELL_COLORS[floor(random(CELL_COLORS.length))]);
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

function drawVoronoi() {
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let pixCoord = new Point(x, y);
      let v = voronoiMap[x + y * w];

      for (let i in sites) {
        let s = sites[i];
        let siteDist = distance(s, pixCoord);

        if (abs(siteDist - v.minDist) < 1e-5) {
          if (v.nearest.indexOf(i) == -1) v.nearest.push(i);
        } else if (siteDist < v.minDist) {
          v.minDist = siteDist;
          v.nearest = [i];
        }
      }
      
      if(filledSmoothVoronoi) {
        if(v.minDist >= 0) {
          let b = (siteSpaceX - v.minDist) / siteSpaceX;
          b = constrain(b, 0, 255);
          let c = cellColors[v.nearest[0]];
          stroke(c.r*b, c.g*b, c.b*b);
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
  drawVoronoi();
}