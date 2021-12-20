const containerLeftEl = document.querySelector('#container-left');
const containerRightEl = document.querySelector('#container-right');
const input = document.querySelector('#search-form');
const searchButtonEl = document.querySelector('#search-button');
const cityHeroEl = document.querySelector('#city-hero');
const forecastTitleEl = document.querySelector('#forecast-title');
const forecastEl = document.querySelector('#forecast');

let today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = `${currentMonth}/${currentDay}/${currentYear}`;


// Function to gather input from search
searchButtonEl.addEventListener('click', function searchedCity(event) {
	event.preventDefault();
	city = document.querySelector("input[name='search']").value;
    console.log(city);

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

        displayForecastWeather();
        function displayForecastWeather() {
            let forecastTitle = document.createElement('h2');
            forecastTitle.id = 'forecastTitle';
            forecastTitle.textContent = '5-Day Forecast:';
            forecastTitleEl.appendChild(forecastTitle);
            
            console.log(data.list[0].dt_txt);
            
            let finalDate = [];
            
            // For loop to convert the date for each day
            let n = 0;
            for(i = 0; i < 5; i++) {
                let originalDate = data.list[n].dt_txt;
                let splitDate = originalDate.split('-');
                let splitDay = splitDate[2].split(' ');
                let convertedDate = `${splitDate[1]}/${splitDay[0]}/${splitDate[0]}`;
                finalDate.push(convertedDate);
                n = n + 8;
            }
         
            let tempValue = [data.list[0].main.temp, data.list[8].main.temp, data.list[16].main.temp, data.list[24].main.temp, data.list[32].main.temp];
            let humiValue = [data.list[0].main.humidity, data.list[8].main.humidity, data.list[16].main.humidity, data.list[24].main.humidity, data.list[32].main.humidity];
            let windValue = [data.list[0].wind.speed, data.list[8].wind.speed, data.list[16].wind.speed, data.list[24].wind.speed, data.list[32].wind.speed];

            console.log(tempValue[0]);
            console.log(humiValue);
            console.log(windValue);
            
            for(i = 0; i < 5; i++) {
            // Forecast Day 1
            let forecastCard = document.createElement('div');
            forecastCard.classList = 'forecast-card';
            forecastCard.id = 'forecastBackground'
            forecastEl.appendChild(forecastCard);
            
            let dateText = document.createElement('h3');
            dateText.id = 'dateText';
            dateText.textContent = finalDate[i];
            forecastCard.appendChild(dateText);

            let tempText = document.createElement('p');
            tempText.id = 'tempText';
            tempText.textContent = `Temp: ${tempValue[i]}°F`;
            forecastCard.appendChild(tempText);

            let windText = document.createElement('p');
            windText.id = 'windText';
            windText.textContent = `Wind: ${windValue[i]}MPH`;
            forecastCard.appendChild(windText);

            let humiText = document.createElement('p');
            humiText.id = 'humiText';
            humiText.textContent = `Humidity: ${humiValue[i]}%`;
            forecastCard.appendChild(humiText);
            }
        }
    });
};