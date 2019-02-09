let arr;
const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const defaultCity = 'Izhevsk';
const lang = '&lang=ru';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?&appid=${ APP_ID }&q=`;
const WEATHER_DETAILS_HOURS = `http://api.openweathermap.org/data/2.5/forecast?appid=${ APP_ID }&q=`;
const HISTORY_DETAILS = 'http://api.openweathermap.org/data/2.5/group?';
let locationFull = window.location.pathname.split('/');
const currentLocation = locationFull[locationFull.length-1];
const units = '&units=metric';
const regExpFindField = /(^[A-Z]{1}[a-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}$)|(^[А-Я]{1}[а-я]{1,100} [А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100} [A-Za-z]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}-{1}[А-Яа-я]{1,100}$)|(^[A-Z]{1}[a-z]{1,100}-{1}[A-Za-z]{1,100}-{1}[A-Za-z]{1,100}$)|(^[А-Я]{1}[а-я]{1,100}-{1}[А-Яа-я]{1,100}-{1}[А-Яа-я]{1,100}$)/;