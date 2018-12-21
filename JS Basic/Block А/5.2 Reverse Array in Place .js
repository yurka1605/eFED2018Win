var array = ['A', 'B', 'C', 'D'];
reverseArrayInPlace(array);
console.log(array);

function reverseArrayInPlace()
{
  array.reverse();
  var lengthArr = array.length;
  var el;
  for(let i = 0; i<lengthArr; i++)
  {
     el=array[lengthArr-i-1];
     array[lengthArr-i-1]=array[i];
     array[i]=el;
  }
  return array;
}