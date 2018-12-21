console.log(reverseArray([1, 2, 3, 4]));
function reverseArray(mass)
{
  var arr = [];
  var massLenght = mass.length;
  for(let j = 0; j <massLenght; j++)
    {
      arr[massLenght-1-j] = mass[j];
    }
  return arr;
}