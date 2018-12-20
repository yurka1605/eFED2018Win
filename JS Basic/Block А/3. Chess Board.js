console.log(chessBoard(8, 4));
function chessBoard(a,b){
  var mass = [];
  var height = b+1;
  var width = a+1;
  //var count = 0;
  for(let i = 1; i<height;i++)
    {
      let c=i%2;
      /* для наглядности 1 строку переношу на новую */
      if (i === 1)
        {
          let arr = [];
          for(let j = 1;j< width; j++)
            {
              let d = j%2;
              if(d !== 0)
              {
                arr[j] = '#';
              }
              else
              {
                 arr[j] = ' ';
              }
            }
          let str = arr.join(''); 
          mass[i] ='\n' + str+'\n';//перенос первого элемента массива из строк
        }
      else if (c !== 0)
        {
          let arr = [];
          for(let j = 1;j< width; j++)
            {
              let d = j%2;
              if(d !== 0)
              {
                arr[j] = '#';
              }
              else
              {
                 arr[j] = ' ';
              }
            }
          let str = arr.join(''); 
          mass[i] = str+'\n';
        }
      else
      {
          let arr = [];
          for(let j = 1;j< width; j++)
            {
              let d = j%2;
              if(d !== 0)
              {
                arr[j] = ' ';
              }
              else
              {
                 arr[j] = '#';
              }
            }
          let str = arr.join(''); 
          mass[i] = str+'\n';
      }
    }
  var str = mass.join(''); 
  return str;
}