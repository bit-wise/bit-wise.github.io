const inp = 'sample3.jpg';
const outp = ['living.color', 'jpg'];
const W = 1920 * 2;
const H = W * (3 / 4);
const range = Math.min(W, H);
const inc = 0.01;
const rad = W / 50;
const rst = Math.round(rad / inc);
const M = 1024;
const M2 = M / 2;
let canvas, img, X, Y, rX, rY, C, J, nR, xR, nG, xG, nB, xB, SW;
let I = 0;
let L = 0;
let prt = false;
let xyMap = [];

function preload() {
    img = loadImage(inp);
}

function setup() {
    pixelDensity(1);
    image(img, 0, 0);
    canvas = createCanvas(W, H);
    X = random(0, width);
    Y = random(0, height);
}

function draw() {
    if (I == 0) {
        image(img, 0, 0, W, H);
    }
    if (I == rst && prt) {
        saveCanvas(outp[0], outp[1]);
    }
    if (I > rst * 2) {
        I = 0;
        L = 0;
    } else if (I > rst) {
        L--;
    } else {
        L++;
    }
    I++;
    nR = 128; xR = 128; nG = 128; xG = 128; nB = 128; xB = 128;

    SW = rad / (L * inc + 1);
    J = map(L, 0, rst, 0, 1);
    xyMap = [];

    for (let i = 0; i < M; i++) {
        rX = random(-range, range);
        rY = random(-range, range);
        X += rX;
        Y += rY;
        X = round(X);
        Y = round(Y);

        if (X >= width) { X = X - width; }
        if (Y >= height) { Y = Y - height; }
        if (X <= 0) { X = width + X; }
        if (Y <= 0) { Y = height + Y; }

        C = get(X, Y);
        xyMap.push({ x: X, y: Y, 
            r: C[0] + random(-J, J), g: C[1] + random(-J, J), b: C[2] + random(-J, J) });
    }
    xyMap.map(m => {
        nR = min(m.r, nR);
        xR = max(m.r, xR);
        nG = min(m.g, nG);
        xG = max(m.g, xG);
        nB = min(m.b, nB);
        xB = max(m.b, xB);
    });
    xyMap.map(m => {
        strokeWeight(SW);
        stroke(
            round(map(m.r, nR, xR, 0, 255)),
            round(map(m.g, nG, xG, 0, 255)),
            round(map(m.b, nB, xB, 0, 255)),
        );
        point(m.x, m.y);
    });
}
