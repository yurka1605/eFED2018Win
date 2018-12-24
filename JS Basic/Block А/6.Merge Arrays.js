function mergeArrays(...a) {
  var arr = [];
  //for(let i = 0; i<arguments.length; i++)
  //{
  //  arr = arr.concat(arguments[i]);
    //console.log(arr);
  //}
  arr = arr.concat(...a);
  for(let i = 0;i<arr.length;i++) {
    for(let j = i+1; j<arr.length ;j++) {
        if (arr[i] == arr[j]) {
            arr.splice(i,1);
        }
    }
  }
  return arr;
}
console.log(mergeArrays([1, 2], [3, 4], [4, 6]));