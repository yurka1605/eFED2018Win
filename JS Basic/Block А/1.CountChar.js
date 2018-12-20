console.log(countChar('My Random String', 'm'));
function countChar(a,b){
  c = a+b;
  var count = 0;
  for(i = 0;i < c.length; i++)
  {
    count++;
  }
  return count + " символов учитывая пробелы";
}
