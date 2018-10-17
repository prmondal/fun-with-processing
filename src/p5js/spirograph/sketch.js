var w = 600;
var h = 600;

var R = 100;
var r = 5;
var k = r/R;

var l = 20;

function setup() {
	createCanvas(w, h);
    noLoop();
}

function draw() {
	background(0);
	var deltaAngle = (l > 1) ? PI / (360 * l) : PI / 360;

	for(var t = 0; t <= TWO_PI; t += deltaAngle) {
		var x = R * ((1-k)*Math.cos(t) + l*k*Math.cos((1-k)*t/k));
		var y = R * ((1-k)*Math.sin(t) - l*k*Math.sin((1-k)*t/k));
		
		stroke(0,255,0);
		point(x+w/2, y+h/2);

		/*noFill();
		stroke(255,0,0);
		ellipse(w/2,h/2,2*R);

		noFill();
		stroke(0,0,255);
		ellipse(w/2+R-r,h/2,2*r);

		push();
		strokeWeight(4);
		stroke(0,255,255);
		point(w/2+R-(1-l)*r,h/2);
		pop();*/
	}
}