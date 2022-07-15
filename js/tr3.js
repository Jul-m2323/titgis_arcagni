let posnoise = 0;
let fft;

function preload() {
  tr3 = loadSound("multimedia/1602 noche.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  fft = new p5.FFT();
  analizador = new p5.Amplitude(0.9);

  //noLoop();
}

function draw() {
  background(255);

  let nivel = analizador.getLevel();
  posnoise += nivel * 0.05;
  let wave = fft.waveform();
  fft.analyze();
  amp = fft.getEnergy(20, 200);
  amp1 = fft.getEnergy(200, 1000);

  randomSeed(1);
  camera(10 * noise(amp), noise(amp1), 50 / noise(wave.length));

  translate(0, 200, 0);

  arbol(100);
}

function arbol(len) {
  strokeWeight(map(len, 10, 100, 0.5, 5));
  stroke(70, 40, 20);
  line(0, 0, 0, 0, -len - 2, 0);

  translate(0, -len, 0);
  if (len > 10) {
    for (var i = 0; i < 3; i++) {
      rotateY(random(100, 140));

      push();
      rotateZ(random(20, 50));
      arbol(len * 0.7);

      pop();
    }
  } else {
    let rojo = 80 * noise(posnoise) * sin(0.8);
    let verde = 120 * noise(amp) * 2;
    let azul = 40 * noise(amp1) * 0.6;
    fill(rojo, verde, azul, 200);
    noStroke();

    beginShape();
    for (let i = 45; i < 135; i++) {
      let rad = 7;
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    for (let i = 135; i > 45; i--) {
      let rad = 7;
      let x = rad * cos(i);
      let y = rad * sin(-i) + 10;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function mouseClicked() {
  if (!tr3.isPlaying()) {
    tr3.play();
  } else {
    tr3.pause();
  }
}