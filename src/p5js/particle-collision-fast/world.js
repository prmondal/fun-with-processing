var World = {
  gravity: 0.0,
  damping: 0.0,
  collisionEpsilon: 0, //need to identify, may solve append problem
  bruteForceCDEnabled: false,
  particles: [],
  kdTree: new kdTree(2),
  
  distanceFn: function(a, b) {
    return (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) + (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y);
  },
  
  update: function() {
    this.particles.forEach(function(p) {p.update();});
    this.kdTree.build(this.particles); //problem of kd-tree
    
    //elastic collision
    if(this.bruteForceCDEnabled) {
       for(var i = 0, l = this.particles.length; i < l; i++) {
          for(var j = 0; j < l && i !== j; j++) {
              if(this.collide(this.particles[i], this.particles[j])) {
                this.resolveCollision(this.particles[i], this.particles[j]);
              }
          }
      }
    } else {
      for(var i = 0, l = this.particles.length; i < l; i++) {
        //find nearest particle to the current particle
        this.updateNearest(this.particles[i]);
        
        //resolve collision with neareast and current particle
        if(this.particles[i].nearest) this.resolveCollision(this.particles[i], this.particles[i].nearest);
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
  
  updateNearest: function(queryPoint) {
    var idx = 0, l = this.particles.length;
    
    this.kdTree.findNearest(this.kdTree.root, queryPoint, this.distanceFn, 0);
    
    //find the nearest excluding the query point
    queryPoint.nearest = this.kdTree.minPQ.peek().data;
    queryPoint.nearestDist = this.kdTree.minPQ.peek().distance;
    
    //reset kdTree
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
    //tiny gap is maintained between particle collision checking
    return 4 * (p1.pos.copy().sub(p2.pos)).magSq() - this.collisionEpsilon < (p1.size + p2.size) * (p1.size + p2.size);
  },
  
  resolveCollision: function(p1, p2) { //TODO: Fix a bug where sometimes balls get appended
    if(!this.collide(p1, p2)) return;
    
    var collisionAngle = p2.pos.copy().sub(p1.pos).heading();
    
    var p1Dir = p1.velocity.heading();
        p2Dir = p2.velocity.heading();
        p1uMag = p1.velocity.mag(),
        p2uMag = p2.velocity.mag();
    
    //velocities in rotated frame
    var p1uX = p1uMag * cos(p1Dir - collisionAngle),
        p1uY = p1uMag * sin(p1Dir - collisionAngle),
        p2uX = p2uMag * cos(p2Dir - collisionAngle),
        p2uY = p2uMag * sin(p2Dir - collisionAngle),
        p1vX, p1vY, p2vX, p2vY, p1FinalVX, p1FinalVY, p2FinalVX, p2FinalVY, totalMass = p1.mass + p2.mass;
        
    //conservation of momentum in each direction
    p1vX = (p1uX * (p1.mass - p2.mass) + 2 * p2.mass * p2uX) / totalMass;
    p2vX = (p2uX * (p2.mass - p1.mass) + 2 * p1.mass * p1uX) / totalMass;
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