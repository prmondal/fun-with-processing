var e = 0.0001;
var sprite;
var spriteScaleDownFactor = 4;

function preload() {
    sprite = loadImage("asset/fish.png");
}

function walker(posX, posY) {
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
  push();
  translate(this.pos.x, this.pos.y);
  var angle = this.vel.heading();
  rotate(angle);
  if(angle >= PI / 2 || angle <= -PI / 2) scale(1, -1);
  translate(-this.pos.x, -this.pos.y);
  
  imageMode(CENTER);
  image(sprite, this.pos.x, this.pos.y, sprite.width / spriteScaleDownFactor, sprite.height / spriteScaleDownFactor);
  pop();
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
    if(tempPos.x <= sprite.width / 2 || tempPos.x >= width - sprite.width / 2) {
      velocity.x *= -1;
    }
    
    if(tempPos.y <= sprite.height / 2 || tempPos.y >= height - sprite.height / 2) {
      velocity.y *= -1;
    }
    
    return velocity;
};