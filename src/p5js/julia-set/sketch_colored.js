var w = 1920;
var h = 1080;
var xs = 2.0;
var ys = xs * h / w;

var cx = -0.4; //try -0.5, -0.6, coolness
var cy = 0.6;

var maxIteration = 100;

function setup() {
	createCanvas(w, h);
    colorMode(HSB);
	noLoop();
}

function draw() {
	background(0);

	for(var i = 0; i < h; i++) {
		for(var j = 0; j < w; j++) {
			var x = map(j, 0, w, -xs, xs);
			var y = map(i, 0, h, -ys, ys);

            var it = getIterationCountForMandelBrotSet(x, y);
            stroke(255 * it / maxIteration, 255, 255);
			point(j, i);
		}
	}
}

function getIterationCountForMandelBrotSet(x, y) {
	var it = 0;
        
    while(it < maxIteration) {
        if(x * x + y * y > 4) break;
        
        var xtemp = x * x - y * y;
        y = 2 * x * y + cy;
        x = xtemp + cx;

        it++;
    }

    return it;
}