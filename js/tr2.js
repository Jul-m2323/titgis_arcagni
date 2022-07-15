let tempo = 0;
let posnoise = 0;
let fft;

function preload() {
  tr2 = loadSound("multimedia/25-01-22 premaster.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);

  fft = new p5.FFT();
  analizador = new p5.Amplitude(0.9);

  //debugMode();
}

function draw() {
  let nivel = analizador.getLevel();
  posnoise += nivel * 0.05;
  let wave = fft.waveform();
  fft.analyze();
  amp = fft.getEnergy(20, 200);
  amp1 = fft.getEnergy(200, 1000);

  //orbitControl();
  camera(0, 0, 50 / sin(wave.length));
  background(0);

  cajas(
    noise(wave.length) * amp + sin(amp) / 20,
    (noise(wave.length) * amp1) / 20,
    (noise(posnoise) * wave.length) / 2,
    noise(posnoise) * amp
  );
}

function cajas(inW, inH, rep) {
  noStroke();
  lights();

  for (let x = -150; x < 200; x += 10) {
    for (let y = -150; y < 200; y += 30) {
      push();

      rotateY(y + x + tempo);
      rotateZ(y + x - tempo);

      let z = sin(x + y + rep) * 75;
      translate(x, y + noise(y + x + rep * height) * 0.2, z);

      fill(z + tempo, 100, 100);
      box(inW, inH);
      pop();
    }
  }

  if (tempo == 360) {
    tempo = 0;
  }

  stroke(255);

  tempo++;
}

function mouseClicked() {
  if (!tr2.isPlaying()) {
    tr2.play();
    loop();
  } else {
    tr2.pause();
    noLoop();
  }
}