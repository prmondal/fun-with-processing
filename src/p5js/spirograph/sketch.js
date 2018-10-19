var w = 600;
var h = 600;

var R = 105;
var r = 75;
var l = 40;

var noRotations = R / gcd(r, R);

function gcd(a, b) {
	while(a != b) {
		if(a > b) a = a - b;
		else b = b - a;
	}

	return a;
}

function setup() {
	createCanvas(w, h);
    noLoop();
}

function draw() {
	background(0);
	var deltaAngle = PI/1800;

	for(var t = 0; t <= noRotations * TWO_PI; t += deltaAngle) {
		var a = R - r;
		var b = a * t / r;

		var x = a * Math.cos(t) + l * Math.cos(b);
		var y = a * Math.sin(t) - l * Math.sin(b);
		
		stroke(0,0,255);
		point(x+w/2, y+h/2);
	}
}