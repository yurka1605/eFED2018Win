function every(arr, argIsNan) {
    var answer;
    for(let i = 0; i < arr.length; i++) {
      if (argIsNan(arr[i]) === true) {
        answer = argIsNan(arr[i]);
      } else {
        answer = argIsNan(arr[i]);
      }
    }
    return answer;
  }
  function some(arr, argIsNan) {
    var answer;
    for(let i = 0; i < arr.length; i++) {
      if (argIsNan(arr[i]) === true) {
        answer = argIsNan(arr[i]);
        break;
      } else {
        answer = argIsNan(arr[i]);
      }
    }
    return answer;
  }
  console.log(every([NaN, NaN], Number.isNaN));
  console.log(some([2, 6, NaN, 1], Number.isNaN));