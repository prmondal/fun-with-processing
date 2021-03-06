var World = {
  gravity: 0.9,
  particles: [],
  
  update: function() {
    this.particles.forEach(function(p) {p.update();});
  },
  
  draw: function() {
    this.particles.forEach(function(p) {p.draw();});
  },
  
  createParticle: function() {
    var p = new Particle();
    
    //apply gravity
    p.applyGravity(createVector(0, this.gravity * p.mass));
    
    this.particles.push(p);
  },
  
  createRandomParticles: function(n) {
    for(var i = 0; i < n; i++) {
      this.createParticle();
    }
  }
};