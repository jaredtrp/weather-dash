const containerLeftEl = document.querySelector('#container-left');
const containerRightEl = document.querySelector('#container-right');
const input = document.querySelector('#search-form');
const searchButtonEl = document.querySelector('#search-button');
const cityHeroEl = document.querySelector('#city-hero');
const forecastEl = document.querySelector('#forecast');

let today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = `${currentMonth}/${currentDay}/${currentYear}`
// let cityCurrentValue = [];
// let cityForecastValue = [];

// Function to gather input from search
searchButtonEl.addEventListener('click', function searchedCity(event) {
	event.preventDefault();
	city = document.querySelector("input[name='search']").value;
    console.log(city);
	// check if inputs are empty (validate)
	// if (city = '') {
	// 	alert("You must enter a city!");
	// 	return false;
	// } else {
    getRequestedWeather();
	// reset form field for next city to be entered
	document.querySelector("input[name='search']").value = "";
});

// Function to pull data from API
let getRequestedWeather = function (){
    // 2 different API URLs needed to pull the current weather and 5-day forecast
    let requestCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=73963c93b7e24695087cf9963cd9fc41`;
    let requestForecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city},US&units=imperial&appid=73963c93b7e24695087cf9963cd9fc41`;
    
    // Function that injects current weather card
    fetch(requestCurrentWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let cityCurrentValue = data.name;
        let tempValue = data.main.temp;
        let humiValue = data.main.humidity;
        let windValue = data.wind.speed;

        displayCurrentWeather();
        function displayCurrentWeather() {
            cityHeroEl.style.border = '1px solid #000000';

            let cityText = document.createElement('h1');
            cityText.id = 'cityText';
            cityText.textContent = `${cityCurrentValue} (${currentDate})`;
            cityHeroEl.appendChild(cityText);

            let tempText = document.createElement('p');
            tempText.id = 'tempText';
            tempText.textContent = `Temp: ${tempValue}°F`;
            cityHeroEl.appendChild(tempText);

            let windText = document.createElement('p');
            windText.id = 'windText';
            windText.textContent = `Wind: ${windValue}MPH`;
            cityHeroEl.appendChild(windText);

            let humiText = document.createElement('p');
            humiText.id = 'humiText';
            humiText.textContent = `Humidity: ${humiValue}%`;
            cityHeroEl.appendChild(humiText);

            // let uvText = document.createElement('p');
            // uvText.id = 'uvText';
            // uvText.textContent = `UV Index: ${uvValue}`;
            // cityHeroEl.appendChild(uvText);
        };
    });
    // Function that injects 5-day forecast card
    fetch(requestForecastWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let cityForecastValue = data.city.name;
        let tempValue = data.list[0].main.temp;
        let humiValue = data.list[0].main.humidity;
        let windValue = data.list[0].wind.speed;

        console.log(cityForecastValue);
        console.log(tempValue);
        console.log(humiValue);
        console.log(windValue);

        displayForecastWeather();
        function displayForecastWeather() {
            
            let forecastTitle = document.createElement('h2');
            forecastTitle.id = 'forecastTitle';
            forecastTitle.textContent = '5-Day Forecast:';
            forecastEl.appendChild(forecastTitle);

            let forecastCard = document.createElement('div');
            forecastCard.id = 'forecast-card';
            forecastEl.appendChild(forecastCard);
            
            let cityText = document.createElement('h1');
            cityText.id = 'cityText';
            cityText.textContent = `${cityForecastValue} (${currentDate})`;
            forecastEl.appendChild(cityText);

            let tempText = document.createElement('p');
            tempText.id = 'tempText';
            tempText.textContent = `Temp: ${tempValue}°F`;
            forecastEl.appendChild(tempText);

            let windText = document.createElement('p');
            windText.id = 'windText';
            windText.textContent = `Wind: ${windValue}MPH`;
            forecastEl.appendChild(windText);

            let humiText = document.createElement('p');
            humiText.id = 'humiText';
            humiText.textContent = `Humidity: ${humiValue}%`;
            forecastEl.appendChild(humiText);
        }
    });
};
