'use strict';
function counter(index) {
    let current = 0;
    return () => {
        current = current + index;
        return current;
    }
}
const next = counter(1); // next

console.log(next());
console.log(next());
console.log(next());

const prev = counter(-1);// prev

console.log(prev());
console.log(prev());
console.log(prev());