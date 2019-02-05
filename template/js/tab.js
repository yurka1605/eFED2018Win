
/*   var days = document.querySelectorAll('.days');
  var speedWindDays = document.querySelectorAll('#middleTable>li');
  var probabilityDays = document.querySelectorAll('#bottomTable>li');
  var leftArrow = document.getElementById('leftArrow');
  var rightArrow = document.getElementById('rightArrow');
  var num = 0;

  leftArrow.addEventListener('click', function(event) {
    leftArrow.style.background = 'blue';
    leftArrow.style.opasity = '0.6';
    setInterval(function () {
      leftArrow.style.background = '#fff';
      leftArrow.style.opasity = '1';
    },200);
    for (let i = 0; i < days.length; i++) {
      var left = getComputedStyle(days[i]).marginLeft;
      if(left == '-5px') {
        num = i;
      }
    }
    if(num<6) {
      days[num].style.borderRight = '0';
      days[num+1].style.borderRight = '1px solid #979797';
      days[num+1].classList.add('animate');
      days[num-4].classList.add('hideElem');
      days[num+1].classList.remove('hideRight');
      days[num-4].classList.remove('animateRight');

      speedWindDays[num].style.borderRight = '0';
      speedWindDays[num+1].style.borderRight = '1px solid #979797';
      speedWindDays[num+1].classList.add('animate');
      speedWindDays[num-4].classList.add('hideElem');
      speedWindDays[num+1].classList.remove('hideRight');
      speedWindDays[num-4].classList.remove('animateRight');

      probabilityDays[num].style.borderRight = '0';
      probabilityDays[num+1].style.borderRight = '1px solid #979797';
      probabilityDays[num+1].classList.add('animate');
      probabilityDays[num-4].classList.add('hideElem');
      probabilityDays[num+1].classList.remove('hideRight');
      probabilityDays[num-4].classList.remove('animateRight');
    }
  });

  rightArrow.addEventListener('click', function(event) {
    rightArrow.style.background = 'blue';
    rightArrow.style.opasity = '0.6';
    setInterval(function () {
      rightArrow.style.background = '#fff';
      rightArrow.style.opasity = '1';
    },200);
    for (let i = 0; i < days.length; i++) {
      var left = getComputedStyle(days[i]).marginLeft;
      if(left == '-5px') {
        num = i;
      }
    }
    console.log(num);
    //num = ;
    if(num>4) {
      if(num != 6) {
        days[num+1].style.borderRight = '0';
      }
      days[num-1].style.borderRight = '1px solid #979797';
      days[num].classList.remove('animate');
      days[num].classList.add('hideRight');
      days[num-5].classList.remove('hideElem');
      days[num-5].classList.add('animateRight');
      if(num != 6) {
        speedWindDays[num+1].style.borderRight = '0';
      }
      speedWindDays[num-1].style.borderRight = '1px solid #979797';
      speedWindDays[num].classList.remove('animate');
      speedWindDays[num].classList.add('hideRight');
      speedWindDays[num-5].classList.remove('hideElem');
      speedWindDays[num-5].classList.add('animateRight');
      if(num != 6) {
        probabilityDays[num+1].style.borderRight = '0';
      }
      probabilityDays[num-1].style.borderRight = '1px solid #979797';
      probabilityDays[num].classList.remove('animate');
      probabilityDays[num].classList.add('hideRight');
      probabilityDays[num-5].classList.remove('hideElem');
      probabilityDays[num-5].classList.add('animateRight');
    }
  }); */