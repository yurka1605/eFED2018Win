/* const APP_ID = `cbb3210df49fdf1c3c675a785e42454b`;
const CITY_DEFAULT = `Izhevsk`;
const WEATHER_DETAILS_REQUEST = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`;
const page = {
    init() {
        this.getWeatherDetails(CITY_DEFAULT, this.render);

        const searchFieldCheck = document.get
        const city = event.target.value;
    },
    getWeatherDetails(city,caLLBack) {
        
    },
    render(data) {

    }
};
page.init(); */

const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';
const page = {
    init(){
        this.getWeatherDetails(defaultCity, this.render);

        const searchField = document.getElementById('searchField');
        const searchButton = document.getElementById('find');
        searchButton.addEventListener('click', function() {
            const city = searchField.value;
            this.getWeatherDetails(city, this.render);
        });
    },
    getWeatherDetails(city, callback) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },
    render(data) {
        console.log('');
    },
};

page.init();