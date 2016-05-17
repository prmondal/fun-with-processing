var e = 0.0001;

function walker(posX, posY) {
  this.size = 30;
  this.velOffset = 10;
  this.velDamping = 0.95;
  
  this.pos = createVector(posX, posY);
  this.vel = this.getCorrectVelocity(p5.Vector.random2D().mult(this.velOffset) /*createVector(random(-this.velOffset, this.velOffset), random(-this.velOffset, this.velOffset))*/);
  
  this.color = {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
};

walker.prototype.draw = function() {
  fill(this.color.r, this.color.g, this.color.b);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
};

walker.prototype.update = function() {
  if(this.vel.mag() < e) {
    this.vel = this.getCorrectVelocity(p5.Vector.random2D().mult(this.velOffset)); 
  }
  
  this.pos.add(this.vel);
  this.vel.mult(this.velDamping);
};

walker.prototype.getCorrectVelocity = function(velocity) {
    //check if the fish travels outside the tank at given velocity if so return correct movement direction
    //calculate actual distance fish will travel at given velocity
    var tempPos = createVector(this.pos.x, this.pos.y);
    var tempVelocity = createVector(velocity.x, velocity.y);
    
    while(tempVelocity.mag() >= e) {
      tempPos.add(tempVelocity);
      tempVelocity.mult(this.velDamping);
    }
    
    //if the fish travels outside the tank reverse velocity direction
    if(tempPos.x <= this.size || tempPos.x >= width - this.size) {
      velocity.x *= -1;
    }
    
    if(tempPos.y <= this.size || tempPos.y >= height - this.size) {
      velocity.y *= -1;
    }
    
    return velocity;
};