function getPolution(data) {
    document.getElementById('polutionInfo').innerHTML = data.data[0].value;
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
        } else if ( number == dateFull || number == '' ) number = dateFull;
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
        let weekDay,
            fullDate,
            imgSrcMoning = '',
            imgDescrMoning = '',
            imgSrcEvening = '',
            imgDescrEvening = '',
            imgSrcNigth = '',
            imgDescrNigth = '',
            imgSrcDay = '',
            imgDescrDay = '',
            tempDay = '',
            tempNight = '',
            tempEvening = '',
            tempMoning = '' ,
            windDay = '',
            windNigth = '',
            windEvening = '', 
            windMoning = '',
            probDay = '',
            probNigth = '',
            probEvening = '',
            probMoning = '';
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
                windNigth = objectDay[key][i].wind.speed;
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
        temp = findEmptyElements(empty, elem, temp);
        imgDescr = findEmptyElements(empty, elem, imgDescr);
        imgSrc = findEmptyElements(empty, elem, imgSrc);
        wind = findEmptyElements(empty, elem, wind);
        prob = findEmptyElements(empty, elem, prob);
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
function findEmptyElements(empty ,elem, arr) {
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
        valueCol = '22px';
    } else if(numberCol > 5 ) {
        valueCol = '28px';
    } else if (numberCol > 4) {
        valueCol = '30px';
    } else if(numberCol > 3) {
        valueCol = '38px';
    } else if(numberCol > 2) {
        valueCol = '46px';
    } else if (numberCol > 1) {
        valueCol = '54px';
    } else if(numberCol > 0) {
        valueCol = '62px';
    } else {
        valueCol = '70px';
    }
    return valueCol;
}
//Получение Html элементов
function getDataPage (methodGet, array) {
    let arrDomNodes = [];
    for (let i = 0; i < array.length; i++) {
        let arrItem;
        if (methodGet === 'Id') arrItem = document.getElementById(array[i]);
        else if (methodGet === 'ClassName') arrItem = document.getElementsByClassName(array[i]);
        arrDomNodes.push(arrItem);
    }
    return arrDomNodes;
}
//Трансформация данных истории
function historyTransform(data, city) {
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
    return history;
}