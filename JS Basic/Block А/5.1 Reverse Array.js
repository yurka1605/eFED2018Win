function reverseArray(mass) {
  var arr = [];
  var massLength = mass.length;
  for(let j = 0; j <massLength; j++) {
      arr[massLength-1-j] = mass[j];
    }
  return arr;
}
console.log(reverseArray([1, 2, 3, 4]));