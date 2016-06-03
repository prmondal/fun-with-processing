function Particle() {
  this.size = random(20, 60);
  this.color = {r: random(0, 255), g: random(0, 255), b: random(0, 255)};
  this.mass = this.size / 10;
  this.pos = createVector(random(this.size, width - this.size), random(this.size, height - this.size)); //TODO: no overlap particles
  this.velocity = createVector(random(-5, 5), random(-5, 5));
  this.accelaration = createVector(0, 0);
  
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
  this.velocity.x = Math.round(this.velocity.x * 1000) / 1000;
  this.velocity.y = Math.round(this.velocity.y * 1000) / 1000;
  this.pos.add(this.velocity);
  
  this.boundToWall();
};

Particle.prototype.draw = function() {
  fill(this.color.r, this.color.g, this.color.b);
  stroke(0);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
};