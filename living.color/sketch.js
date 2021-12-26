const W = window.innerWidth;
const H = window.innerHeight;
const MX = Math.max(W, H);
const PI2 = Math.PI * 2;
let ps = window.intro || 20;
let R = 25;
let xy = [];
let xyi = 0;

function setup() {
  randSet(W * H);
  frameRate(15);
  pixelDensity(2);
  createCanvas(W, H);
  for (let y = 0; y < H / ps; y++) { for (let x = 0; x < W / ps; x++) { xy.push({ x, y }); } }
  xy = shuffle(xy);
}

function draw() {
  if(!!window.intro){noLoop();}
  for (let i = 0; i < MX; i++) {
    let ix = xy[xyi].x * ps;
    let iy = xy[xyi].y * ps;
    let c = get(ix, iy);
    stroke(c[3] < 1 || rand(1000) < 1 ? [rrand(2) * 128, rrand(2) * 128, rrand(2) * 128, 256,] : c);
    if (floor(rand(8)) == 0) { line(ix, iy, ix + ps, iy); } else
      if (floor(rand(8)) == 1) { line(ix, iy, ix, iy + ps); } else
        if (floor(rand(8)) == 2) { line(ix, iy, ix - ps, iy); } else
          if (floor(rand(8)) == 3) { line(ix, iy, ix, iy - ps); } else
            if (floor(rand(8)) == 4) { line(ix, iy, ix + ps, iy + ps); } else
              if (floor(rand(8)) == 5) { line(ix, iy + ps, ix + ps, iy); } else
                if (floor(rand(8)) == 6) { line(ix, iy, ix - ps, iy - ps); } else
                  if (floor(rand(8)) == 7) { line(ix, iy - ps, ix - ps, iy); }
    xyi = (xyi + 1) % xy.length;
  }
}
