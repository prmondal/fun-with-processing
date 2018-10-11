var w = 1920;
var h = 1080;
var xs = 2.0;
var ys = xs * h / w;
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
            stroke(map(it, 0, maxIteration, 0, 255), 255, 255);
			point(j, i);
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
        if(v > 4) break;
        
        a = fx * fx - fy * fy + x;
        b = 2 * fx * fy + y;
        
        fx = a;
        fy = b;

        it++;
    }

    if(it == maxIteration) return it;

    return it + 1 - Math.log(Math.log(a*a+b*b)/Math.log(4)) / Math.log(2);
}