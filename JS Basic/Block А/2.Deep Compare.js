console.log(deepCompare({ one: 1, two: '2' }, {  one: 1, two: '2' }));
function deepCompare(a,b){
  if(a.one === b.one && a.two === b.two)
  {
    return true;
  }
  else {
    return false;
  }
}