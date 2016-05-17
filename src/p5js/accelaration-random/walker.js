function walker() {
  this.size = 30;
  this.xSpeed = 0.2;
  this.ySpeed = 0.2;
  this.xOff = 0;
  
  this.pos = createVector(random(this.size, width - this.size), random(this.size, height - this.size));
  this.vel = createVector(0, 0);
};

walker.prototype.draw = function() {
  fill(noise(this.xOff) * 255, 0, 0);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
  
  this.xOff += 0.05;
};

walker.prototype.update = function() {
  var acc = createVector(random(-this.xSpeed, this.xSpeed), random(-this.ySpeed, this.ySpeed));
  
  this.vel.add(acc);
  this.vel.normalize();
  this.pos.add(this.vel);
  
  if(this.pos.x - this.size / 2 < 0 || this.pos.x + this.size / 2 >= width) {
    this.vel.x *= -1;
  }
  
  if(this.pos.y - this.size / 2 < 0 || this.pos.y + this.size / 2 >= height) {
    this.vel.y *= -1;
  }
};