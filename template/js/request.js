'use strict';
class Pages {
    constructor(city) {
        this.city = city;
    }
    init() {
        twistSpinner();
        this.getWeatherDetails(currentSessionCityPage, this.render, WEATHER_DETAILS_ENDPOINT);
    }
    getWeatherDetails(city, callback ,requestText) {
        const url = `${ requestText }${ city }${ lang }${ units }`;
        const request = new Request( url, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
        });
        fetch(request)
            .then( response => {
                if (response.status === 200) return response.json();
                else if (response.status === 401) throw response.status;
                else throw new Error('Response status not 200.');
            })
            .then( success => {
                callback(success);
                hideSpinner();
            })
            .catch( error => {
                if (error === 401 && currentLocation === 'historical-review.html') callback(historicalReviewMock, city);
                else console.log('Problem with request: ' + error.message);
                hideSpinner();
            });
    }
    render(data) {
        sessionStorage.setItem('city', data.name);
        /* Страна */
        document.getElementById('cityInfo').innerHTML = data.name;
        /* Город */
        document.getElementById('countryInfo').innerHTML = data.sys.country;
        /* Год */
        document.getElementById('year').innerHTML = new Date(data.dt*1000).getFullYear();
    }
}
class today extends Pages {
    init() {
        super.init();
        const This = this;
        This.getWeatherDetails(currentSessionCityPage, today.renderHours, WEATHER_DETAILS_HOURS);
        
        /* Поиск города */
        const searchField = document.getElementById('searchField');
        searchField.addEventListener('change', () => {
            const city = searchField.value.trim();
            if (regExpFindField.test(city) === true ) {
                twistSpinner();
                This.getWeatherDetails( city, This.render, WEATHER_DETAILS_ENDPOINT);
                This.getWeatherDetails( city, today.renderHours, WEATHER_DETAILS_HOURS);
            } else alert('Попробуйте ввести название на английском, либо в формате "Нижний Новгород" или "Ростов-на-Дону"');
            searchField.value = '';
        });
    }
    render(data) {
        super.render(data);
        /* Получение загрязнения воздуха */
        const currentCoordinate = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
        const WEATHER_DETAILS_POLUTION = `https://api.openweathermap.org/pollution/v1/co/${ currentCoordinate }/current.json?appid=${ APP_ID }`;
        const polution = new Pages('');
        polution.getWeatherDetails('', getPolution, WEATHER_DETAILS_POLUTION);
        /* Температура целыми числами */
        const [
            temperatureInfo, imgWeatherToday, wetnessInfo,
            windSpeedInfo, probabilityPracipationInfo,
            dayWeekInfo, weatherInfo,
        ] =  getDataPage('Id', [
            'temperatureInfo', 'imgWeatherToday', 'wetnessInfo',
            'windSpeedInfo', 'probabilityPracipationInfo',
            'dayWeekInfo', 'weatherInfo',
        ]);
        /* Температура целыми числами */
        temperatureInfo.innerHTML = data.main.temp.toFixed(0) + '&degC';
        /* Текущая погода картинкой */
        imgWeatherToday.src = `img/Today/${data.weather[0].icon}.png`;
        imgWeatherToday.alt = data.weather[0].description;
        imgWeatherToday.title = data.weather[0].description;
        /* Влажность */
        wetnessInfo.innerHTML = data.main.humidity;
        /* Скорость ветра */
        windSpeedInfo.innerHTML = data.wind.speed.toFixed(1);
        /* Осадки */
        probabilityPracipationInfo.innerHTML = data.clouds.all;
        /* Дата */
        dayWeekInfo.innerHTML = new Date(data.dt*1000).toLocaleString('ru', { weekday: 'long' });
        weatherInfo.innerHTML = data.weather[0].description;
    }
    static renderHours(data) {
        for (let j = 0; j < hours.length; j++) {
            /* hours */
            hours[j].innerHTML = data.list[j].dt_txt.split(' ')[1].split(':')[0] + ':00';
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
                tempColMinus[j].style.height = temp*(-3) + 'px';
                tempColMinus[j].style.border = '1px solid black';
                tempColMinus[j].style.borderTop = '0';
            } else if (temp > 0) {
                tempColPlus[j].style.height = temp*3 + 'px';
                tempValuePlus[j].innerHTML = temp;
                tempColPlus[j].style.border = '1px solid black';
                tempColPlus[j].style.borderBottom = '0';
            } else tempValuePlus[j].innerHTML = temp*(-1);
            /* Wind */
            speedWind[j].innerHTML = data.list[j].wind.speed.toFixed(0) + 'м/с';
            windArrow[j].style.transform = `rotate(${ data.list[j].wind.deg }deg)`;
            /* Вероятность осадков */
            probabilityValue[j].innerHTML = data.list[j].clouds.all + '%';
            let heightValue = data.list[j].clouds.all;
            let randomValue = Math.floor(Math.random() * 11);
            probability[j].children[0].children[0].style.height = heightValue - randomValue +'px';
            probability[j].children[1].children[1].style.height = heightValue +'px';
            probability[j].children[2].children[0].style.height = heightValue + randomValue +'px';
        }
        /* Five days */
        const objectDay =  getWeatherFiveDay(data);
        let j = 0;
        for (const key in objectDay) {
            let max = '', min = '', maxInd;
            for (let i = 0; i < objectDay[key].temp.length; ++i) {
                if (objectDay[key].temp[i] !== '') {
                    if (max < objectDay[key].temp[i] || max === '' ) {
                        max = objectDay[key].temp[i];
                        maxInd = i;
                    }
                    if (min > objectDay[key].temp[i] || min === '') min = objectDay[key].temp[i];
                }
            }
            if (j < 5) {
                daysWeek[j].children[0].innerHTML = objectDay[key].weekDay;
                daysWeek[j].children[1].src = `img/weather/${ objectDay[key].imgSrc[maxInd] }.png`;
                daysWeek[j].children[1].alt = objectDay[key].imgDescr[maxInd];
                daysWeek[j].children[1].title = objectDay[key].imgDescr[maxInd];
                tempDay[j].innerHTML = max.toFixed(0) + '&deg';
                tempNight[j].innerHTML = min.toFixed(0) + '&deg';
                j++;
            }
        }
    }
}
class fiveDay extends Pages {
    init() {
        super.init();
        this.getWeatherDetails(currentSessionCityPage, fiveDay.renderHours, WEATHER_DETAILS_HOURS);
        const This = this;
        /* Поиск города */
        const searchField = document.getElementById('searchField');
        searchField.addEventListener('change', () => {
            const city = searchField.value.trim();
            if (regExpFindField.test(city) === true ) {
                twistSpinner();
                This.getWeatherDetails(city, This.render, WEATHER_DETAILS_ENDPOINT);
                This.getWeatherDetails(city, fiveDay.renderHours, WEATHER_DETAILS_HOURS);
            } else alert('Попробуйте ввести название на английском, либо в формате "Нижний Новгород" или "Ростов-на-Дону"');
            searchField.value = '';
        });
    }
    render(data) {
        super.render(data);
        const sunrise = new Date(data.sys.sunrise*1000).toLocaleDateString('ru', {
            hour: 'numeric',
            minute: 'numeric'
        });
        const sunset = new Date(data.sys.sunset*1000).toLocaleDateString('ru', {
            hour: 'numeric',
            minute: 'numeric'
        });
        const currentMonth = new Date(data.dt*1000).toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long'
        });
        const [
            temperatureHeaderInfo, topCloudy, DateAndWeekDay,
            sunrises, sunsets, longDay,
            moontime, moonrise, moonset,
        ] =  getDataPage('Id', [
            'temperatureHeaderInfo', 'topCloudy', 'DateAndWeekDay',
            'sunrise', 'sunset', 'longDay',
            'moontime', 'moonrise', 'moonset',
        ]);
        /* Температура целыми числами */
        temperatureHeaderInfo.innerHTML = data.main.temp.toFixed(0) + '&degC';
        /* Текущая погода картинкой */
        topCloudy.src = `img/Today/${data.weather[0].icon}.png`;
        topCloudy.alt = data.weather[0].description;
        topCloudy.title = data.weather[0].description;
        DateAndWeekDay.innerHTML = `${ currentMonth }, сегодня`;
        sunrises.innerHTML = sunrise.split(',')[1];
        sunsets.innerHTML = sunset.split(',')[1];
        longDay.innerHTML = longDayNight(sunrise, sunset)[0];
        moontime.innerHTML = longDayNight(sunrise, sunset)[1];
        moonrise.innerHTML = sunset.split(',')[1];
        moonset.innerHTML = sunrise.split(',')[1];
    }
    static renderHours(data) {
        const objectDay =  getWeatherFiveDay(data);
        let i = 0;
        for (const key in objectDay) {
            if (i < 5) {
                navDays[i].innerHTML = objectDay[key].weekDay;
                numberDay[i].innerHTML = objectDay[key].fullDate;
                /* Утро */
                moningImg[i].src = `img/Today/${ objectDay[key].imgSrc[0] }.png`;
                moningImg[i].alt = objectDay[key].imgDescr[0];
                moningImg[i].title = objectDay[key].imgDescr[0];
                moningTemp[i].innerHTML = objectDay[key].temp[0].toFixed(0) + '&deg';
                moningWind[i].innerHTML = objectDay[key].wind[0].toFixed(0);
                moningProb[i].children[0].innerHTML = objectDay[key].prob[0];
                moningProb[i].style.backgroundPositionY = probabilityCol(objectDay[key].prob[0]);
                /* Ночь */
                nightImg[i].src = `img/Today/${ objectDay[key].imgSrc[1] }.png`;
                nightImg[i].alt = objectDay[key].imgDescr[1];
                nightImg[i].title = objectDay[key].imgDescr[1];
                nightWind[i].innerHTML = objectDay[key].wind[1].toFixed(0);
                nightTemp[i].innerHTML = objectDay[key].temp[1].toFixed(0) + '&deg';
                nightProb[i].children[0].innerHTML = objectDay[key].prob[1];
                nightProb[i].style.backgroundPositionY = probabilityCol(objectDay[key].prob[1]);
                /* День */
                dayImg[i].src = `img/Today/${ objectDay[key].imgSrc[2] }.png`;
                dayImg[i].alt = objectDay[key].imgDescr[2];
                dayImg[i].title = objectDay[key].imgDescr[2];
                dayWind[i].innerHTML = objectDay[key].wind[2].toFixed(0);
                dayTemp[i].innerHTML = objectDay[key].temp[2].toFixed(0) + '&deg';
                dayProb[i].children[0].innerHTML = objectDay[key].prob[2];
                dayProb[i].style.backgroundPositionY = probabilityCol(objectDay[key].prob[2]);
                /* Вечер */
                eveningImg[i].src = `img/Today/${ objectDay[key].imgSrc[3] }.png`;
                eveningImg[i].alt = objectDay[key].imgDescr[3];
                eveningImg[i].title = objectDay[key].imgDescr[3];
                eveningWind[i].innerHTML = objectDay[key].wind[3].toFixed(0);
                eveningTemp[i].innerHTML = objectDay[key].temp[3].toFixed(0) + '&deg';
                eveningProb[i].children[0].innerHTML = objectDay[key].prob[3];
                eveningProb[i].style.backgroundPositionY = probabilityCol(objectDay[key].prob[3]);
                i++;
            }
        }
    }
}
class history extends Pages {
    init() {
        super.init();
        this.getWeatherDetails(currentSessionCityPage, history.renderHistory, HISTORY_DETAILS);
        const This = this;
        /* Поиск города */
        const searchField = document.getElementById('searchField');
        searchField.addEventListener('change', () => {
            const city = searchField.value.trim();
            if (regExpFindField.test(city) === true ) {
                twistSpinner();
                This.getWeatherDetails( city, history.renderHistory, HISTORY_DETAILS);
                This.getWeatherDetails( city, This.render, WEATHER_DETAILS_ENDPOINT);
            } else alert('Попробуйте ввести название на английском, либо в формате "Нижний Новгород" или "Ростов-на-Дону"');
            searchField.value = '';
        });
    }
    static renderHistory(data, city) {
        const history = historyTransform(data, city);
        const month = document.getElementsByClassName('month');
        for (let k = 0; k < history.length; k++) {
            month[k+1].children[1].innerHTML = history[k].maxMiddle;
            month[k+1].children[2].innerHTML = history[k].minMiddle;
            month[k+1].children[3].innerHTML = history[k].recordMax;
            month[k+1].children[4].innerHTML = history[k].recordMin;
        }
    }
}
if (currentLocation === 'weather-details.html') currentPage = new today(currentSessionCityPage);
else if (currentLocation === 'index.html' || currentLocation === '') currentPage = new fiveDay(currentSessionCityPage);
else if (currentLocation === 'historical-review.html') currentPage = new history(currentSessionCityPage);
currentPage.init();
