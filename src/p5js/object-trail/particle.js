function particle(pos, size, color) {
  this.pos = pos;
  this.color = color;
  this.size = size;
  
  this.draw = function() {
    if(!this.pos) return;
    
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };
}