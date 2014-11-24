public enum DIRECTION {
  LEFT, RIGHT
};

//player position and size
PVector playerPos = new PVector(0, 0);
float playerSize = 20;

//player velocity
PVector velocity = new PVector(0, 0);
float walkingVel = 5;

//player direction
DIRECTION prevDirection = DIRECTION.RIGHT;

//player jump params
float jumpAngle = 60;
float jumpDist = 200;
float intJumpVelocity = 0;
boolean jumping = false;

//world gravity
float gravity = 0.09;

void setup(){
  size(800, 600);
  
  //set initial player position and velocity
  playerPos.x = playerSize/2;
  playerPos.y = height - playerSize/2;
  
  //calculate initial velocity for jumping
  intJumpVelocity = sqrt((gravity * jumpDist)/sin(radians(2 * jumpAngle)));
  
  velocity.x = intJumpVelocity * cos(radians(jumpAngle));
  velocity.y = intJumpVelocity * sin(radians(jumpAngle));  
}

void draw(){
  background(0);
  
  //if player is behind the right wall
  if(playerPos.x - playerSize/2 > width){
    playerPos.x =  playerSize/2 - 10; 
  }
  
  //if player is behind the left wall
  if(playerPos.x + playerSize/2 < 0){
    playerPos.x =  width - playerSize/2 + 10; 
  }
  
  //player jumps
   if(jumping){
     velocity.y -= gravity;
     
     playerPos.x += velocity.x;
     playerPos.y -= velocity.y;
     
     //println(playerPos.x + "||" + playerPos.y);
   }
 
 //if player touches the ground reset player position and velocity  
 if(playerPos.y + playerSize/2  > height){
   //println("Ground Touch!");
   //player stands on the ground
   playerPos.y = height - playerSize/2;   
   
   //reset player initial velocity for future jump
   velocity.y = intJumpVelocity * sin(radians(jumpAngle));
   
   jumping = !jumping;  
 }
 
 //draw player
 ellipse(playerPos.x, playerPos.y, playerSize, playerSize);
}

void keyPressed(){
  DIRECTION currentDirection = prevDirection;
  
  //neglect hitting spacebar when the player is already jumping
  if(key == 32 && !jumping){
    //player starts jumping on hitting spacebar
    jumping = !jumping;
  }
  
  //move right
  if((key == 'd' || key == 'D') && !jumping){
    playerPos.x += walkingVel;
    currentDirection = DIRECTION.RIGHT;
  }else if((key == 'a' || key == 'A') && !jumping){
    playerPos.x -= walkingVel;
    currentDirection = DIRECTION.LEFT;
  }
  
  //move left
  if (key == CODED && !jumping) {
    if (keyCode == RIGHT){
      playerPos.x += walkingVel;
      currentDirection = DIRECTION.RIGHT;
    }else if (keyCode == LEFT) {
      playerPos.x -= walkingVel;
      currentDirection = DIRECTION.LEFT;
    }
  }
  
  //if player changes direction
  if(currentDirection != prevDirection){
    //update prev direction
    prevDirection = currentDirection;
    
    velocity.x = -velocity.x;
  }
  
  println("Player Direction : " + currentDirection);
}
