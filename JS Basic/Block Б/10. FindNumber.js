function findNumbers(arr) {
  var regexp = /[a-d f-z]/ig;
  var regexp1 = /^(.)$/g;
  var regexp2 = /^([0-9]{1,}\+[0-9]{0,})$/g;
  var regexp3 = /(^[0-9]{1,}e{1,}[0-9]{1,}\.[0-9a-z]{1,}$)/ig;
  var  mass = '';
  for (let i = 0; i < arr.length; i++) {
    var result = arr[i].match(/\+|\-|\./g);
    if(regexp.test(arr[i]) === false && regexp1.test(arr[i]) === false && regexp2.test(arr[i]) === false && regexp3.test(arr[i]) === false) {  
      if(result !== null) {
          if (result.length < 2) {
            mass +=arr[i] + ';';
          }
      } else {
        mass +=arr[i] + ';';
      }
    }
  }
  arr = mass.split(';');
  arr.splice(arr.length-1,1);
  return arr;
}
console.log(findNumbers(["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]));
console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]));
