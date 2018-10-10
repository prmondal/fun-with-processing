var w = 1000;
var h = 1000;
var s = 1.2;
var maxIteration = 100;
var cx = -0.4; //try -0.5, -0.6, coolness
var cy = 0.6;

function setup() {
	createCanvas(h, w);
    colorMode(HSB);
	noLoop();
}

function draw() {
	background(0);

	for(var i = 0; i < h; i++) {
		for(var j = 0; j < w; j++) {
			var x = map(i, 0, h, -s, s);
			var y = map(j, 0, w, -s, s);

            var it = getIterationCountForMandelBrotSet(x, y);
            stroke(255 * it / maxIteration, 255, 255);
			point(i, j);
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