Blob[] b;
int numberOfBlobs = 10;

void setup() {
  size(400, 400);
  init();
}

void init() {
  b = new Blob[numberOfBlobs];

  for (int i = 0; i < numberOfBlobs; i++) {
    float r = random(100, 200);
    
    b[i] = new Blob(random(r, width - r), random(r, height - r));
    b[i].radius = r;
  }
}

void draw() {
  background(0);
  loadPixels();

  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      float c = 0;

      for (int i = 0; i < numberOfBlobs; i++) {
       c += 10 * b[i].radius / (abs(x - b[i].pos.x) + abs(y - b[i].pos.y)); //diamond shape
       //c += 10 * b[i].radius / ((x - b[i].pos.x) * (x - b[i].pos.x) + (y - b[i].pos.y) * (y - b[i].pos.y)); //circle shape
       //c += 100 * b[i].radius / (50 - dist(x, y, b[i].pos.x, b[i].pos.y)); //torus shape
      }
      
      pixels[x + y * width] = color(c, 0, 0);
    }
  }

  updatePixels();

  updateBlobs();
  //drawBlobs();
}

void updateBlobs() {
  for (int i = 0; i < numberOfBlobs; i++) {
    b[i].update();
  }
}

void drawBlobs() {
  for (int i = 0; i < numberOfBlobs; i++) {
    b[i].draw();
  }
}