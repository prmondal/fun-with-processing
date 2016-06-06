var World = {
  gravity: 0.0,
  damping: 0.0,
  bruteForceCDEnabled: false,
  particles: [],
  kdTree: new kdTree(2),
  
  //modified distance function which finds closest particle considering the boundary
  distanceCompareFn: function(a, b) {
    var dir = a.pos.copy().sub(b.pos).normalize();
    var closestBoundaryPointBtoA = b.pos.copy().add(dir.mult(b.size / 2));
    
    return (a.pos.x - closestBoundaryPointBtoA.x) * (a.pos.x - closestBoundaryPointBtoA.x) + (a.pos.y - closestBoundaryPointBtoA.y) * (a.pos.y - closestBoundaryPointBtoA.y);
  },
  
  update: function() {
    this.particles.forEach(function(p) {p.update();});
    
    //elastic collision
    if(this.bruteForceCDEnabled) {
       for(var i = 0, l = this.particles.length; i < l; i++) {
          for(var j = 0; j < l && i !== j; j++) {
              if(this.collide(this.particles[i], this.particles[j])) {
                this.resolveCollision(this.particles[i], this.particles[j]); //TODO: Fix a bug where sometimes balls get appended
              }
          }
      }
    } else {
      for(var i = 0, l = this.particles.length; i < l; i++) {
        //find nearest particle to the current particle
        //shift pos to epsilon amount 
        this.updateNearest(this.particles[i]);
        
        //if the collision resolve is already completed on nearest ignore it
        if(this.particles[i].toNearest !== null && this.particles[i].toNearest === this.particles[i].nearest) {
          continue;
        }
        
        this.particles[i].nearest.toNearest = this.particles[i];
        
        //resolve collision with neareast and current particle
        this.resolveCollision(this.particles[i], this.particles[i].nearest); //TODO: Fix a bug where sometimes balls get appended 
      } 
    }
  },
  
  draw: function() {
    this.particles.forEach(function(p) {p.draw();});
  },
  
  drawFPS: function(fps) {
    textSize(12);
    fill(255);
    text("FPS: " + fps, 15, 15);
  },
  
  //change color of nearest particle to the particle seleted by mouse
  updateNearest: function(queryPoint) {
    var idx = 0, l = this.particles.length;
    
    //change color of nearest particle
    this.kdTree.findNearest(this.kdTree.root, queryPoint, this.distanceCompareFn, 0);
    queryPoint.nearest = this.kdTree.best;
    this.kdTree.reset();
  },
  
  createParticle: function() {
    var p = new Particle();
    
    //if this particle collides with any other particle return
    for(var i = 0, l = this.particles.length; i < l; i++) {
      if(this.collide(p, this.particles[i])) {
        p = null;
        return;
      }
    }
    
    //apply gravity
    p.applyGravity(createVector(0, this.gravity * p.mass));
    
    this.particles.push(p);
  },
  
  createRandomParticles: function(n) {
    var self = this;
    var countNumberOfParticles = 0;
    
    //keep generating till n particles are created
    while(countNumberOfParticles <= n) {
      this.createParticle();
      countNumberOfParticles++;
    }
    
    //build kd-tree
    this.kdTree.build(this.particles);
  },
  
  collide: function(p1, p2) {
    return 4 * (p1.pos.copy().sub(p2.pos)).magSq() < (p1.size + p2.size) * (p1.size + p2.size);
  },
  
  resolveCollision: function(p1, p2) {
    if(!this.collide(p1, p2)) return;
    
    var collisionAngle = atan2(p2.pos.y - p1.pos.y, p2.pos.x - p1.pos.x);
    
    var p1Dir = atan2(p1.velocity.y, p1.velocity.x),
        p2Dir = atan2(p2.velocity.y, p2.velocity.x),
        p1uMag = p1.velocity.mag(),
        p2uMag = p2.velocity.mag();
    
    //velocities in rotated frame
    var p1uX = p1uMag * cos(p1Dir - collisionAngle),
        p1uY = p1uMag * sin(p1Dir - collisionAngle),
        p2uX = p2uMag * cos(p2Dir - collisionAngle),
        p2uY = p2uMag * sin(p2Dir - collisionAngle),
        p1vX, p1vY, p2vX, p2vY, p1FinalVX, p1FinalVY, p2FinalVX, p2FinalVY;
        
    //conservation of momentum in each direction
    p1vX = (p1uX * (p1.mass - p2.mass) + 2 * p2.mass * p2uX) / (p1.mass + p2.mass);
    p2vX = (p2uX * (p2.mass - p1.mass) + 2 * p1.mass * p1uX) / (p1.mass + p2.mass);
    p1vY = p1uY; //no collision in y-direction
    p2vY = p2uY;
    
    //change velocities to original frame
    p1FinalVX = p1vX * cos(collisionAngle) - p1vY * sin(collisionAngle);
    p1FinalVY = p1vX * sin(collisionAngle) + p1vY * cos(collisionAngle);
    
    p2FinalVX = p2vX * cos(collisionAngle) - p2vY * sin(collisionAngle);
    p2FinalVY = p2vX * sin(collisionAngle) + p2vY * cos(collisionAngle);
    
    p1.velocity.set(p1FinalVX, p1FinalVY);
    p2.velocity.set(p2FinalVX, p2FinalVY);
  }
};