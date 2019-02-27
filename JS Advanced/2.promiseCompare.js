'use strict';
function compare(value1, value2) {
    return new Promise((resolve, reject) => {
       setTimeout(() => { 
        if (value1 > value2) resolve('1');
        else if( value1 < value2 ) resolve('-1');
        else if( value1 == value2 ) resolve('0');
        else setTimeout(() => {
           throw new Error('error');
        }, 2000);
      },1000);   
    });
}
compare(10,1)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
        console.error(error);
    });
compare(10,'1e')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
        console.error(error);
    });