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
const bch = 50;
let up = 0;
let d = {org:0,mil:0};

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
  d.org = Date.now();
  d.mil = Math.floor(d.org);
  d.sec = Math.floor(d.org / m_s);
  d.min = Math.floor(d.org / m_m);
  d.hor = Math.floor(d.org / m_h);
  d.day = Math.floor(d.org / m_d);
  d.wek = Math.floor(d.org / m_w);
  d.mnt = Math.floor(d.org / m_n);
  d.yer = Math.floor(d.org / m_y);
  rng.I = d.min;
  // push();
  // fill(200);
  // noStroke();
  // rect(W/2, 0, W, H);
  // pop();
  // push();
  // fill(0)
  // text(
  //   d.org + '\n' +
  //   d.mil + '\n' +
  //   d.sec + ' ('+(d.mil % m_s)+')\n' +
  //   d.min + ' ('+(d.mil % m_m)+')\n' +
  //   d.hor + ' ('+(d.mil % m_h)+')\n' +
  //   d.day + ' ('+(d.mil % m_d)+')\n' +
  //   d.wek + ' ('+(d.mil % m_w)+')\n' +
  //   d.mnt + ' ('+(d.mil % m_n)+')\n' +
  //   d.yer + ' ('+(d.mil % m_y)+')\n' +
  //   rng.I, W-10, 10);
  // pop();
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
  arc(pad4 * 6 + pad8 * 5,H - pad4,pad4,pad4,-0,((d.org % m_m) / m_m) * (TWO_PI * 1) - 0);
  arc(pad4 * 5 + pad8 * 4,H - pad4,pad4,pad4,-0,((d.org % m_h) / m_h) * (TWO_PI * 1) - 0);
  arc(pad4 * 4 + pad8 * 3,H - pad4,pad4,pad4,-0,((d.org % m_d) / m_d) * (TWO_PI * 1) - 0);
  arc(pad4 * 3 + pad8 * 2,H - pad4,pad4,pad4,-0,((d.org % m_w) / m_w) * (TWO_PI * 1) - 0);
  arc(pad4 * 2 + pad8 * 1,H - pad4,pad4,pad4,-0,((d.org % m_n) / m_n) * (TWO_PI * 1) - 0);
  arc(pad4 * 1 + pad8 * 0,H - pad4,pad4,pad4,-0,((d.org % m_y) / m_y) * (TWO_PI * 1) - 0);
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
    // this.GN = this.fib(this.GN + this.I) % 1;
    // this.I = this.I % 1000000;
    this.GN = this.fib(this.GN + this.I) % 1;
    return this.GN;
  },
};
