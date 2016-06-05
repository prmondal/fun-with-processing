var World = {
  gravity: 0.0,
  damping: 0.0,
  particles: [],
  kdTree: null,
  
  update: function() {
    this.particles.forEach(function(p) {p.update();});
    
    //elastic collision
    //TODO: optimise this using BSP or Quad Tree
    for(var i = 0, l = this.particles.length; i < l; i++) {
        for(var j = 0; j < l && i !== j; j++) {
            if(this.collide(this.particles[i], this.particles[j])) {
              this.resolveCollision(this.particles[i], this.particles[j]); //TODO: Fix a bug where sometimes balls get appended
            }
        }
    }
  },
  
  draw: function() {
    this.particles.forEach(function(p) {p.draw();});
  },
  
  //change color of nearest particle to the particle seleted by mouse
  getNearest: function(mx, my) {
    //find selected particle
    //TODO: optimized
    var idx = 0,
        l = this.particles.length,
        queryPoint = {pos: createVector(mx, my)},
        nearest;
    
    /*while(idx < l) {
      if(this.particles[idx].contains(queryPoint.pos)) {
        this.particles[idx].color = {r: 255, g: 255, b: 255};
        break;
      }
      
      idx++;
    }*/
    
    //change color of nearest particle
    this.kdTree.findNearest(this.kdTree.root, queryPoint, function(a, b) {return (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) + (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y);}, 0);
    nearest = this.kdTree.best;
    this.kdTree.reset();
    
    return nearest;
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
    
    for(var i = 0; i < n; i++) {
      this.createParticle();
    }
    
    //build kd-tree
    this.kdTree = new kdTree(this.particles, 2);
  },
  
  collide: function(p1, p2) {
    return 4 * (p1.pos.copy().sub(p2.pos)).magSq() < (p1.size + p2.size) * (p1.size + p2.size);
  },
  
  resolveCollision: function(p1, p2) {
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