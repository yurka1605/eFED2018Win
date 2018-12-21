console.log(makeArray(10,1,2));
function makeArray(a,b,c){
  var arg = addArg(a,b,c);
  var count = a;
  var str = a;
  if(a<b)
    {
      while(count < b)
      {
        count = count +arg;
        str = str + ' ' + count;
      }
    }
  else if(a>b){
    while(count > b)
    {
      count = count +arg;
      if(count > b)
      {
          str = str + ' ' + count;
      }
    }
  } 
  var res = str.split(' '); 
    return console.log(res);
}
function addArg(x,y,arg){
 if(arg === undefined)
 {
   if(x>y)
   {
      return -1;
   }
   else
   {
     return 1;
   }
 }
 else
 {
   if(x<y)
   {
      return arg;
   }
   else
   {
     arg = (-1)*arg;
     return arg;
   }
 }
}