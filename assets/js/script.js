const containerLeftEl = document.querySelector('#container-left');
const containerRightEl = document.querySelector('#container-right');
const input = document.querySelector('#search-form');
const searchForm = document.querySelector('#form-container');
const searchButtonEl = document.querySelector('#search-button');
const cityHeroEl = document.querySelector('#city-hero');
const forecastEl = document.querySelector('#forecast');

// let searchedCity = ;
let lat = 29.7633;
let lon = -95.3633;
let city = 'Houston';
let state = 'US';

button.addEventListener('click', function(){
    let requestHeroURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&exclude=hourly&units=imperial&appid=73963c93b7e24695087cf9963cd9fc41`

    fetch(requestHeroURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var cityValue = data['location']['name'];
        var stateValue = data['location']['region'];
        var tempValue = data['current']['temp_f'];
        var condValue = data['current']['condition']['text'];
    });

    let requestForecastURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=73963c93b7e24695087cf9963cd9fc41`

    fetch(requestForecastURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var cityValue = data['location']['name'];
        var stateValue = data['location']['region'];
        var tempValue = data['current']['temp_f'];
        var condValue = data['current']['condition']['text'];
    });
})
});