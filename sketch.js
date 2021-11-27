const outp = ['living.color', 'jpg'];
const rst = 10000;
const fac = 3;
const W = 1920 * 1; const W4 = W / 4; const H = W * (3 / 4); const os = 1; const sw = Math.pow(fac, 2); const Wos = (W - os * 2) / fac; const Hos = (H - os * 2) / fac;
let canvas, img, C, P; let M = W4 / 2; let I = 0; let E = 0; let MR = 10000; let prt = false; let xyMap = []; pI = 0; let pxMap = [];
function setup() {
    pixelDensity(2);
    canvas = createCanvas(W, H);
    for (let x = os; x < Wos; x++) { for (let y = os; y < Hos; y++) { pxMap.push({ x: x * fac, y: y * fac, w: round(random(fac, sw)) }); } }
    pxMap = shuffle(pxMap);
    X = pxMap[0].x; Y = pxMap[0].y;
}
function draw() {
    I++; if (I == pxMap.length - 1 && prt) { saveCanvas(outp[0], outp[1]); I = 0; }
    xyMap = [];
    if (frameRate() > 24 && M < W4) { M++ } else { M-- }
    for (let i = 0; i < M; i++) {
        pI++; if (pI >= pxMap.length) { pI = 0; pxMap = shuffle(pxMap);}; P = pxMap[pI];
        C = get(P.x, P.y);
        if (C[3] > 0 && pI % MR != 0) { xyMap.push({ x: P.x, y: P.y, r: C[0], g: C[1], b: C[2], w: P.w }); }
        else { xyMap.push({ x: P.x, y: P.y, r: round(random(0, 255)), g: round(random(0, 255)), b: round(random(0, 255)), w: P.w }); }
    }
    xyMap.map(m => { strokeWeight(m.w); stroke(m.r, m.g, m.b); point(m.x, m.y); });
}
