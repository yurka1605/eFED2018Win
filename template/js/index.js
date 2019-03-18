'use strict';
window.onload = () => {
    /* Slider */
    const arrowLeft = document.getElementsByClassName('arrowLeft')[0];
    const arrowRight = document.getElementsByClassName('arrowRight')[0];
    const slide = document.getElementsByClassName('slide');
    const nameDay = document.getElementsByClassName('navDays');
    let num;
    /* Левая стрелка */
    arrowLeft.addEventListener('click',() => {
        num = getNumber();
        num === 0 ? prev(slide.length-1, 0): prev(num-1,num);
    });
    /* Правая стрелка */
    arrowRight.addEventListener('click',() => {
        num = getNumber();
        num === slide.length-1 ? next(0,num): next(num+1,num);
    });
    /* Переключатели */
    for (let i = 0; i < nameDay.length; i++) {
        nameDay[i].addEventListener('click',() => {
            num = getNumber();
            if (num < i) next(i,num);
            else  if (num > i) prev(i, num);
        });
    }
    /* Выбор номера слайда */
    const getNumber = () => {
        let getNum;
        for (let i = 0; i < slide.length; i++) {
            let currentSlide = getComputedStyle(slide[i]).transform;
            if (currentSlide === 'matrix(1, 0, 0, 1, 0, 0)') getNum = i;
        }
        return getNum;
    };
    /* Следующий слайд */
    const next = (a,b) => {
        if (slide[a] === undefined) return false;
        else {
            slide[a].classList.add('currentDayShowRight');
            slide[a].classList.remove('dayHideRight');
            slide[a].classList.remove('dayHide');
            slide[b].classList.add('dayHideRight');
            slide[b].classList.remove('currentDayShow');
            slide[b].classList.remove('currentDayShowRight');
            nameDay[b].classList.remove('current');
            nameDay[a].classList.add('current');
        }
    };
    /* Предыдущий слайд  */
    const prev = (a,b) => {
        if (slide[a] === undefined) return false;
        else {
            slide[a].classList.add('currentDayShow');
            slide[a].classList.remove('dayHide');
            slide[a].classList.remove('dayHideRight');
            slide[b].classList.add('dayHide');
            slide[b].classList.remove('currentDayShow');
            slide[b].classList.remove('currentDayShowRight');
            nameDay[b].classList.remove('current');
            nameDay[a].classList.add('current');
        }
    };
};
