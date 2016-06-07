function Particle() {
  this.size = 20;
  this.color = {r: random(0, 255), g: random(0, 255), b: random(0, 255)};
  this.oldColor = this.color;
  this.mass = this.size / 10;
  this.pos = createVector(random(this.size, width - this.size), random(this.size, height - this.size));
  this.velocity = createVector(random(-2, 2), random(-2, 2));
  this.accelaration = createVector(0, 0);
  this.nearest = null;
  this.roundOffFactor = 1000;
  
  this.boundToWall = function() {
    if(this.pos.x - this.size / 2 <= 0) {
      this.velocity.x *= -1; 
      this.pos.x = this.size / 2;
    }
    
    if(this.pos.x + this.size / 2 >= width) {
      this.velocity.x *= -1; 
      this.pos.x = width - this.size / 2;
    }
    
    if(this.pos.y - this.size / 2 <= 0) {
      this.velocity.y *= -1; 
      this.pos.y = this.size / 2;
    }
    
    if(this.pos.y + this.size / 2 >= height) {
      this.velocity.y *= -1; 
      this.pos.y = height - this.size / 2;
    }
  }
};

Particle.prototype.applyGravity = function(force) {
  this.accelaration.add(force.copy().div(this.mass));
};

Particle.prototype.applyForce = function(force) {
  this.accelaration.add(force.copy().div(this.mass));
};

Particle.prototype.update = function() {
  this.velocity.add(this.accelaration).mult((World.damping === 0.0) ? 1 : World.damping);
  this.velocity.x = Math.round(this.velocity.x * this.roundOffFactor) / this.roundOffFactor;
  this.velocity.y = Math.round(this.velocity.y * this.roundOffFactor) / this.roundOffFactor;
  this.pos.add(this.velocity);
  this.pos.x = Math.round(this.pos.x * this.roundOffFactor) / this.roundOffFactor;
  this.pos.y = Math.round(this.pos.y * this.roundOffFactor) / this.roundOffFactor;
  this.boundToWall();
};

Particle.prototype.draw = function() {
  fill(this.color.r, this.color.g, this.color.b);
  stroke(0);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
};

Particle.prototype.contains = function(point) {
  return 4 * point.copy().sub(this.pos).magSq() < this.size * this.size;
};

Particle.prototype.clone = function() {
  var clone = new Particle();
  clone.size = this.size;
  clone.pos = this.pos.copy();
  clone.velocity = this.velocity.copy();
  clone.accelaration = this.accelaration.copy();
  clone.mass = this.mass;
  clone.color = this.color;
  clone.oldColor = this.oldColor;
  return clone;
};