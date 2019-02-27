function random() {
    return new Promise(function(resolve) {
      var timeout = Math.random()*3000;
      setTimeout(function(){
        resolve(Math.random()*3);
    }, timeout)
  })
}
let arrCall = [];

function fillArray() {
  for (let i = 0; i < 8; i++) {
     arrCall.push(random());
  }
}
fillArray();
Promise.all(arrCall)
  .then(res => {
    console.log(res);
  });