var w = 600;
var h = 600;
var s = 1.5;
var maxIteration = 1000;

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

            stroke(255 * it / maxIteration, 255, 200);
			point(i, j);
		}
	}
}

function getIterationCountForMandelBrotSet(x, y) {
	var it = 0;
	var fx = 0;
    var fy = 0;
    
    var a = x;
    var b = y;
        
    while(it < maxIteration) {
        var v = a * a + b * b;
        if(v * v > 4) break;
        
        a = fx * fx - fy * fy + x;
        b = 2 * fx * fy + y;
        
        fx = a;
        fy = b;

        it++;
    }

    return it;
}