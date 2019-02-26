'use strict';
const myObject = {
    count: 1,
    next: function() {
        this.count++;
        return this.count;
    },
    prev: function() {
        this.count--;
        return this.count;
    }
}
console.log( myObject.next());
console.log( myObject.next());
console.log( myObject.next());
console.log( myObject.prev());