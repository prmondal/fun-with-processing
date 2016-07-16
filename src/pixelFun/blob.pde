class Blob {
  private PVector pos;
  private PVector vel;
  private float radius;
  
  Blob(float x, float y) {
    this.pos = new PVector(x, y);
    this.vel = PVector.random2D();
  }
  
  void update() {
    this.pos.add(this.vel);
    
    if(this.pos.x + this.radius / 12 > width || this.pos.x - this.radius / 12 < 0) this.vel.x *= -1;
    if(this.pos.y + this.radius / 12 > height || this.pos.y - this.radius / 12 < 0) this.vel.y *= -1;
  }
  
  void draw() {
    noFill();
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.radius / 6, this.radius / 6);
  }
}