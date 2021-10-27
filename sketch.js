let canvas, img, X, Y, rangeX, rangeY, C, T;
const W = window.innerWidth;
const H = W * (3 / 4);
const W2 = W / 2;
const H2 = H / 2;
const range = Math.min(W, H);

function preload() {
    img = loadImage('sample4.jpg');
}

function setup() {
    // pixelDensity(1);
    image(img, 0, 0);
    canvas = createCanvas(W, H);
    X = random(0, width);
    Y = random(0, height);
}

let I = 0;
let J = 1;
let minR = 0;
let maxR = 255;
let minG = 0;
let maxG = 255;
let minB = 0;
let maxB = 255;
let inc = 0.01;
let rad = 50;
let rst = Math.round(rad / inc);
let prt = false;
let j = 1;
let K = 0;
let L = 0;

function draw() {
    if (I == 0) {
        image(img, 0, 0, W, H);
    }
    if (I == rst && prt) {
        saveCanvas('living.color', 'jpg');
    }
    if (I > rst * 2) {
        I = 0;
        J = 1;
        K = 0;
        L = 0;
    } else if (I > rst) {
        J -= inc;
        K -= inc / 20;
        L--;
    } else {
        J += inc;
        K += inc / 20;
        L++;
    }
    I++;
    for (let i = 0; i < 1000; i++) {
        rangeX = random(-range, range);
        rangeY = random(-range, range);
        X += rangeX;
        Y += rangeY;

        if (X > width) { X = X - width; }
        if (Y > height) { Y = Y - height; }
        if (X < 0) { X = width + X; }
        if (Y < 0) { Y = height + Y; }

        C = get(X, Y);
        T = C[0] + C[1] + C[2];
        minR = min(C[0], minR + 0.0001);
        maxR = max(C[0], maxR - 0.0001);
        minG = min(C[1], minG + 0.0001);
        maxG = max(C[1], maxG - 0.0001);
        minB = min(C[2], minB + 0.0001);
        maxB = max(C[2], maxB - 0.0001);

        strokeWeight(rad / J + random(0, j));
        stroke(
            round(map(C[0] + random(-j - K, j + K), minR-5, maxR+5, 0, 255)),
            round(map(C[1] + random(-j - K, j + K), minG-5, maxG+5, 0, 255)),
            round(map(C[2] + random(-j - K, j + K), minB-5, maxB+5, 0, 255)),
            round(map(L, 0, rst / rad, 0, 255))
        );
        point(X + 0, Y + 0);
    }
}
function mouseReleased() {
    saveCanvas('living.color', 'jpg');
}
