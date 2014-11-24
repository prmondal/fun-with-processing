PVector velocity, position, target, dir;
float MAX_FORCE = 0.02;
float MAX_SPEED = 2;

int characterSize = 10;
int targetSize = 20;

void setup() {
  size(800, 600);

  target = new PVector();  
  velocity = new PVector(1, 3);
  position = new PVector(random(100), random(100));
}

void draw() {
  background(0);
  noCursor();
  
  target.x = mouseX;
  target.y = mouseY;
  
  noStroke();
  fill(0, 0, 255);
  ellipse(target.x, target.y, targetSize, targetSize);

  //desired direction
  dir = new PVector(-target.x + position.x, -target.y + position.y);
  dir.normalize();
  dir.mult(MAX_SPEED); //maxspeed
  
  //steer vector desired direction - velocity
  PVector steer = PVector.sub(dir, velocity);  
  //steer.mult(0.006);
  steer.limit(MAX_FORCE);
  
  //update velocity
  velocity.x = velocity.x + steer.x;
  velocity.y = velocity.y + steer.y;

  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;     

  noStroke();  
  fill(255, 0, 0);  
  ellipse(position.x, position.y, characterSize, characterSize);

  //draw desired direction
  PVector lineDirection = PVector.sub(target, position);

  lineDirection.normalize();
  lineDirection.setMag(50);

  float lineStartX = position.x;
  float lineStartY = position.y;

  float lineEndX = position.x + lineDirection.x;
  float lineEndY = position.y + lineDirection.y;

  stroke(0, 255, 0, 255);
  strokeWeight(2); 
  line(lineStartX, lineStartY, lineEndX, lineEndY);  

  //draw current direction
  PVector temp = new PVector(velocity.x, velocity.y);
  temp.normalize();
  temp.setMag(50);  

  lineEndX = position.x + temp.x;
  lineEndY = position.y + temp.y;

  stroke(0, 255, 255, 255);
  strokeWeight(2);
  line(lineStartX, lineStartY, lineEndX, lineEndY);
}

