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
let currentPage;// текущая страница
let currentSessionCityPage;
const sessionCity = sessionStorage.getItem('city');
sessionCity == null || '' ? currentSessionCityPage = defaultCity : currentSessionCityPage = sessionCity;

//Today
//html elements hours
const [
    tempValuePlus, tempColPlus, tempValueMinus,
    tempColMinus, hours, speedWind,
    windArrow, daysWeek, tempDay,
    tempNight, probabilityValue, probability,
] =  getDataPage('ClassName', [
    'tempvaluePlus', 'tempColPlus', 'tempvalueMinus',
    'tempColMinus', 'timeWeather', 'speedWind',
    'windArrow', 'dayWeek', 'tempDay',
    'tempNight', 'probabilityValue', 'probability',
]);
//Five Day
// Hours
let weekDay, fullDate, imgSrcMoning = '', imgDescrMoning = '',
    imgSrcEvening = '', imgDescrEvening = '', imgSrcNigth = '',
    imgDescrNigth = '', imgSrcDay = '', imgDescrDay = '',
    tempDays = '', tempNights = '', tempEvening = '',
    tempMoning = '', windDay = '', windNigth = '',
    windEvening = '', windMoning = '', probDay = '',
    probNigth = '', probEvening = '', probMoning = '';
const [
    navDays, numberDay, nightImg,
    moningImg, dayImg, eveningImg,
    nightTemp, moningTemp, dayTemp,
    eveningTemp, nightWind, moningWind,
    dayWind, eveningWind, nightProb,
    moningProb, dayProb, eveningProb,
] = getDataPage('ClassName', [
    'navDays', 'numberDay', 'nightImg',
    'moningImg', 'dayImg', 'eveningImg',
    'nightTemp', 'moningTemp', 'dayTemp',
    'eveningTemp', 'windNigth', 'windMoning',
    'windDay', 'windEvening', 'probNigth',
    'probMoning', 'probDay', 'probEvening'
]);
