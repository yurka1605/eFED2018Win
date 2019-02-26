'use strict';
const delay = 2000;
const timerId = setInterval(() => {
    console.log('text');
}, delay);
setTimeout(() => {
    clearInterval(timerId);
//     console.log('stop');
}, delay*5);