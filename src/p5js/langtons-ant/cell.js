function cell(pos, width, height, colors) {
  this.pos = pos;
  this.width = width;
  this.height = height;
  this.colors = colors;
  this.currentColor = undefined;
  this.toggleColor = false;
  this.isVisited = false;
  
  this.draw = function() {
    this.currentColor = (!this.toggleColor) ? this.colors[0] : this.colors[1];
    
    //speed up the simulation
    if(this.isVisited) {
      noStroke();
      fill(this.currentColor.r, this.currentColor.g, this.currentColor.b);
      //stroke(128, 128, 128, 200);
      rect(pos.x, pos.y, this.width, this.height);
    }
  }
};

