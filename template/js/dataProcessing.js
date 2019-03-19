//Рендерим полученное загрязнение воздуха
const getPolution = data => {
    document.getElementById('polutionInfo').innerHTML = data.data[0].value;
};
//Структурируем данные погоды на дни
const getWeatherFiveDay = data => {
    let number = ''; 
    let objectDay = {};

    for (let list of  data.list) {
        /* Добавление Свойств в объект */
        const dateFull = list.dt_txt.split(' ')[0];
        if ( number !== dateFull ) {
            number = dateFull;
            objectDay[dateFull] = [];
        } else if ( number === dateFull || number === '' ) number = dateFull;
    }
    /* Добавляем в свойства объекта массивы из объектов */
    for (const key in objectDay) {
        for (let i = 0; i < data.list.length; i++) {
            const dateFull = data.list[i].dt_txt.split(' ')[0];
            if ( key === dateFull ) {
                objectDay[key].push(data.list[i]);
            }
        }
    }
    /* Заменяем массивы на объекты из данных */
    for (const key in objectDay) {
        for (let dayObject of objectDay[key]) {
            const currentDay = new Date(objectDay[key][0].dt*1000).toLocaleString('ru', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
            });
            weekDay = currentDay.split(',')[0];
            fullDate = currentDay;
            let hours = dayObject.dt_txt.split(' ')[1].split(':')[0];
            const dataDayWeekArr = [
                dayObject.main.temp,
                dayObject.weather[0].icon,
                dayObject.weather[0].description,
                dayObject.wind.speed,
                dayObject,
            ];
            if (hours === '06' || hours === '09') [tempMoning, imgSrcMoning, imgDescrMoning, windMoning, probMoning]= addHoursData(...dataDayWeekArr);
            if (hours === '21' || hours === '18') [tempEvening, imgSrcEvening, imgDescrEvening, windEvening, probEvening]= addHoursData(...dataDayWeekArr);
            if (hours === '00' || hours === '03') [tempNights, imgSrcNigth, imgDescrNigth, windNigth, probNigth]= addHoursData(...dataDayWeekArr);
            if (hours === '12' || hours === '15') [tempDays, imgSrcDay, imgDescrDay, windDay, probDay]= addHoursData(...dataDayWeekArr);
        }
        let temp = [tempMoning, tempEvening, tempNights, tempDays];
        let imgDescr = [imgDescrMoning, imgDescrEvening, imgDescrNigth, imgDescrDay];
        let imgSrc = [imgSrcMoning, imgSrcEvening, imgSrcNigth, imgSrcDay];
        let wind = [windMoning, windEvening, windNigth, windDay];
        let prob = [probMoning, probEvening, probNigth, probDay];
        let empty = [];
        temp = findEmptyElements(empty, temp);
        imgDescr = findEmptyElements(empty, imgDescr);
        imgSrc = findEmptyElements(empty, imgSrc);
        wind = findEmptyElements(empty, wind);
        prob = findEmptyElements(empty, prob);
        objectDay[key] = {
            weekDay,
            fullDate,
            imgSrc,
            imgDescr,
            temp,
            wind,
            prob
        };
    }
    return objectDay;
};
//Поиск пустых елементов
const findEmptyElements = (empty , arr, elem = 0) => {
    for (let index = 0; index < arr.length; index++) {
        arr[index] !== '' ? elem = arr[index] : empty.push(index);
    }
    for (let k = 0; k < empty.length; k++) {
        arr[empty[k]] = elem;
    }
    return arr;
};
//Столбцы
const probabilityCol = numberCol => {
    let valueCol;
    if (numberCol > 6) valueCol = '22px';
    else if(numberCol > 5 ) valueCol = '28px';
    else if (numberCol > 4) valueCol = '30px';
    else if(numberCol > 3) valueCol = '38px';
    else if(numberCol > 2) valueCol = '46px';
    else if (numberCol > 1) valueCol = '54px';
    else if(numberCol > 0)valueCol = '62px';
    else valueCol = '70px';
    return valueCol;
};
//Получение Html элементов
const getDataPage = (methodGet, array) => {
    let arrDomNodes = [];
    for (let domElem of array) {
        let arrItem;
        if (methodGet === 'Id') arrItem = document.getElementById(domElem);
        else if (methodGet === 'ClassName') arrItem = document.getElementsByClassName(domElem);
        arrDomNodes.push(arrItem);
    }
    return arrDomNodes;
};
//Трансформация данных истории
const historyTransform = (data, city) => {
    let history = [];
    for (const key in data) {
        if (key === city) {
            let minMiddle, maxMiddle, recordMax, recordMin;
            const objectYears = data[key];
            for (let i = 0; i < 12; i++) {
                for (const prop in objectYears) {
                    if (prop === '1960') {
                        minMiddle = objectYears[prop][i].avearage;
                        maxMiddle = objectYears[prop][i].avearage;
                        recordMax = objectYears[prop][i].max;
                        recordMin = objectYears[prop][i].min;
                    } else {
                        if(minMiddle > objectYears[prop][i].avearage) minMiddle = objectYears[prop][i].avearage;
                        else if(maxMiddle < objectYears[prop][i].avearage) maxMiddle = objectYears[prop][i].avearage;
                        else if(recordMax < objectYears[prop][i].max) recordMax = objectYears[prop][i].max;
                        else if(recordMin > objectYears[prop][i].min) recordMin = objectYears[prop][i].min;
                    }
                }
                let objectData = {
                    minMiddle,
                    maxMiddle,
                    recordMax,
                    recordMin,
                };
                history.push(objectData);
            }
        }
    }
    return history;
};
//Длина дня и ночи
const longDayNight = (sunrise, sunset) => {
    const hourSunset = sunset.split(',')[1].split(':')[0];
    const minutesSunset = sunset.split(',')[1].split(':')[1];
    const hourSunrise = sunrise.split(',')[1].split(':')[0];
    const minutesSunrise = sunrise.split(',')[1].split(':')[1];
    const longDaySeconds = hourSunset*60 + minutesSunset*1 - hourSunrise*60 - minutesSunrise*1;
    const longDay = Math.round(longDaySeconds/60) + ' ч ' + longDaySeconds%60 + ' мин';
    const longNight = Math.round((24*60 - longDaySeconds)/60) + ' ч ' + (24*60 - longDaySeconds)%60 + ' мин';
    return [longDay, longNight];
};
//Получем структурируемые данные по часам
const addHoursData = (temp, src, descr, wind, objectDay) => {
    let prob;
    temp = objectDay.main.temp;
    src = objectDay.weather[0].icon;
    descr = objectDay.weather[0].description;
    wind = objectDay.wind.speed;
    if (objectDay.snow === undefined) {
        if (objectDay.rain === undefined) prob = '0.0';
        else {
            if (objectDay.rain['3h'] === undefined) prob = '0.0';
            else prob = objectDay.rain['3h'].toFixed(1);
        }
    } else {
        if (objectDay.snow['3h'] === undefined) prob = '0.0';
        else prob = objectDay.snow['3h'].toFixed(1);
    }
    return [temp, src, descr, wind, prob];
};
//Вставляем данные на 5 дней
const renderDays = (objectDay , number) => {
    const img = `img/Today/${ objectDay.imgSrc[number] }.png`;
    const descrImg = objectDay.imgDescr[number];
    const temp = objectDay.temp[number].toFixed(0) + '&deg';
    const wind = objectDay.wind[number].toFixed(0);
    const prob = objectDay.prob[number];
    const probCol = probabilityCol(objectDay.prob[number]);
    return [img, descrImg, descrImg,  wind, temp, prob, probCol];
};
