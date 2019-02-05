const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const defaultCity = 'Izhevsk';
const defaultCityId = '554840';
const defaultCityCoord = '57,53';
const lang = '&lang=ru';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?&appid=${ APP_ID }&q=`;
const WEATHER_DETAILS_POLUTION = `http://api.openweathermap.org/pollution/v1/co/${ defaultCityCoord }/current.json?appid=${ APP_ID }`;
const WEATHER_DETAILS_HOURS = `http://api.openweathermap.org/data/2.5/forecast?appid=${ APP_ID }&q=`;
const HISTORY_DETAILS = `http://api.openweathermap.org/data/2.5/group?`;
let locationFull = window.location.pathname.split('/');
const currentLocation = locationFull[locationFull.length-1];
const units = '&units=metric';

const page = {
    init() {
        const This = this;
        This.getWeatherDetails(defaultCity, This.render, WEATHER_DETAILS_ENDPOINT);
        if (currentLocation != `historical-review.html`) {
            This.getWeatherDetails(defaultCity, This.hours, WEATHER_DETAILS_HOURS);
        } else  {
            This.getWeatherDetails(defaultCity, This.history, HISTORY_DETAILS);
        }

        const searchField = document.getElementById('searchField');
        searchField.addEventListener('change', getAction);
        function getAction() {
            const regexp = /(^[A-Z]{1}[a-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}$)|(^[А-Я]{1}[а-я]{1,100} [А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100} [A-Za-z]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}\-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}\-{1}[А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}\-{1}[A-Za-z]{1,100}\-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}\-{1}[А-Яа-я]{1,100}\-{1}[А-Яа-я]{1,100}$)/;
            const city = searchField.value;
            if (regexp.test(city) === true ) {
                This.getWeatherDetails( city, This.render, WEATHER_DETAILS_ENDPOINT);
                if (currentLocation != `historical-review.html`) {
                    This.getWeatherDetails(city, This.hours, WEATHER_DETAILS_HOURS);
                } else  {
                    This.getWeatherDetails(city, This.history, HISTORY_DETAILS);
                }
                searchField.value = '';
            } else {
                alert('Не удается найти данные по указанному городу.Проверьте правильность ввода города.Попробуйте ввести город на английском языке.');
            }
        }
    },
    getWeatherDetails(city, callback ,requestText) {
        const url = `${ requestText }${ city }${ lang }${ units }`; 
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                /* console.log(JSON.parse(xhr.responseText)); */
                callback(JSON.parse(xhr.responseText));
            } else {
                if (currentLocation == `historical-review.html`) {
                    callback(historicalReviewMock,city);
                } else return;
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },
    render(data) {
        let currentCity = document.getElementById('cityInfo');
        let currentCountry = document.getElementById('countryInfo');
        let year = document.getElementById('year');
        let currentDate = new Date(data.dt*1000);
        let arr;
        if (currentLocation == `weather-details.html`) {
            arr =  getDataPage('Id','temperatureInfo', 'imgWeatherToday', 'wetnessInfo', 'windSpeedInfo', 'probabilityPracipationInfo', 'dayWeekInfo','weatherInfo');
            /* Получение загрязнения воздуха */
            let coordinate = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
            const WEATHER_DETAILS_POLUTION = `http://api.openweathermap.org/pollution/v1/co/${ coordinate }/current.json?appid=${ APP_ID }`;
            page.getWeatherDetails('', page.polution, WEATHER_DETAILS_POLUTION);
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
        } else if(currentLocation == `index.html`) {
            arr =  getDataPage('Id','temperatureHeaderInfo', 'topCloudy', 'DateAndWeekDay','sunrise','sunset','longDay','moontime', 'moonrise', 'moonset');
            /* Дата */
            let month = currentDate.toLocaleDateString('ru', {
                day: 'numeric',
                month: 'long'
            });
            let currentDayWeek = `${ month }, сегодня`;
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
            let hour = sunset.split(',')[1].split(':')[0];
            let minutes = sunset.split(',')[1].split(':')[1];
            let hour0 = sunrise.split(',')[1].split(':')[0];
            let minutes0 = sunrise.split(',')[1].split(':')[1];
            let long = hour*60 + minutes*1 - hour0*60 - minutes0*1;
            let longDay = Math.round(long/60) + " ч " + long%60 + ' мин';
            let longNight = Math.round((24*60 - long)/60) + ' ч ' + (24*60 - long)%60 + ' мин';
            arr[5].innerHTML = longDay;
            arr[6].innerHTML = longNight;
            arr[7].innerHTML = sunset.split(',')[1];
            arr[8].innerHTML = sunrise.split(',')[1];
        }
        if(currentLocation != `historical-review.html`) {
            let currentTemp = arr[0];
            let currentImage = arr[1];  
          /* Температура целыми числами */
            currentTemp.innerHTML = data.main.temp.toFixed(0) + '&degC';
            /* Текущая погода картинкой */
            currentImage.src = `img/Today/${data.weather[0].icon}.png`;
            currentImage.alt = data.weather[0].description;
            currentImage.title = data.weather[0].description;
        }
        
        /* Страна */
        if (data.sys.country == 'RU') currentCountry.innerHTML = 'Россия';
        else currentCountry.innerHTML = data.sys.country;
        /* Город */
        currentCity.innerHTML = data.name;
        /* Год */
        year.innerHTML = currentDate.getFullYear();
    },
    polution(data) {
        let polution = document.getElementById('polutionInfo');
        polution.innerHTML = data.data[0].value;
    },
    hours(data) {
        let arr;
        if (currentLocation == `weather-details.html`) {
            arr = getDataPage('ClassName', 'tempvaluePlus', 'tempColPlus', 'tempvalueMinus','tempColMinus','timeWeather','speedWind','windArrow','dayWeek','tempDay','tempNight', 'probabilityValue', 'probability');
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
                for (i = 0; i < objectDay[key].temp.length; ++i) {
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
        } else if (currentLocation == `index.html`) {
            arr = getDataPage('ClassName', 'navDays', 'numberDay', 'nightImg', 'moningImg', 'dayImg', 'eveningImg', 'nightTemp', 'moningTemp', 'dayTemp', 'eveningTemp', 'windNigth', 'windMoning', 'windDay', 'windEvening', 'probNigth', 'probMoning', 'probDay', 'probEvening');
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
                eveningWind = arr[13];
                nightProb = arr[14],
                moningProb = arr[15],
                dayProb = arr[16],
                eveningProb = arr[17];
            const objectDay =  getWeatherFiveDay(data);
            console.log(objectDay);
            let i = 0;
            for (const key in objectDay) {
                if (i < 5) {
                    navDays[i].innerHTML = objectDay[key].weekDay;
                    numberDay[i].innerHTML = objectDay[key].fullDate;
                    moningImg[i].src = `img/Today/${ objectDay[key].imgSrc[0] }.png`;
                    moningImg[i].alt = objectDay[key].imgDescr[0];
                    moningImg[i].title = objectDay[key].imgDescr[0];
                    moningTemp[i].innerHTML = objectDay[key].temp[0].toFixed(0) + '&deg';
                    moningWind[i].innerHTML = objectDay[key].wind[0].toFixed(0);
                    moningProb[i].children[0].innerHTML = objectDay[key].prob[0];
                    let moningCol = probabilityCol(objectDay[key].prob[0]);
                    moningProb[i].style.backgroundPositionY = moningCol;

                    nightImg[i].src = `img/Today/${ objectDay[key].imgSrc[1] }.png`;
                    nightImg[i].alt = objectDay[key].imgDescr[1];
                    nightImg[i].title = objectDay[key].imgDescr[1];
                    nightWind[i].innerHTML = objectDay[key].wind[1].toFixed(0);
                    nightTemp[i].innerHTML = objectDay[key].temp[1].toFixed(0) + '&deg';
                    nightProb[i].children[0].innerHTML = objectDay[key].prob[1];
                    let nightCol = probabilityCol(objectDay[key].prob[1]);
                    nightProb[i].style.backgroundPositionY = nightCol;
                    
                    dayImg[i].src = `img/Today/${ objectDay[key].imgSrc[2] }.png`;
                    dayImg[i].alt = objectDay[key].imgDescr[2];
                    dayImg[i].title = objectDay[key].imgDescr[2];
                    dayWind[i].innerHTML = objectDay[key].wind[2].toFixed(0);
                    dayTemp[i].innerHTML = objectDay[key].temp[2].toFixed(0) + '&deg';
                    dayProb[i].children[0].innerHTML = objectDay[key].prob[2];
                    let dayCol = probabilityCol(objectDay[key].prob[2]);
                    dayProb[i].style.backgroundPositionY = dayCol;
                    
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
                    history.push(objectData)
                }
            }
        }
        const arr = getDataPage('ClassName', 'month');
        month = arr[0];
        for (let k = 0; k < history.length; k++) {
            month[k+1].children[1].innerHTML = history[k].maxMiddle;
            month[k+1].children[2].innerHTML = history[k].minMiddle;
            month[k+1].children[3].innerHTML = history[k].recordMax;
            month[k+1].children[4].innerHTML = history[k].recordMin;
        }
    }
};
page.init();
function getDataPage (methodGet) {
    let array = [];
    for (let i = 1; i < arguments.length; i++) {
        let arg;
        if (methodGet == 'Id') arg = document.getElementById(arguments[i]);
        else if (methodGet == 'ClassName') arg = document.getElementsByClassName(arguments[i]); 
        array.push(arg);     
    }
    return array;
}
function getWeatherFiveDay(data) {
    let number = ''; 
    let objectDay = {};

    for (let i = 0; i < data.list.length; i++) {
       /* Добавление Свойств в объект */
       const dateFull = data.list[i].dt_txt.split(' ')[0];
       if ( number != dateFull ) {
           number = dateFull;
           objectDay[dateFull] = [];
       } else if ( number == dateFull || number == '' ) {
           number = dateFull;
       }
    }
    /* Добавляем в свойства объекта массивы из объектов */
    for (const key in objectDay) {
        for (let i = 0; i < data.list.length; i++) {
             const dateFull = data.list[i].dt_txt.split(' ')[0];
             if ( key == dateFull ) {
                objectDay[key].push(data.list[i]);
             }
         }
     }
     /* Заменяем массивы на объекты из данных */
     for (const key in objectDay) {
        let weekDay, fullDate, imgSrcMoning = '', imgDescrMoning = '', imgSrcEvening = '', imgDescrEvening = '', imgSrcNigth = '', imgDescrNigth = '', imgSrcDay = '', imgDescrDay = '', tempDay = '', tempNight = '', tempEvening = '', tempMoning = '' , windDay = '', windNigth = '', windEvening = '', windMoning = '', probDay = '', probNigth = '', probEvening = '', probMoning = '';
         for (let i = 0; i < objectDay[key].length; i++) {
            let currentDay = objectDay[key][0].dt*1000; 
            currentDay = new Date(currentDay).toLocaleString('ru', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
            });
            weekDay = currentDay.split(',')[0];
            fullDate = currentDay;
            let hours = objectDay[key][i].dt_txt.split(' ')[1].split(':')[0];
            if (hours == '06' || hours == '09') {
                tempMoning = objectDay[key][i].main.temp;
                imgSrcMoning = objectDay[key][i].weather[0].icon;
                imgDescrMoning = objectDay[key][i].weather[0].description;
                windMoning = objectDay[key][i].wind.speed;
                if (objectDay[key][i].snow == undefined) {
                    if (objectDay[key][i].rain == undefined) {
                        probMoning = '0.0';
                    } else {
                        if (objectDay[key][i].rain['3h'] == undefined) {
                            probMoning = '0.0';
                        } else probMoning = objectDay[key][i].rain['3h'].toFixed(1);
                    }
                } else {
                    if (objectDay[key][i].snow['3h'] == undefined) {
                        probMoning = '0.0';
                    } else probMoning = objectDay[key][i].snow['3h'].toFixed(1);
                }
            }
            if (hours == '21' || hours == '18') {
                tempEvening = objectDay[key][i].main.temp;
                imgSrcEvening = objectDay[key][i].weather[0].icon;
                imgDescrEvening = objectDay[key][i].weather[0].description;
                windEvening = objectDay[key][i].wind.speed;
                if (objectDay[key][i].snow == undefined) {
                    if (objectDay[key][i].rain == undefined) {
                        probEvening = '0.0';
                    } else {
                        if (objectDay[key][i].rain['3h'] == undefined) {
                            probEvening = '0.0';
                        } else probEvening = objectDay[key][i].rain['3h'].toFixed(1);
                    }
                } else {
                    if (objectDay[key][i].snow['3h'] == undefined) {
                        probEvening = '0.0';
                    } else probEvening = objectDay[key][i].snow['3h'].toFixed(1);
                }
            }
            if (hours == '00' || hours == '03') {
                tempNight = objectDay[key][i].main.temp;
                imgSrcNigth = objectDay[key][i].weather[0].icon;
                imgDescrNigth = objectDay[key][i].weather[0].description;
                windNight = objectDay[key][i].wind.speed;
                if (objectDay[key][i].snow == undefined) {
                    if (objectDay[key][i].rain == undefined) {
                        probNigth = '0.0';
                    } else {
                        if (objectDay[key][i].rain['3h'] == undefined) {
                            probNigth = '0.0';
                        } else probNigth = objectDay[key][i].rain['3h'].toFixed(1);
                    }
                } else {
                    if (objectDay[key][i].snow['3h'] == undefined) {
                        probNigth = '0.0';
                    } else probNigth = objectDay[key][i].snow['3h'].toFixed(1);
                }
            }
            if (hours == '12' || hours == '15') {
                tempDay = objectDay[key][i].main.temp;
                imgSrcDay = objectDay[key][i].weather[0].icon;
                imgDescrDay = objectDay[key][i].weather[0].description;
                windDay = objectDay[key][i].wind.speed;
                if (objectDay[key][i].snow == undefined) {
                    if (objectDay[key][i].rain == undefined) {
                        probDay = '0.0';
                    } else {
                        if (objectDay[key][i].rain['3h'] == undefined) {
                            probDay = '0.0';
                        } else probDay = objectDay[key][i].rain['3h'].toFixed(1);
                    }
                } else {
                    if (objectDay[key][i].snow['3h'] == undefined) {
                        probDay = '0.0';
                    } else probDay = objectDay[key][i].snow['3h'].toFixed(1);
                }
            }
         }
        let temp = [tempMoning, tempEvening, tempNight, tempDay];
        let imgDescr = [imgDescrMoning, imgDescrEvening, imgDescrNigth, imgDescrDay];
        let imgSrc = [imgSrcMoning, imgSrcEvening, imgSrcNigth, imgSrcDay];
        let wind = [windMoning, windEvening, windNigth, windDay];
        let prob = [probMoning, probEvening, probNigth, probDay];
        let elem = 0;
        let empty = [];
        temp = findElements(empty, elem, temp);
        imgDescr = findElements(empty, elem, imgDescr);
        imgSrc = findElements(empty, elem, imgSrc);
        wind = findElements(empty, elem, wind);
        prob = findElements(empty, elem, prob);
         objectDay[key] = {
            weekDay: weekDay,
            fullDate: fullDate,
            imgSrc: imgSrc,
            imgDescr: imgDescr,
            temp: temp,
            wind: wind,
            prob: prob
        };
    }
    return objectDay; 
}
function findElements(empty ,elem, arr) {
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] != '') {
            elem = arr[index];
        } else {
            empty.push(index);
        }
    }
    for (let k = 0; k < empty.length; k++) {
        arr[empty[k]] = elem;       
    }
    return arr;
}
function probabilityCol(numberCol) { 
    let valueCol;
    if (numberCol > 6) {   
        valueCol = `22px`;
    } else if(numberCol > 5 ) {
        valueCol = `28px`;
    } else if (numberCol > 4) {   
        valueCol = `30px`;
    } else if(numberCol > 3) {
        valueCol = `38px`;
    } else if(numberCol > 2) {
        valueCol = `46px`;
    } else if (numberCol > 1) {   
        valueCol = `54px`;
    } else if(numberCol > 0) {
        valueCol = `62px`;
    } else {
        valueCol = `70px`;
    }
    return valueCol; 
}