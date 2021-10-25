let canvas, img, X, Y, rangeX, rangeY, C, T;
const W = window.innerWidth;
const H = window.innerHeight;
const W2 = W / 2;
const H2 = H / 2;
const range = Math.min(W, H);

function preload() {
    img = loadImage('sample3.jpg');
}

function setup() {
    image(img, 0, 0);
    canvas = createCanvas(W, H);
    X = random(0, width);
    Y = random(0, height);
}

let I = 0;
let J = 1;
let minC = 0;
// let maxC = 255;
let maxC = 765;
let inc = 0.01;
let rad = 50;
let rst = Math.round(rad / inc);
let prt = Math.round(rst * 0.99);
let j = 5;

function draw() {
    if (I == 0) {
        image(img, 0, 0, W, H);
    }
    // // if (I % 100 == 0) {
    //     J += inc;
    // // }
    // if(I == prt){
    //     saveCanvas('living.color', 'png');
    // }
    // if(I == rst){
    //     J = 1;
    // }
    if (I == rst) {
             saveCanvas('living.color', 'png');
    }
    if (I > rst * 2) {
        I = 0;
        J = 1;
    } else if (I > rst) {
        J -= inc;
    } else {
        J += inc;
    }
    // j = J / 1;
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
        // minC = min(C[0], C[1], C[2], minC + 0.01);
        // maxC = max(C[0], C[1], C[2], maxC - 0.01);
        minC = min(T, minC + 0.0001);
        maxC = max(T, maxC - 0.0001);

        // strokeWeight(10);
        // strokeWeight(map(T, 0, 765, 5, 10));
        strokeWeight(rad / J);
        // stroke(C[0], C[1], C[2], map(T, 0, 765, 255, 128));
        stroke(
            round(map(C[0] + random(-j, j), minC, maxC / 3, 0, 255)),
            round(map(C[1] + random(-j, j), minC, maxC / 3, 0, 255)),
            round(map(C[2] + random(-j, j), minC, maxC / 3, 0, 255))
        );
        point(X + 0, Y + 0);
    }
    // img = get(
    //     -100,
    //     -100,
    //     W + 200,
    //     H + 200,
    // );
}

function mouseReleased() {
    saveCanvas('living.color', 'png');
}
