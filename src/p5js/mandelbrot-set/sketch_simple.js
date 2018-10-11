var w = 1920;
var h = 1080;
var xs = 2.0;
var ys = xs * h / w;

function setup() {
	createCanvas(w, h);
	noLoop();
}

function draw() {
	background(200);

	for(var i = 0; i < h; i++) {
		for(var j = 0; j < w; j++) {
            var x = map(j, 0, w, -xs, xs);
			var y = map(i, 0, h, -ys, ys);

			if(inMandelBrotSet(x, y)) {
				stroke(0,0,255);
      			point(j, i);
			}
		}
	}
}

function inMandelBrotSet(x, y) {
	var cnt = 0;
	var m = 100;
    var fx = 0;
    var fy = 0;
    
    var a = x;
    var b = y;
        
    while(cnt < m) {
        var v = a * a + b * b;
        if(v > 4) return false;
        
        a = fx * fx - fy * fy + x;
        b = 2 * fx * fy + y;
        
        fx = a;
        fy = b;

        cnt++;
    }

    return true;
}