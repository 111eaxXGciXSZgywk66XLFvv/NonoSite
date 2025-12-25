let bgScale = 1;

let objects = [];
let num = 30;
let num2 = 20;

function setup() {
  const c = createCanvas(windowWidth, windowHeight, WEBGL);
  c.parent('bg-layer');

  frameRate(30);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);

  for (let j = 0; j < num2; j++) {
    objects.push(new FanObject());
  }

}

function draw() {
  //background(0);
  clear(); //
  
  // ライトの設定
  //ambientLight(50);
  //pointLight(255, 255, 255, 0, 0, 400);

  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class FanObject {
  constructor() {
    this.fVelBase = random(-0.02, 0.02);
    this.fXTh = random(TWO_PI);
    this.fYTh = random(TWO_PI);
    this.fZTh = random(TWO_PI);
    
    this.fR = random(150, 450);
    this.fr = this.fR - this.fR * 0.22;
    this.col = color(random(190, 320), 60, 100, 60);
    this.thickness = 0.05;
  }

  update() {
    // 右に行くほど回転が最大5倍まで加速
    let boost = map(mouseX, 0, width, 1, 2);
    this.fZTh += this.fVelBase * boost;
  }

  display() {
    push();
    rotateX(this.fXTh);
    rotateY(this.fYTh);
    rotateZ(this.fZTh);
    fill(this.col);

    let pHigh = PI/2.0 + this.thickness;
    let pLow  = PI/2.0 - this.thickness;

    // 立体構造の描画
    this.drawStrip(this.fR, this.fr, pHigh, pHigh);
    this.drawStrip(this.fR, this.fr, pLow, pLow);
    this.drawStrip(this.fR, this.fR, pHigh, pLow);
    this.drawStrip(this.fr, this.fr, pHigh, pLow);
    this.drawCap(0, pHigh, pLow);
    this.drawCap((PI / 2.0) * (num - 1) / num, pHigh, pLow);

    pop();
  }

  drawStrip(r1, r2, p1, p2) {
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < num; i++) {
      let ang = (PI / 2.0) * i / num;
      vertex(r1 * cos(ang) * sin(p1), r1 * sin(ang) * sin(p1), r1 * cos(p1));
      vertex(r2 * cos(ang) * sin(p2), r2 * sin(ang) * sin(p2), r2 * cos(p2));
    }
    endShape();
  }

  drawCap(ang, p1, p2) {
    beginShape(TRIANGLE_STRIP);
    vertex(this.fR * cos(ang) * sin(p1), this.fR * sin(ang) * sin(p1), this.fR * cos(p1));
    vertex(this.fr * cos(ang) * sin(p1), this.fr * sin(ang) * sin(p1), this.fr * cos(p1));
    vertex(this.fR * cos(ang) * sin(p2), this.fR * sin(ang) * sin(p2), this.fR * cos(p2));
    vertex(this.fr * cos(ang) * sin(p2), this.fr * sin(ang) * sin(p2), this.fr * cos(p2));
    endShape();
  }
}