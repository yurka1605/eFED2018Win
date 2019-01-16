/* this.window.onload = function() {
  window.document.getElementById("mainInfo").innerHTML = JSON.stringify(
    weekForecastMock
  );
}; */
window.onload = function() {
  /* Slider */
  var arrowLeft = document.getElementsByClassName('arrowLeft')[0];
  var arrowRight = document.getElementsByClassName('arrowRight')[0];
  var slide = document.getElementsByClassName('slide');
  var nameDay = document.getElementsByClassName('navDays');

  /* Левая стрелка */
  
  arrowLeft.addEventListener('click',function() {
    num = getNumber();
    if (num == 0) prev(slide.length-1, 0);
    else prev(num-1,num);
  });

  /* Правая стрелка */

  arrowRight.addEventListener('click',function() {
    num = getNumber();
    if (num == slide.length-1) next(0,num);
    else next(num+1,num); 
  });
  
  /* Переключатели */

  for (let i = 0; i < nameDay.length; i++) {
    nameDay[i].addEventListener('click',function() {
      num = getNumber();
      if (num < i) next(i,num);
      else  if (num > i) prev(i, num);
    });
  }

  /* Выбор номера слайда */

  function getNumber() {
    for (let i = 0; i < slide.length; i++) {
      var currentSlide = getComputedStyle(slide[i]).transform; 
      if (currentSlide == 'matrix(1, 0, 0, 1, 0, 0)') {
        var getNum = i;
      }
    }
    return getNum;
  }

  /* Следующий слайд */

  function next(a,b) {
    slide[a].classList.add('currentDayShowRight');
    slide[a].classList.remove('dayHideRight');
    slide[a].classList.remove('dayHide');
    slide[b].classList.add('dayHideRight');
    slide[b].classList.remove('currentDayShow');
    slide[b].classList.remove('currentDayShowRight');
    nameDay[b].classList.remove('current');
    nameDay[a].classList.add('current');
  }

  /* Предыдущий слайд  */
  function prev(a,b) {
    slide[a].classList.add('currentDayShow');
    slide[a].classList.remove('dayHide');
    slide[a].classList.remove('dayHideRight');
    slide[b].classList.add('dayHide');
    slide[b].classList.remove('currentDayShow');
    slide[b].classList.remove('currentDayShowRight');
    nameDay[b].classList.remove('current');
    nameDay[a].classList.add('current');
  }
  var today = document.getElementById('today');
  var fiveDay = document.getElementById('fiveDay');
  var history = document.getElementById('historyWeather');

  today.addEventListener('click',function () {javascript:document.location.href='weather-details.html';});
  fiveDay.addEventListener('click',function () {javascript:document.location.href='index.html';});
  history.addEventListener('click',function () {javascript:document.location.href='historical-review.html';});
};
