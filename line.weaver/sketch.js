const W = window.innerWidth;
const H = window.innerHeight;
const W1 = W - 1;
const H1 = H - 1;
let I = 0;
let LR = [];
let RL = [];
let TB = [];
let BT = [];
let rx = [];
let rxi = 0;
let ry = [];
let ryi = 0;
let xyi = 0;

function setup() {
  frameRate(3);
  createCanvas(W, H);
  strokeWeight(1);
  for (let x = 1; x < W1; x++) { if (rand(1) > 0.75) { rx.push(x); } } rx = shuffle(rx);
  for (let y = 1; y < H1; y++) { if (rand(1) > 0.75) { ry.push(y); } } ry = shuffle(ry);
  for (let i = 1; i < W1; i++) { LR.push(i); }
  for (let i = W1; i > 1; i--) { RL.push(i); }
  for (let i = 1; i < H1; i++) { TB.push(i); }
  for (let i = H1; i > 1; i--) { BT.push(i); }
}

function draw() {
  let C = xyi % 2 == 0 && ryi < ry.length;
  let S = C ? ry[ryi++] : rx[rxi++];
  let B = false;
  let L = [];
  if (C) {
    if (xyi == 0) {
      LR.map((d) => { B = get(d, S)[3] > 0 ? !B : B; if (!B) { L.push([d, S]); } });
    } else {
      RL.map((d) => { B = get(d, S)[3] > 0 ? !B : B; if (!B) { L.push([d, S]); } });
    }
  } else {
    if (xyi == 1) {
      TB.map((d) => { B = get(S, d)[3] > 0 ? !B : B; if (!B) { L.push([S, d]); } });
    } else {
      BT.map((d) => { B = get(S, d)[3] > 0 ? !B : B; if (!B) { L.push([S, d]); } });
    }
  }
  stroke([rrand(2) * 128, rrand(2) * 128, rrand(2) * 128, 256,]);
  L.map((l, i) => {
    point(l[0], l[1]);
  });
  xyi++;
  if (xyi >= rx.length + ry.length) { noLoop(); console.log('end') }
}
