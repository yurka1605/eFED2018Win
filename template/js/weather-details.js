'use strict';
window.onload = function () {
    /* Tab click */
    var detailsTab = document.getElementsByClassName('detailsTab');
    var blockInfo = document.getElementsByClassName('blockInformation');
    function tabCheck(event) {
        var nameId = event.target.id;
        for (let j = 0; j < detailsTab.length; j++) {
            detailsTab[j].classList.remove('currentTab');
        }
        event.target.classList.add('currentTab');
        for (let k = 0; k < detailsTab.length; k++) {
           if (detailsTab[k].classList.contains('currentTab') === true) blockInfo[k].classList.add('currentBlock');
           else blockInfo[k].classList.remove('currentBlock');
        }
    }
    for (let i = 0; i < detailsTab.length; i++) {
    detailsTab[i].addEventListener('click', tabCheck);
    }
};
const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const defaultCity = 'Ижевск';
const defaultCityId = '554840';
const defaultCityCoord = '57,53';
const lang = '&lang=ru';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?&appid=${ APP_ID }&q=`;
const WEATHER_DETAILS_POLUTION = `http://api.openweathermap.org/pollution/v1/co/${ defaultCityCoord }/current.json?appid=${ APP_ID }`;
const WEATHER_DETAILS_HOURS = `http://api.openweathermap.org/data/2.5/forecast?appid=${ APP_ID }&q=`;

const page = {
    init() {
        const This = this;
        This.getWeatherDetails(defaultCity, This.render, WEATHER_DETAILS_ENDPOINT);
        This.getWeatherDetails(defaultCity, This.hours, WEATHER_DETAILS_HOURS);

        const searchField = document.getElementById('searchField');
        const searchButton = document.getElementById('find');
        searchButton.addEventListener('click', function() {
            const regexp = /(^[A-Z]{1}[a-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}$)|(^[А-Я]{1}[а-я]{1,100} [А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100} [A-Za-z]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}\-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}\-{1}[А-Яа-я]{1,100}$)||(^[A-Z]{1}[a-z]{1,100}\-{1}[A-Za-z]{1,100}\-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}\-{1}[А-Яа-я]{1,100}\-{1}[А-Яа-я]{1,100}$)/;
            const city = searchField.value;
            if (regexp.test(city) === true ) {
                This.getWeatherDetails( city, This.render, WEATHER_DETAILS_ENDPOINT);
                This.getWeatherDetails( city, This.hours, WEATHER_DETAILS_HOURS);
                searchField.value = '';
            } else {
                
            }
        });
    },
    getWeatherDetails(city, callback ,requestText) {
        const url = `${ requestText }${ city }${ lang }&units=metric`; 
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            } else {
                return;
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },
    render(data) {
        let currentCity = document.getElementById('cityInfo');
        let currentCountry = document.getElementById('countryInfo');
        let currentTemp = document.getElementById('temperatureInfo');
        let currentImage = document.getElementById('imgWeatherToday');
        let currentHimidity = document.getElementById('wetnessInfo');
        let currentWindSpeed = document.getElementById('windSpeedInfo');
        let currentProbabilityPriciption = document.getElementById('probabilityPracipationInfo');
        let currentDayWeek = document.getElementById('dayWeekInfo');
        let year = document.getElementById('year');
        
        /* Получение загрязнения воздуха */
        let coordinate = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
        const WEATHER_DETAILS_POLUTION = `http://api.openweathermap.org/pollution/v1/co/${ coordinate }/current.json?appid=${ APP_ID }`;
        page.getWeatherDetails('', page.polution, WEATHER_DETAILS_POLUTION);
        /* Страна */
        if (data.sys.country == 'RU') currentCountry.innerHTML = 'Россия';
        else currentCountry.innerHTML = data.sys.country;
        /* Город */
        currentCity.innerHTML = data.name;
        /* Температура целыми числами */
        currentTemp.innerHTML = data.main.temp.toFixed(0) + '&degC';
        /* Текущая погода картинкой */
        currentImage.src = `img/Today/${data.weather[0].icon}.png`;
        currentImage.alt = upperCaseFirstChar(data.weather[0].description);
        currentImage.title = upperCaseFirstChar(data.weather[0].description);
        /* Влажность */
        currentHimidity.innerHTML = data.main.humidity;
        /* Скорость ветра */
        currentWindSpeed.innerHTML = data.wind.speed.toFixed(1);
        /* Осадки */
        currentProbabilityPriciption.innerHTML = data.clouds.all;
        /* Дата */
        let currentDate = new Date(data.dt*1000);
        getDayWeek(currentDate.getDay(), currentDayWeek, 'Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' );
        /* Год */
        year.innerHTML = currentDate.getFullYear();
    },
    polution(data) {
        let polution = document.getElementById('polutionInfo');
        polution.innerHTML = data.data[0].value;
    },
    hours(data) {
        let tempValuePlus = document.getElementsByClassName('tempvaluePlus');
        let tempColPlus = document.getElementsByClassName('tempColPlus');
        let tempValueMinus = document.getElementsByClassName('tempvalueMinus');
        let tempColMinus = document.getElementsByClassName('tempColMinus');
        let hours = document.getElementsByClassName('timeWeather');
        let speedWind = document.getElementsByClassName('speedWind');
        let windArrow = document.getElementsByClassName('windArrow');
        let daysWeek = document.getElementsByClassName('dayWeek');
        let tempDay = document.getElementsByClassName('tempDay');
        let tempNight = document.getElementsByClassName('tempNight');
        let number = '';
        let arrDay = [];

        for (let j = 0; j < data.list.length; j++) {
            /* hours */
            if ( j < hours.length ) {
                let currentHour = data.list[j].dt_txt;
                currentHour = currentHour.split(' ')[1].split(':')[0];
                hours[j].innerHTML = currentHour + ':00';
                /* Temps */
                let temp = data.list[j].main.temp.toFixed(0);
                tempColPlus[j].style.height = '0';
                tempValuePlus[j].innerHTML = '';
                tempColPlus[j].style.border = '0';
                tempColMinus[j].style.height = '0';
                tempValueMinus[j].innerHTML = '';
                tempColMinus[j].style.border = '0';
                if (temp < 0) {
                    tempValueMinus[j].innerHTML = temp;
                    temp = temp*(-1);
                    tempColMinus[j].style.height = temp*3 + 'px';
                    tempColMinus[j].style.border = '1px solid black';
                    tempColMinus[j].style.borderTop = '0';
                } else if (temp > 0) {
                    tempColPlus[j].style.height = temp*3 + 'px';
                    tempValuePlus[j].innerHTML = temp;
                    tempColPlus[j].style.border = '1px solid black';
                    tempColPlus[j].style.borderBottom = '0';
                } else {
                    temp = temp*(-1);
                    tempValuePlus[j].innerHTML = temp;
                }
                /* Wind */
                speedWind[j].innerHTML = data.list[j].wind.speed.toFixed(0) + 'м/с';
                windArrow[j].style.transform = `rotate(${ data.list[j].wind.deg }deg)`;
                /* Вероятность осадков */
                let probabilityValue = document.getElementsByClassName('probabilityValue');
                let probability = document.getElementsByClassName('probability');
                probabilityValue[j].innerHTML = data.list[j].clouds.all + '%';
                let probabilityCol1 = probability[j].children[0].children[0];
                let probabilityCol2 = probability[j].children[1].children[1];
                let probabilityCol3 = probability[j].children[2].children[0];
                let heightValue = data.list[j].clouds.all;
                let randomValue = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

                probabilityCol1.style.height = heightValue - randomValue +'px';
                probabilityCol2.style.height = heightValue +'px';
                probabilityCol3.style.height = heightValue + randomValue +'px';
            }
            /* Five day */
            const dateUnix = data.list[j].dt*1000;
            const currentDateFullValue = new Date(dateUnix);
            const dayNumber = currentDateFullValue.getDay();
            if ( number != dayNumber ) {
                number = dayNumber;
                arrDay.push(number);
            } else if ( number == dayNumber || number == '' ) {
                number = dayNumber;
            }
        }
        for (let k = 0; k < daysWeek.length; k++) {
            getDayWeek(arrDay[k], daysWeek[k].children[0], 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' );
            for (let i = 0; i < data.list.length; i++) {
                const dateUnix = data.list[i].dt*1000;
                const currentDateFullValue = new Date(dateUnix);
                const dayNumber = currentDateFullValue.getDay();
                let time = data.list[i].dt_txt.split(' ')[1].split(':')[0];
                if (arrDay[k] == dayNumber && time == '12') {
                    daysWeek[k].children[1].src = `img/weather/${ data.list[i].weather[0].icon }.png`;
                    daysWeek[k].children[1].alt = upperCaseFirstChar(data.list[i].weather[0].description);
                    daysWeek[k].children[1].title = upperCaseFirstChar(data.list[i].weather[0].description);
                    tempDay[k].innerHTML = data.list[i].main.temp_max.toFixed(0) + '&deg';
                } else if ( arrDay[k] == dayNumber && time == '00') {
                    tempNight[k].innerHTML = data.list[i].main.temp_min.toFixed(0) + '&deg';
                }
            }
        }

    }
};
page.init();
function getDayWeek(current, htmlEl, Sun, Mon, Tue, Wen, Thu, Fri, Sut ) {
    switch (current) {
        case 0:
            htmlEl.innerHTML = Sun;
            break;  
        case 1:
            htmlEl.innerHTML = Mon;
            break;
        case 2:
            htmlEl.innerHTML = Tue;
            break;
        case 3:
            htmlEl.innerHTML = Wen;
            break;
        case 4:
            htmlEl.innerHTML = Thu;
            break;
        case 5:
            htmlEl.innerHTML = Fri;
            break;
        case 6:
            htmlEl.innerHTML = Sut;
            break;      
        default:
            htmlEl.innerHTML = 'не определен';
            break;
    }
}
function upperCaseFirstChar(str) {
    if (str.length != 0) {
        str = str[0].toUpperCase() + str.slice(1);
        return str;
    }
}