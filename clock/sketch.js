const W = window.innerWidth;
const H = window.innerHeight;
const pad = Math.max(W, H) * 0.1;
const pad2 = pad / 2;
const fr = 30;
const bch = 100;
let up = 0;

function setup() {
  frameRate(fr);
  createCanvas(W, H);
  background(200);
  textAlign(RIGHT, BOTTOM);
  textFont("monospace");
  textSize(10);
  text(rng.I, W - pad2 / 2, H - pad2 / 2);
}

function draw() {
  rng.I = Math.round(Date.now() / 1000 / 60);
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
      text(rng.I, W - pad2 / 2, H - pad2 / 2);
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
    this.I = this.I % 1000000;
    return this.GN;
  },
};
