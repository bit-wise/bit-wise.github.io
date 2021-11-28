const outp = ['living.color', 'jpg'];
const fac = 1;
const W = 1920 * 1; const H = W * (3 / 4); const WM = W * 1.50; const os = 1; const Wos = (W - os * 2) / fac; const Hos = (H - os * 2) / fac;
let canvas, img, C, P, pos, Cc; let F = fac * 2; let Ca = [[F, -F], [0, -F], [-F, -F], [F, 0], [-F, 0], [F, F], [0, F], [-F, F]]; let M = WM; let I = 0; let E = 0; let prt = false; let xyMap = []; pI = 0; let pxMap = [];
function setup() {
    pixelDensity(2);
    canvas = createCanvas(W, H);
    for (let x = os; x < Wos; x++) { for (let y = os; y < Hos; y++) { pxMap.push({ x: x * fac, y: y * fac, w: fac + 2 }); } }
    pxMap = shuffle(pxMap);
    X = pxMap[0].x; Y = pxMap[0].y;
    frameRate(0.1 * 10); rend();
}
function draw() { rend(); }
function rend() {
    I++; if (I == pxMap.length - 1 && prt) { saveCanvas(outp[0], outp[1]); I = 0; }
    xyMap = [];
    if (M < WM) { M++ } else { M-- }
    for (let i = 0; i < M; i++) {
        pI++; if (pI >= pxMap.length) { pI = 0; pxMap = shuffle(pxMap); }; P = pxMap[pI];
        C = get(P.x, P.y);
        if (C[3] > 0) { xyMap.push({ x: P.x, y: P.y, r: C[0], g: C[1], b: C[2], w: P.w + grow(C, P) }); }
        else { xyMap.push({ x: P.x, y: P.y, r: round(random(0, 255)), g: round(random(0, 255)), b: round(random(0, 255)), w: P.w }); }
    }
    xyMap.map(m => { strokeWeight(m.w); stroke(m.r, m.g, m.b); point(m.x, m.y); });
}
function grow(C, P) {
    pos = 0;
    Ca.map(c => {
        if (P.x + c[0] < 0 || P.x + c[0] > W || P.y + c[1] < 0 || P.y + c[1] > H) { return false; }
        Cc = get(P.x + c[0], P.y + c[1]); if (Cc[0] == C[0] && Cc[1] == C[1] && Cc[2] == C[2]) { pos += 1; } 
    });
    return pos;
}
