function walker(posX, posY) {
  this.size = 30;
  this.xSpeed = 0.2;
  this.ySpeed = 0.2;
  this.colorOffset = 40;
  
  this.pos = createVector(posX, posY);
  this.vel = createVector(0, 0);
  
  this.color = {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
};

walker.prototype.draw = function() {
  fill(this.color.r + random(-this.colorOffset, this.colorOffset), this.color.g + random(-this.colorOffset, this.colorOffset), this.color.b + random(-this.colorOffset, this.colorOffset));
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
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