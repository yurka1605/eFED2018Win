'use strict';
//1
function sumWith(number) {
    return this.currentValue += number;
}

const number = 2;
const ctx = {
  currentValue: 3
};
const sum = sumWith.bind(ctx,number);
console.log(sum());
//2
'use strict';
function sumWith(number) {
    return this.currentValue += number;
}

const number = 2;
const ctx = {
  currentValue: 3
};
console.log(sumWith.call(ctx, number));