function deepCompare(firstObj, secondObj) {
  if(Object.keys(firstObj).length !== Object.keys(secondObj).length) {
    return false;
  }
  for(key in firstObj) {
    if(firstObj[key] === secondObj[key]) {
      return true;
    } else {
      return false;
    }
  }
}
console.log(deepCompare({ one: 1, two: '2' }, { two: 2 , one: 1 }));