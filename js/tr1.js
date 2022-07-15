const axisX = 1;
const axisY = 2;
let c1, c2;
let xPos;
let posnoise = 0;
let fft;

function preload() {
  tr1 = loadSound("multimedia/thatonething.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  fft = new p5.FFT();
  analizador = new p5.Amplitude(0.9);

  frameRate(3);

  //colores
  c1 = color(0);
  c2 = color(11, 34, 145);
}

function draw() {
  let nivel = analizador.getLevel();
  posnoise += nivel * 0.05;
  let wave = fft.waveform();
  fft.analyze();
  amp = fft.getEnergy(20, 200);
  amp1 = fft.getEnergy(200, 1000);
  // marco
  setGradient(0, 0, windowWidth, windowHeight, c1, c2, axisY);
  strokeWeight(20);
  rect(-1, -1, windowWidth, windowHeight);

  //luna
  push();
  noStroke();
  fill(255);
  circle(random(45, 500), random(20, 200) + 0.7 * 220, 145);

  pop();

  //edificios

  for (i = 0; i < 300; i += 5) {
    fill(noise(posnoise));
    edificios(random(200, 1600), 678);
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === axisY) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

function edificios(posX, posY) {
  stroke(2);
  strokeWeight(3);
  rect(12 + posX, posY, 140, 250);
  ventanas(posX);

  if (posX >= 720) {
    xPos *= -1;
  }

  function ventanas(posX, posY) {
    strokeWeight(4);
    for (let x = 0; x < 130; x += 20) {
      for (let y = 0; y < 240; y += 40) {
        fill(random(20, 200));
        rect(x + 12 + posX, y + 684, 20, 15);
      }
    }
  }
  noLoop();
}

function mouseClicked() {
  if (!tr1.isPlaying()) {
    tr1.play();
    loop();
  } else {
    tr1.pause();
  }
}