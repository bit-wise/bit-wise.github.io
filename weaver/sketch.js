const W = window.innerWidth;
const H = window.innerHeight;
const W1 = W - 1;
const H1 = H - 1;
const H2 = H / 2;
let O = 0; // orientation
let I = 0;

function setup() {
  pixelDensity(2);
  createCanvas(W, H);
  background(255);
  strokeWeight(1);
  // frameRate(2);
}

function draw() {
  let S = round(random(0, O % 2 == 0 ? H : W));
  let B = false;
  let L = [];
  if (O % 2 == 0) {
    if (O == 0) {
      for (let i = 0; i < W1; i++) {
        B = get(i, S)[0] < 128 ? !B : B;
        if (!B) {
          L.push([i, S]);
        }
      }
    } else {
      for (let i = W1; i > 0; i--) {
        B = get(i, S)[0] < 128 ? !B : B;
        if (!B) {
          L.push([i, S]);
        }
      }
    }
  } else {
    if (O == 1) {
      for (let i = 0; i < H1; i++) {
        B = get(S, i)[0] < 128 ? !B : B;
        if (!B) {
          L.push([S, i]);
        }
      }
    } else {
      for (let i = H1; i > 0; i--) {
        B = get(S, i)[0] < 128 ? !B : B;
        if (!B) {
          L.push([S, i]);
        }
      }
    }
  }
  L.map((l) => {
    point(l[0], l[1]);
  });
  O = (O + 1) % 4;
  if (I++ > H2) {
    noLoop();
  }
}
