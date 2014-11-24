PVector velocity;
PVector dir;

float posX = random(500);
float posY = random(500);

float lineStartX = 0;
float lineStartY = 0;

int chWidth = 10;
int tWidth = 20;


void setup(){
 size(800,600);  
 velocity = new PVector(3, 3);
 
}

void draw(){
  background(0); 
  noCursor();
  
  noStroke();
  fill(0,0,255);
  ellipse(mouseX, mouseY, tWidth, tWidth);
  
  println("fps: " + frameRate);
  
  dir = new PVector(mouseX - posX, mouseY - posY);
  
  dir.normalize();
  
  posX = posX + dir.x * velocity.x;
  posY = posY + dir.y * velocity.y;
  
    
  
  noStroke();
  
  fill(255,0,0);
  
  //rect(mouseX, mouseY,10,10);
  rect(posX, posY, chWidth, chWidth);
  
  stroke(0,255,0,255);
  strokeWeight(2);  
  
  if(pmouseX != mouseX && pmouseY != mouseY){    
      lineStartX = posX;
      lineStartY = posY;
  }
  
  dir.mult(40);
  
  float endX = posX + chWidth/2 + dir.x;
  float endY = posY + chWidth/2 + dir.y;
  
  //line(lineStartX, lineStartY, posX, posY);
  line(posX + chWidth/2, posY + chWidth/2, endX, endY);
  //point(posX, posY);
}
