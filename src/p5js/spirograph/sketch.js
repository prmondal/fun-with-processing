var w = 600;
var h = 600;

var R = 105;
var r = 75;
var l = 40;

var noRotations = 20;//fixed value used to make it fast instead of R / gcd(r, R)

var RSlider, rSlider, lSlider, colorSlider;
var sliderStep = 0.1;
var sliderPosXOffset = w + 10, sliderPosYOffset = 40;

function gcd(a, b) {
	while(a != b) {
		if(a > b) a = a - b;
		else b = b - a;
	}

	return a;
}

function setup() {
	createCanvas(w, h);
	colorMode(HSB);

	RSlider = createSlider(1, w/2, R, sliderStep);
	RSlider.position(sliderPosXOffset, sliderPosYOffset);
	
	rSlider = createSlider(1, R, r, sliderStep);
	rSlider.position(sliderPosXOffset, 2 * sliderPosYOffset);
	
	lSlider = createSlider(0, w, l, sliderStep);
	lSlider.position(sliderPosXOffset, 3 * sliderPosYOffset);

	colorSlider = createSlider(0, 255, 200, sliderStep);
	colorSlider.position(sliderPosXOffset, 4 * sliderPosYOffset);
}

function draw() {
	background(0);

	var deltaAngle = PI/1800;

	R = RSlider.value();
	r = rSlider.value();
	l = lSlider.value();

	//slows down - noRotations = R / gcd(r, R);

	beginShape();
	strokeWeight(1);
	noFill();

	for(var t = 0; t <= noRotations * TWO_PI; t += 0.01) {
		var a = R - r;
		var b = a * t / r;

		var x = a * Math.cos(t) + l * Math.cos(b);
		var y = a * Math.sin(t) - l * Math.sin(b);
		
		stroke(colorSlider.value(),255,255);
		vertex(x+w/2, y+h/2);
	}

	endShape();
}