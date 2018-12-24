function makeArray(firstElem, lastElem, arg) {
  var count = firstElem;
  var str = firstElem;
  var newArg;
  if(firstElem < lastElem) {
    if(arg === undefined) {
      arg = 1;
    }
    while(count < lastElem) {
      count = count + arg;
      if(count < lastElem) {
          str = str + ' ' + count;
      }
    }
  }
  else if(firstElem > lastElem) {
    if(arg === undefined) {
      arg = 1;
    }
    while(count > lastElem) {
      count = count - arg;
      if(count > lastElem) {
          str = str + ' ' + count;
      }
    }
  } 
  var res = str.split(' '); 
  return res;
}
console.log(makeArray(1, 10, 2));