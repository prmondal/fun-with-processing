var w = 600;
var h = 600;

var R = 105;
var r = 75;
var l = 40;

var noRotations = R / gcd(r, R);

var RSlider, rSlider, lSlider, colorSlider;
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

	RSlider = createSlider(1, w/2, R);
	RSlider.position(sliderPosXOffset, sliderPosYOffset);
	
	rSlider = createSlider(1, R, r);
	rSlider.position(sliderPosXOffset, 2 * sliderPosYOffset);
	
	lSlider = createSlider(0, w, l);
	lSlider.position(sliderPosXOffset, 3 * sliderPosYOffset);

	colorSlider = createSlider(0, 255, 255);
	colorSlider.position(sliderPosXOffset, 4 * sliderPosYOffset);
}

function draw() {
	background(0);

	var deltaAngle = PI/1800;

	R = RSlider.value();
	r = rSlider.value();
	l = lSlider.value();

	//TODO: noRotations = R / gcd(r, R);

	for(var t = 0; t <= noRotations * TWO_PI; t += deltaAngle) {
		var a = R - r;
		var b = a * t / r;

		var x = a * Math.cos(t) + l * Math.cos(b);
		var y = a * Math.sin(t) - l * Math.sin(b);
		
		stroke(colorSlider.value(),255,255);
		point(x+w/2, y+h/2);
	}
}