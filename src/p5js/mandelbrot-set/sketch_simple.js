var w = 600;
var h = 600;
var s = 2.0;

function setup() {
	createCanvas(h, w);
	noLoop();
}

function draw() {
	background(0);

	for(var i = 0; i < h; i++) {
		for(var j = 0; j < w; j++) {
			var x = map(i, 0, h, -s, s);
			var y = map(j, 0, w, -s, s);

			if(inMandelBrotSet(x, y)) {
				stroke(0,0,255);
      			point(i, j);
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