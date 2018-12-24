console.log( countChar('My Random String', 'm'));
function countChar(stringTest, charCount) {
  var count = 0;
  stringTest
    .toLowerCase()
    .split('')
    .forEach(function(element) {
      if ( element === charCount.toLowerCase() ) {
        count++;
      }
  });
  
  return count;
}