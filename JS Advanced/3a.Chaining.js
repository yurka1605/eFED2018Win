'use strict';
function random(sumWith) {
    return new Promise(function(resolve) {
      var timeout = Math.random()*3000;
      setTimeout(function(){
        resolve(Math.random()*3+ sumWith);
    }, timeout)
  })
}
random(2)
  .then(res => {
    return res*2;
  })
  .then(res => { 
    return res*2;
  })
  .then(res => {
    console.log(res*2);
  })