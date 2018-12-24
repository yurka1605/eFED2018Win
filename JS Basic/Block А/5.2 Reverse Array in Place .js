var array = ['A', 'B','C', 'D'];
function reverseArrayInPlace(array) {
  for(let i = 0; i<=(array.length-1)/2; i++) {
    [array[i], array[array.length-i-1]] = [array[array.length-i-1], array[i]];
  }
  return array;
}
reverseArrayInPlace(array);
console.log(array);