var w = 600;
var h = 600;

var R = w/4;
var r = R/8;
var k = r/R;

var l = 0.5;

function setup() {
	createCanvas(w, h);
    noLoop();
}

function draw() {
	background(0);
	var deltaAngle = (l > 1) ? PI / (180 * l) : PI / 180;

	for(var t = 0; t <= TWO_PI; t += deltaAngle) {
		var x = R * ((1-k)*Math.cos(t) + l*k*Math.cos((1-k)*t/k));
		var y = R * ((1-k)*Math.sin(t) - l*k*Math.sin((1-k)*t/k));
		
		x = map(x, -R, R, 0, w);
		y = map(y, -R, R, 0, h);

		stroke(255);
		point(x, y);

		noFill();
		stroke(255,0,0);
		ellipse(w/2,h/2,2*R);

		noFill();
		stroke(0,0,255);
		ellipse(w/2+R-r,h/2,2*r);
	}
}