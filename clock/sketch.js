const W = window.innerWidth;
const H = window.innerHeight;
const pad = Math.max(W, H) * 0.1;
const pad2 = pad / 2;
const pad4 = pad / 4;
const pad8 = pad / 8;
const M = [
  // 1000, // secs
  1000 * 60.007610352000078535, // mins
  1000 * 3600.4566211200049111, // hours
  1000 * 86410.958906880114228, // days
  1000 * 604876.71234816079959, // weeks
  1000 * 2628336.2137829000000, // months
  1000 * 31540000.001011241227, // years
  1000 * 315400000.01011240482, // decade
  1000 * 3154000000.1011242867, // century
];
const ML = M.length;
const fr = 30;
const bch = 20;
let up = 0;
let D;
let d = { org: 0, mil: 0 };

function setup() {
  frameRate(fr);
  createCanvas(W, H);
  background(200);
  noFill();
  textAlign(RIGHT, CENTER);
  textAlign(RIGHT, TOP);
  textFont("monospace");
  textSize(10);
  text(rng.I, W - pad2 / 2, H - pad2 / 2);
}

function draw() {
  D = Date.now();
  rng.I = Math.floor(D / M[0]);

  push();
  fill(200);
  noStroke();
  rect(0, H - pad2, W, H);
  pop();

  M.map((m, i) => {
    push();
    stroke(0, 0, 0, 64);
    noFill();
    arc(pad4 * (ML - i) + pad8 * (ML - 1 - i), H - pad4, pad4, pad4, 0, TWO_PI);
    stroke(0);
    fill(0);
    arc(
      pad4 * (ML - i) + pad8 * (ML - 1 - i),
      H - pad4,
      pad4,
      pad4,
      -HALF_PI,
      ((D % m) / m) * (TWO_PI * 1) - HALF_PI
    );
    pop();
  });

  for (let i = 0; i < bch; i++) {
    stroke(0, 0, 0, 8);
    line(
      rng.gen(!!0) * (W - pad) + pad2,
      rng.gen(!!0) * (H - pad) + pad2,
      rng.gen(!!0) * (W - pad) + pad2,
      rng.gen(!!0) * (H - pad) + pad2
    );

    if (up != rng.I) {
      up = rng.I;
      background(200);
    }
  }
}

rng = {
  I: 0,
  GN: Math.PI,
  phi: (1 + Math.sqrt(5)) / 2,
  fib: function (N) {
    return this.phi * N;
  },
  gen: function (s = true) {
    if (s) {
      this.I++;
    }
    this.GN = this.fib(this.GN + this.I) % 1;
    return this.GN;
  },
};
