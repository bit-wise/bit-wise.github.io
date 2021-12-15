const W = window.innerWidth;
const H = window.innerHeight;
const W1 = W - 1;
const H1 = H - 1;
const M = Math.min(W, H) / 2;
let O = 0; // orientation
let I = 0;
let LR = [];
let RL = [];
let TB = [];
let BT = [];

function setup() {
  frameRate(3);
  pixelDensity(2);
  createCanvas(W, H);
  background(255);
  strokeWeight(1);
  for (let i = 1; i < W1; i++) { LR.push(i); }
  for (let i = W1; i > 1; i--) { RL.push(i); }
  for (let i = 1; i < H1; i++) { TB.push(i); }
  for (let i = H1; i > 1; i--) { BT.push(i); }
}

function draw() {
  let S = round(random(0, O % 2 == 0 ? H : W));
  let B = false;
  let L = [];
  if (O % 2 == 0) {
    if (O == 0) {
      LR.map((d) => { B = get(d, S)[0] < 255 ? !B : B; if (!B) { L.push([d, S]); } });
    } else {
      RL.map((d) => { B = get(d, S)[0] < 255 ? !B : B; if (!B) { L.push([d, S]); } });
    }
  } else {
    if (O == 1) {
      TB.map((d) => { B = get(S, d)[0] < 255 ? !B : B; if (!B) { L.push([S, d]); } });
    } else {
      BT.map((d) => { B = get(S, d)[0] < 255 ? !B : B; if (!B) { L.push([S, d]); } });
    }
  }
  L.map((l, i) => {
    stroke(map(i, 0, L.length, 0, 255));
    point(l[0], l[1]);
  });
  O = (O + 1) % 4;
  if (I++ > M) { noLoop(); }
}
