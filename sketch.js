const inp = 'sample3.jpg';
const outp = ['living.color', 'jpg'];
const rst = 10000;
const fac = 4;
const W = 1920 * 2; const W4 = W / 4; const H = W * (3 / 4); const os = Math.floor(fac / 2); const sw = Math.pow(fac, 2); const Wos = (W - os) / fac; const Hos = (H - os) / fac;
let canvas, img, C, P; let M = W4 / 2; let I = 0; let prt = false; let xyMap = []; pI = 0; let pxMap = [];
function preload() { img = loadImage(inp); }
function setup() {
    pixelDensity(1);
    canvas = createCanvas(W, H);
    for (let x = os; x < Wos; x++) { for (let y = os; y < Hos; y++) { pxMap.push({ x: x * fac, y: y * fac, w: round(random(fac, sw)) }); } }
    pxMap = shuffle(pxMap);
    X = pxMap[0].x; Y = pxMap[0].y;
    image(img, 0, 0, W, H);
}
function draw() {
    I++; if (I == pxMap.length - 1 && prt) { saveCanvas(outp[0], outp[1]); I = 0; }
    xyMap = [];
    if (frameRate() > 24 && M < W4) { M++ } else { M-- }
    for (let i = 0; i < M; i++) {
        pI++; if (pI >= pxMap.length) { pI = 0; }; P = pxMap[pI];
        C = get(P.x, P.y);
        xyMap.push({ x: P.x, y: P.y, r: C[0], g: C[1], b: C[2], w: P.w });
    }
    xyMap.map(m => { strokeWeight(m.w); stroke(m.r, m.g, m.b, 255); point(m.x, m.y); });
}
