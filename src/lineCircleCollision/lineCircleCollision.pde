PVector lineStart;
PVector lineEnd;
PVector center;
float radius;

void setup(){
  size(800, 600);
  background(0);
  
  lineStart = new PVector(300, 300);
  lineEnd = new PVector(500, 200);  
  
  radius = 80.0;  
}

void draw(){
  center = new PVector(mouseX, mouseY);
  
  background(0);
  
  println(collide(lineStart, lineEnd, center, radius) ? "Collide" : "Does not collide");
  
  noFill();
  strokeWeight(2);
  
  if(collide(lineStart, lineEnd, center, radius))
    stroke(0, 255, 255, 255);
  else  
    stroke(255, 0, 0, 255);
  
  ellipse(center.x, center.y, radius * 2, radius * 2);
  
  stroke(0, 255, 0, 100);
  line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
  
}

/*
  Line Circle collision test
*/
boolean collide(PVector lineStart, PVector lineEnd, PVector center, float radius){
  PVector lineStart_center = PVector.sub(center, lineStart);
  PVector lineEnd_center = PVector.sub(center, lineEnd);
  PVector line = PVector.sub(lineEnd, lineStart);
  
  float dotLineStart_centerAndLine = lineStart_center.dot(line);
  float dotLineEnd_centerAndLine = lineEnd_center.dot(line);
  
  if(dotLineStart_centerAndLine > 0 && dotLineEnd_centerAndLine > 0){
    if(PVector.dist(lineEnd, center) <= radius){
      return true;
    }
  }else if(dotLineStart_centerAndLine < 0 && dotLineEnd_centerAndLine < 0){
    if(PVector.dist(lineStart, center) <= radius){
      return true;
    }
  }else{
    //calculate projection of vector lineStart_center on line vector
    line.normalize();
    
    float magProj = lineStart_center.dot(line);
    line.mult(magProj);
    
    //calculate distance between center and the line
    PVector centerLine = PVector.sub(lineStart_center, line);
    float distCenterLine = centerLine.mag();
    
    //collision occurs if the distance is less than or equal to radius
    if(distCenterLine <= radius){
      return true;
    }
  }
  
  return false;
}
