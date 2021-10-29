const inp = 'sample3.jpg';
const outp = ['living.color', 'jpg'];
const W = 1920 * 2; const W4 = W/4;
const H = W * (3 / 4);
const range = Math.min(W, H);
const inc = 0.01;
const rad = 75;
const rst = Math.round(rad / inc);
let canvas, img, X, Y, C, J, nR, xR, nG, xG, nB, xB, SW, R;
let M = W4/2; pI = 0; let rI = 0; let I = 0; let L = 0; let prt = false; let xyMap = []; let pxMap = []; let rMap = [];

function preload() {
    img = loadImage(inp);
}

function setup() {
    pixelDensity(1);
    image(img, 0, 0);
    canvas = createCanvas(W, H);
    for (let x = 0; x < W; x++) { for (let y = 0; y < H; y++) { pxMap.push({ x, y }); } }
    pxMap = shuffle(pxMap);
    for (let i = 0; i < W; i++) { rMap.push(random(-1, 1)); }
    rMap = shuffle(rMap);
    X = pxMap[0].x;
    Y = pxMap[0].y;
}

function draw() {
    if (I == 0) { image(img, -10, -10, W + 10, H + 10); }
    if (I == rst && prt) { saveCanvas(outp[0], outp[1]); }
    if (I > rst * 2) { I = 0; L = 0; } else
        if (I > rst) { L--; }
        else { L++; }
    I++;
    nR = 128; xR = 128; nG = 128; xG = 128; nB = 128; xB = 128;

    SW = map(rad / (L * inc + 1), rad, 1, 250, 1);
    J = map(L, 0, rst, 0, 4);
    rI++; if (rI >= rMap.length) { rI = 0; }
    R = rMap[rI] * J;
    xyMap = [];

    if (frameRate() > 24 && M < W4) { M++ } else { M-- }
    for (let i = 0; i < M; i++) {
        pI++; if (pI >= pxMap.length) { pI = 0; }
        X = pxMap[pI].x;
        Y = pxMap[pI].y;

        C = get(X, Y);
        xyMap.push({ x: X, y: Y, r: C[0] + R, g: C[1] + R, b: C[2] + R });
    }
    xyMap.map(m => { nR = min(m.r, nR); xR = max(m.r, xR); nG = min(m.g, nG); xG = max(m.g, xG); nB = min(m.b, nB); xB = max(m.b, xB); });
    xyMap.map(m => {
        strokeWeight(SW);
        stroke(round(map(m.r, nR, xR, 0, 255)), round(map(m.g, nG, xG, 0, 255)), round(map(m.b, nB, xB, 0, 255)));
        point(m.x, m.y);
    });
}
