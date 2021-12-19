const containerLeftEl = document.querySelector('#container-left');
const containerRightEl = document.querySelector('#container-right');
const input = document.querySelector('#search-form');
const searchButtonEl = document.querySelector('#search-button');
const cityHeroEl = document.querySelector('#city-hero');
const forecastEl = document.querySelector('#forecast');

let city = '';
let cityValue = [];
let currentWeather = '';

searchButtonEl.addEventListener('click', function searchedCity(event) {
	event.preventDefault();
	city = document.querySelector("input[name='search']").value;
    console.log(city);
	// check if inputs are empty (validate)
	if (!city) {
		alert("You must enter a city!");
		return false;
	}
    getRequestedWeather();
	// reset form field for next city to be entered
	document.querySelector("input[name='search']").value = "";
});

let getRequestedWeather = function (){

    let requestWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city},US&units=imperial&appid=73963c93b7e24695087cf9963cd9fc41`

    fetch(requestWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var cityValue = data.list[0];
        console.log(cityValue);
        // var tempValue = data['current']['temp_f'];
        // var condValue = data['current']['condition']['text'];
    });
};

