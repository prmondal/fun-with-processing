var e = 0.0001;
var animationSpeedFactor = 4;

function walker(posX, posY, spriteScaleDownFactor) {
  var randomVel = p5.Vector.random2D();
  
  this.velOffsetX = 10;
  this.velOffsetY = 2;
  
  this.velDamping = 0.95;
  this.spriteScaleDownFactor = round(spriteScaleDownFactor);
  
  this.pos = createVector(posX, posY);
  
  this.vel = this.getCorrectVelocity(createVector(randomVel.x * this.velOffsetX, randomVel.y * this.velOffsetY));
  /*createVector(random(-this.velOffset, this.velOffset), random(-this.velOffset, this.velOffset))*/
  
  this.color = {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
  
  this.spriteIdx = 0;
};

walker.prototype.draw = function() {
  var angle;
  
  push();
  
  translate(this.pos.x, this.pos.y);
  
  angle = this.vel.heading();
  rotate(angle);
  
  if(angle >= PI / 2 || angle <= -PI / 2) scale(1, -1);
  
  translate(-this.pos.x, -this.pos.y);
  
  imageMode(CENTER);
  image(sprites[this.spriteIdx], this.pos.x, this.pos.y, sprites[0].width / this.spriteScaleDownFactor, sprites[0].height / this.spriteScaleDownFactor);
  
  //slow the animation
  if(frameCount % animationSpeedFactor == 0) this.spriteIdx++;
  
  //reset idx
  if(this.spriteIdx >= 6) this.spriteIdx = 0;
  
  pop();
};

walker.prototype.update = function() {
  var randomVel = p5.Vector.random2D();
  
  if(this.vel.mag() < e) {
    this.vel = this.getCorrectVelocity(createVector(randomVel.x * this.velOffsetX, randomVel.y * this.velOffsetY)); 
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
    var sdf = 2 * this.spriteScaleDownFactor;
    
    if(tempPos.x <= sprites[0].width / sdf || tempPos.x >= width - sprites[0].width / sdf) {
      velocity.x *= -1;
    }
    
    if(tempPos.y <= sprites[0].height / sdf || tempPos.y >= height - sprites[0].height / sdf) {
      velocity.y *= -1;
    }
    
    return velocity;
};