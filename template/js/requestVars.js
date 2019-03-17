const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const defaultCity = 'Izhevsk';
const lang = '&lang=ru';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?&appid=${ APP_ID }&q=`;
const WEATHER_DETAILS_HOURS = `https://api.openweathermap.org/data/2.5/forecast?appid=${ APP_ID }&q=`;
const HISTORY_DETAILS = 'https://api.openweathermap.org/data/2.5/group?';
let locationFull = window.location.pathname.split('/');
const currentLocation = locationFull[locationFull.length-1];
const units = '&units=metric';
const regExpFindField = /(^[A-Z]{1}[a-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}$)|(^[А-Я]{1}[а-я]{1,100} [А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100} [A-Za-z]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}-{1}[А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}-{1}[A-Za-z]{1,100}-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}-{1}[А-Яа-я]{1,100}-{1}[А-Яа-я]{1,100}$)/;
//Сессии
let currentSessionCityPage;
const sessionCity = sessionStorage.getItem('city');
sessionCity == null || '' ? currentSessionCityPage = defaultCity : currentSessionCityPage = sessionCity;

//Поле поиска
const searchField = document.getElementById('searchField');

//html elements hours today
let arrHours =  ['tempvaluePlus', 'tempColPlus', 'tempvalueMinus','tempColMinus','timeWeather','speedWind','windArrow','dayWeek','tempDay','tempNight', 'probabilityValue', 'probability'];
arrHours = getDataPage('ClassName', arrHours);
const tempValuePlus = arrHours[0],
    tempColPlus = arrHours[1],
    tempValueMinus = arrHours[2],
    tempColMinus = arrHours[3],
    hours = arrHours[4],
    speedWind = arrHours[5],
    windArrow = arrHours[6],
    daysWeek = arrHours[7],
    tempDay = arrHours[8],
    tempNight = arrHours[9],
    probabilityValue = arrHours[10],
    probability = arrHours[11];
//five day
// Hours
let arrFiveDayHours = ['navDays', 'numberDay', 'nightImg', 'moningImg', 'dayImg', 'eveningImg', 'nightTemp', 'moningTemp', 'dayTemp', 'eveningTemp', 'windNigth', 'windMoning', 'windDay', 'windEvening', 'probNigth', 'probMoning', 'probDay', 'probEvening'];
arrFiveDayHours = getDataPage('ClassName', arrFiveDayHours);
const navDays = arrFiveDayHours[0],
    numberDay = arrFiveDayHours[1],
    nightImg = arrFiveDayHours[2],
    moningImg = arrFiveDayHours[3],
    dayImg = arrFiveDayHours[4],
    eveningImg = arrFiveDayHours[5],
    nightTemp = arrFiveDayHours[6],
    moningTemp = arrFiveDayHours[7],
    dayTemp = arrFiveDayHours[8],
    eveningTemp = arrFiveDayHours[9],
    nightWind = arrFiveDayHours[10],
    moningWind = arrFiveDayHours[11],
    dayWind = arrFiveDayHours[12],
    eveningWind = arrFiveDayHours[13],
    nightProb = arrFiveDayHours[14],
    moningProb = arrFiveDayHours[15],
    dayProb = arrFiveDayHours[16],
    eveningProb = arrFiveDayHours[17];