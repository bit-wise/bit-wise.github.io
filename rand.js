const randa = [];
let randi = 0;

function randSet(n){
    for (let i = 0; i < n; i++) {
    randa.push(random());
  }
}

function rand(n) {
  randi = (randi + 1) % randa.length;
  return randa[randi] * n;
}