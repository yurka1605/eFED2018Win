'use strict';
/* import {historicalReviewMock}  from '../mocks/HistoricalReviewMock'; */
const page = {
    init() {
        twistSpinner();
        const This = this;
        let currentSessionCityPage;
        const sessionCity = sessionStorage.getItem('city');
        sessionCity === null ? currentSessionCityPage = defaultCity : currentSessionCityPage = sessionCity;
        This.getWeatherDetails(currentSessionCityPage, This.render, WEATHER_DETAILS_ENDPOINT);
        if (currentLocation != 'historical-review.html') {
            This.getWeatherDetails(currentSessionCityPage, This.hours, WEATHER_DETAILS_HOURS);
        } else  {
            This.getWeatherDetails(currentSessionCityPage, This.history, HISTORY_DETAILS);
        }
        /* Find City */
        const searchField = document.getElementById('searchField');
        searchField.addEventListener('change', getActionField);
        function getActionField() {
            const city = searchField.value.trim();
            if (regExpFindField.test(city) === true ) {
                twistSpinner();
                This.getWeatherDetails( city, This.render, WEATHER_DETAILS_ENDPOINT);
                if (currentLocation != 'historical-review.html') {
                    This.getWeatherDetails(city, This.hours, WEATHER_DETAILS_HOURS);
                } else  {
                    This.getWeatherDetails(city, This.history, HISTORY_DETAILS);
                }
            } else alert('error');
            searchField.value = '';
            sessionStorage.setItem('city', city);
        }
    },
    getWeatherDetails(city, callback ,requestText) {
        function Fetcher() {
            this.url = 'http//';
            this.requestInit = {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
            };
        }
        Fetcher.prototype.fetchServer = function() {
            fetch(this.request)
                .then( response => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (currentLocation === 'historical-review.html' && response.status === 401) {
                        callback(historicalReviewMock, city);
                        hideSpinner();
                    } else {
                        throw new Error('Response status not 200.');
                    }
                })
                .then( success => {
                    callback(success);
                    hideSpinner();
                })
                .catch( error => {
                    console.log('Problem with request: ' + error.message);
                    hideSpinner();
                });
        };

        function currentFetcher(url) {
            Fetcher.apply(this, arguments);
            this.url = url;
            this.request = new Request(this.url, this.requestInit);
        }
        currentFetcher.prototype = Object.create(Fetcher.prototype);

        const currentResponse = new currentFetcher(`${ requestText }${ city }${ lang }${ units }`);
        currentResponse.fetchServer();
    },
    render(data) {
        // function Transformer(data) {
        //     this.data = data;
        //     this.currentDate = new Date(data.dt*1000);
        // }
        // function transformToday() {
        //     Transformer.apply(this, arguments);
        //     this.himidity = this.data.main.humidity;
        //     this.windSpeed = this.data.wind.speed.toFixed(1);
        //     this.clouds = this.data.clouds.all;
        //     this.cuurentDayWeek = this.currentDate.toLocaleString('ru', {
        //         weekday: 'long'
        //     });
        //     this.weatherDecscriptions = this.data.weather[0].description;
        //     this.currentCoordinate = this.data.coord.lat.toFixed(0) + ',' + this.data.coord.lon.toFixed(0);
        //     this.WEATHER_DETAILS_POLUTION = `https://api.openweathermap.org/pollution/v1/co/${ this.currentCoordinate }/current.json?appid=${ APP_ID }`;
        //     this.polution = page.getWeatherDetails('', getPolution, this.WEATHER_DETAILS_POLUTION);
        // }
        let currentCity = document.getElementById('cityInfo'),
            currentCountry = document.getElementById('countryInfo'),
            currentYear = document.getElementById('year'),
            currentDate = new Date(data.dt*1000);
        if (currentLocation == 'weather-details.html') {
            arr = ['temperatureInfo', 'imgWeatherToday', 'wetnessInfo', 'windSpeedInfo', 'probabilityPracipationInfo', 'dayWeekInfo','weatherInfo'];
            arr =  getDataPage('Id', arr);
            /* Получение загрязнения воздуха */
            const currentCoordinate = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
            const WEATHER_DETAILS_POLUTION = `https://api.openweathermap.org/pollution/v1/co/${ currentCoordinate }/current.json?appid=${ APP_ID }`;
            page.getWeatherDetails('', getPolution, WEATHER_DETAILS_POLUTION);
            /* Влажность */
            arr[2].innerHTML = data.main.humidity;
            /* Скорость ветра */
            arr[3].innerHTML = data.wind.speed.toFixed(1);
            /* Осадки */
            arr[4].innerHTML = data.clouds.all;
            /* Дата */
            let currenDayWeek = currentDate.toLocaleString('ru', {
                weekday: 'long'
            });
            arr[5].innerHTML = currenDayWeek;
            arr[6].innerHTML = data.weather[0].description;
        } else if(currentLocation == 'index.html') {
            arr = ['temperatureHeaderInfo', 'topCloudy', 'DateAndWeekDay','sunrise','sunset','longDay','moontime', 'moonrise', 'moonset'];
            arr =  getDataPage('Id', arr);
            /* Дата */
            let currentMonth = currentDate.toLocaleDateString('ru', {
                day: 'numeric',
                month: 'long'
            });
            let currentDayWeek = `${ currentMonth }, сегодня`;
            arr[2].innerHTML = currentDayWeek;
            let sunrise = new Date(data.sys.sunrise*1000).toLocaleDateString('ru', {
                hour: 'numeric',
                minute: 'numeric'
            });
            let sunset = new Date(data.sys.sunset*1000).toLocaleDateString('ru', {
                hour: 'numeric',
                minute: 'numeric'
            });
            arr[3].innerHTML = sunrise.split(',')[1];
            arr[4].innerHTML = sunset.split(',')[1];
            let hourSunset = sunset.split(',')[1].split(':')[0];
            let minutesSunset = sunset.split(',')[1].split(':')[1];
            let hourSunrise = sunrise.split(',')[1].split(':')[0];
            let minutesSunrise = sunrise.split(',')[1].split(':')[1];
            let longDaySeconds = hourSunset*60 + minutesSunset*1 - hourSunrise*60 - minutesSunrise*1;
            let longDay = Math.round(longDaySeconds/60) + ' ч ' + longDaySeconds%60 + ' мин';
            let longNight = Math.round((24*60 - longDaySeconds)/60) + ' ч ' + (24*60 - longDaySeconds)%60 + ' мин';
            arr[5].innerHTML = longDay;
            arr[6].innerHTML = longNight;
            arr[7].innerHTML = sunset.split(',')[1];
            arr[8].innerHTML = sunrise.split(',')[1];
        }
        if(currentLocation != 'historical-review.html') {
            let currentTemp = arr[0];
            let currentImage = arr[1];
            /* Температура целыми числами */
            currentTemp.innerHTML = data.main.temp.toFixed(0) + '&degC';
            /* Текущая погода картинкой */
            currentImage.src = `img/Today/${data.weather[0].icon}.png`;
            currentImage.alt = data.weather[0].description;
            currentImage.title = data.weather[0].description;
        }
        /* Страна Россия */
        if (data.sys.country == 'RU') currentCountry.innerHTML = 'Россия';
        else currentCountry.innerHTML = data.sys.country;
        /* Город */
        currentCity.innerHTML = data.name;
        /* Год */
        currentYear.innerHTML = currentDate.getFullYear();
    },
    hours(data) {
        if (currentLocation == 'weather-details.html') {
            arr =  ['tempvaluePlus', 'tempColPlus', 'tempvalueMinus','tempColMinus','timeWeather','speedWind','windArrow','dayWeek','tempDay','tempNight', 'probabilityValue', 'probability'];
            arr = getDataPage('ClassName', arr);
            let tempValuePlus = arr[0],
                tempColPlus = arr[1],
                tempValueMinus = arr[2],
                tempColMinus = arr[3],
                hours = arr[4],
                speedWind = arr[5],
                windArrow = arr[6],
                daysWeek = arr[7],
                tempDay = arr[8],
                tempNight = arr[9],
                probabilityValue = arr[10],
                probability = arr[11];

            for (let j = 0; j < hours.length; j++) {
                /* hours */
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
            /* Five days */
            const objectDay =  getWeatherFiveDay(data);
            let j = 0;
            for (const key in objectDay) {
                let max = '', min = '', maxInd;
                for (let i = 0; i < objectDay[key].temp.length; ++i) {
                    if (objectDay[key].temp[i] != '') {
                        if (max < objectDay[key].temp[i] || max == '' ) {
                            max = objectDay[key].temp[i];
                            maxInd = i;
                        }
                        if (min > objectDay[key].temp[i] || min == '') {
                            min = objectDay[key].temp[i];
                        }
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
        } else if (currentLocation == 'index.html') {
            arr = ['navDays', 'numberDay', 'nightImg', 'moningImg', 'dayImg', 'eveningImg', 'nightTemp', 'moningTemp', 'dayTemp', 'eveningTemp', 'windNigth', 'windMoning', 'windDay', 'windEvening', 'probNigth', 'probMoning', 'probDay', 'probEvening'];
            arr = getDataPage('ClassName', arr);
            let navDays = arr[0],
                numberDay = arr[1],
                nightImg = arr[2],
                moningImg = arr[3],
                dayImg = arr[4],
                eveningImg = arr[5],
                nightTemp = arr[6],
                moningTemp = arr[7],
                dayTemp = arr[8],
                eveningTemp = arr[9],
                nightWind = arr[10],
                moningWind = arr[11],
                dayWind = arr[12],
                eveningWind = arr[13],
                nightProb = arr[14],
                moningProb = arr[15],
                dayProb = arr[16],
                eveningProb = arr[17];
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
                    let moningCol = probabilityCol(objectDay[key].prob[0]);
                    moningProb[i].style.backgroundPositionY = moningCol;
                    /* Ночь */
                    nightImg[i].src = `img/Today/${ objectDay[key].imgSrc[1] }.png`;
                    nightImg[i].alt = objectDay[key].imgDescr[1];
                    nightImg[i].title = objectDay[key].imgDescr[1];
                    nightWind[i].innerHTML = objectDay[key].wind[1].toFixed(0);
                    nightTemp[i].innerHTML = objectDay[key].temp[1].toFixed(0) + '&deg';
                    nightProb[i].children[0].innerHTML = objectDay[key].prob[1];
                    let nightCol = probabilityCol(objectDay[key].prob[1]);
                    nightProb[i].style.backgroundPositionY = nightCol;
                    /* День */
                    dayImg[i].src = `img/Today/${ objectDay[key].imgSrc[2] }.png`;
                    dayImg[i].alt = objectDay[key].imgDescr[2];
                    dayImg[i].title = objectDay[key].imgDescr[2];
                    dayWind[i].innerHTML = objectDay[key].wind[2].toFixed(0);
                    dayTemp[i].innerHTML = objectDay[key].temp[2].toFixed(0) + '&deg';
                    dayProb[i].children[0].innerHTML = objectDay[key].prob[2];
                    let dayCol = probabilityCol(objectDay[key].prob[2]);
                    dayProb[i].style.backgroundPositionY = dayCol;
                    /* Вечер */
                    eveningImg[i].src = `img/Today/${ objectDay[key].imgSrc[3] }.png`;
                    eveningImg[i].alt = objectDay[key].imgDescr[3];
                    eveningImg[i].title = objectDay[key].imgDescr[3];
                    eveningWind[i].innerHTML = objectDay[key].wind[3].toFixed(0);
                    eveningTemp[i].innerHTML = objectDay[key].temp[3].toFixed(0) + '&deg';
                    eveningProb[i].children[0].innerHTML = objectDay[key].prob[3];
                    let eveningCol = probabilityCol(objectDay[key].prob[3]);
                    eveningProb[i].style.backgroundPositionY = eveningCol;
                    i++;
                }
            }
        }
    },
    history(data,city) {
        let history = [];
        for (const key in data) {
            if (key == city) {
                let minMiddle, maxMiddle, recordMax, recordMin;
                const objectYears = data[key];
                for (let i = 0; i < 12; i++) {
                    for (const prop in objectYears) {
                        if (prop == '1960') {
                            minMiddle = objectYears[prop][i].avearage;
                            maxMiddle = objectYears[prop][i].avearage;
                            recordMax = objectYears[prop][i].max;
                            recordMin = objectYears[prop][i].min;
                        } else {
                            if(minMiddle > objectYears[prop][i].avearage) {
                                minMiddle = objectYears[prop][i].avearage;
                            } else if(maxMiddle < objectYears[prop][i].avearage) {
                                maxMiddle = objectYears[prop][i].avearage;
                            } else if(recordMax < objectYears[prop][i].max) {
                                recordMax = objectYears[prop][i].max;
                            } else if(recordMin > objectYears[prop][i].min) {
                                recordMin = objectYears[prop][i].min;
                            }
                        }
                    }
                    let objectData = {
                        minMiddle: minMiddle,
                        maxMiddle: maxMiddle,
                        recordMax: recordMax,
                        recordMin: recordMin
                    };
                    history.push(objectData);
                }
            }
        }
        const month = document.getElementsByClassName('month');
        for (let k = 0; k < history.length; k++) {
            month[k+1].children[1].innerHTML = history[k].maxMiddle;
            month[k+1].children[2].innerHTML = history[k].minMiddle;
            month[k+1].children[3].innerHTML = history[k].recordMax;
            month[k+1].children[4].innerHTML = history[k].recordMin;
        }
    }
};
page.init();
hideSpinner();
