Circle[] circles = new Circle[50];

float MIN_RADIUS = 20;
float MAX_RADIUS = 60;
float OFFSET = 10;

PFont f;

boolean sketchFullScreen() {
  return true;
}

void setup() {
  size(displayWidth, displayHeight);
  
  f = createFont("Arial",16,true);
  
  for(int i = 0; i < circles.length; i++){
    circles[i] = new Circle(random(MAX_RADIUS + OFFSET, width - MAX_RADIUS - OFFSET), random(MAX_RADIUS + OFFSET, height - MAX_RADIUS - OFFSET), random(MIN_RADIUS, MAX_RADIUS));
  }
}

void draw() {
  //background(150, 150, 150);
  background(255, 214, 214);
  //noCursor();
  
  textFont(f, 20);
  fill(0);                        // STEP 5 Specify font color 
  text("fps: " + frameRate, 20, 25);
  
  //draw center
  /*noStroke();
  fill(0, 0, 0);
  ellipse(width/2, height/2, 10, 10);*/
  
  for(int i = 0; i < circles.length; i++){
    circles[i].update();
  }
  
  for(int i = 0; i < circles.length; i++){
    circles[i].draw();
  }
}

class Circle{
  private float posX;
  private float posY;
  
  private float radius;
  
  private PVector velocity;
  private PVector center = new PVector(width/2, height/2);
  private float velocityLimit;
  
  private float red;
  private float green;
  private float blue;
  private float alpha;
  
  Circle(float x, float y, float r){
    posX = x;
    posY = y;
    
    radius = r;
    
    velocityLimit = random(2, 10);
    velocity = PVector.sub(center, new PVector(posX, posY));
    //velocity.limit(velocityLimit);
    velocity.normalize();
    velocity.mult(velocityLimit);
    
    red = random(255);
    green = random(255);
    blue = random(255);
    alpha = random(200);
  }
  
  void update(){
    float length = PVector.sub(center, new PVector(posX, posY)).mag();
    
    //stop near center
    /*if(length > velocity.mag()){
       posX+= velocity.x;
       posY+= velocity.y;
    }*/
    
    posX+= velocity.x;
    posY+= velocity.y;
    
    if(posX + radius >= width || posX - radius <= 0){
      velocity.x = -velocity.x;
    }
    
    if(posY + radius >= height || posY - radius <= 0){
      velocity.y = -velocity.y;
    }
  }    

  
  void draw(){    
    stroke(0);
    strokeWeight(1);
    fill(red, green, blue, alpha);
    ellipse(posX, posY, 2 * radius, 2 * radius);
  }
}
