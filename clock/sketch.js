const W = window.innerWidth;
const H = window.innerHeight;
const pad = Math.max(W, H) * 0.1;
const pad2 = pad / 2;
const pad4 = pad / 4;
const pad8 = pad / 8;
const m_s = 1000;
const m_m = 1000 * 60;
const m_h = 1000 * 60 * 60;
const m_d = 1000 * 60 * 60 * 24;
const m_w = 1000 * 60 * 60 * 24 * 7;
const m_n = 1000 * 60 * 60 * 24 * 7 * 4;
const m_y = 1000 * 60 * 60 * 24 * 365;
const fr = 30;
const bch = 100;
let up = 0;
let d;

function setup() {
  frameRate(fr);
  createCanvas(W, H);
  background(200);
  noFill();
  textAlign(RIGHT, CENTER);
  textFont("monospace");
  textSize(10);
  text(rng.I, W - pad2 / 2, H - pad2 / 2);
}

function draw() {
  d = Date.now();
  rng.I = Math.round(d / 1000 / 60);
  push();
  fill(200);
  noStroke();
  rect(0, H - pad2, W, H);
  pop();
  push();
  stroke(0, 0, 0, 64);
  noFill();
  arc(pad4 * 6 + pad8 * 5, H - pad4, pad4, pad4, 0, TWO_PI);
  arc(pad4 * 5 + pad8 * 4, H - pad4, pad4, pad4, 0, TWO_PI);
  arc(pad4 * 4 + pad8 * 3, H - pad4, pad4, pad4, 0, TWO_PI);
  arc(pad4 * 3 + pad8 * 2, H - pad4, pad4, pad4, 0, TWO_PI);
  arc(pad4 * 2 + pad8 * 1, H - pad4, pad4, pad4, 0, TWO_PI);
  arc(pad4 * 1 + pad8 * 0, H - pad4, pad4, pad4, 0, TWO_PI);
  stroke(0);
  fill(0);
  arc(pad4 * 6 + pad8 * 5,H - pad4,pad4,pad4,-HALF_PI,((d % m_m) / m_m) * (TWO_PI * 2) - HALF_PI);
  arc(pad4 * 5 + pad8 * 4,H - pad4,pad4,pad4,-HALF_PI,((d % m_h) / m_h) * (TWO_PI * 2) - HALF_PI);
  arc(pad4 * 4 + pad8 * 3,H - pad4,pad4,pad4,-HALF_PI,((d % m_d) / m_d) * (TWO_PI * 2) - HALF_PI);
  arc(pad4 * 3 + pad8 * 2,H - pad4,pad4,pad4,-HALF_PI,((d % m_w) / m_w) * (TWO_PI * 2) - HALF_PI);
  arc(pad4 * 2 + pad8 * 1,H - pad4,pad4,pad4,-HALF_PI,((d % m_n) / m_n) * (TWO_PI * 2) - HALF_PI);
  arc(pad4 * 1 + pad8 * 0,H - pad4,pad4,pad4,-HALF_PI,((d % m_y) / m_y) * (TWO_PI * 2) - HALF_PI);
  pop();
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
  push();
  fill(0, 0, 0, 128);
  text(
    Math.round(d / m_y) +
      "." +
      Math.round(d / m_n) +
      "." +
      Math.round(d / m_w) +
      "." +
      Math.round(d / m_d) +
      "." +
      Math.round(d / m_h) +
      "." +
      Math.round(d / m_m),
    W - pad4,
    H - pad4
  );
  pop();
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
    this.I = this.I % 1000000;
    return this.GN;
  },
};
