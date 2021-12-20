const containerLeftEl = document.querySelector('#container-left');
const containerRightEl = document.querySelector('#container-right');
const input = document.querySelector('#search-form');
const searchButtonEl = document.querySelector('#search-button');
const cityHeroEl = document.querySelector('#city-hero');
const forecastEl = document.querySelector('#forecast');

let cityValue = [];
let currentWeather = '';

// Function to gather input from search
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

// Function to pull data from API
let getRequestedWeather = function (){

    let requestWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city},US&units=imperial&appid=73963c93b7e24695087cf9963cd9fc41`

    fetch(requestWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let cityData = data.city.name;
        cityValue.push(cityData);
        let tempValue = data.list[0].main.temp;
        let humiValue = data.list[0].main.humidity;
        let windValue = data.list[0].wind.speed;
        console.log(cityValue);
        console.log(tempValue);
        console.log(humiValue);
        console.log(windValue);
    displayWeather();
        function displayWeather() {
            let cityNameText = document.createElement('h1');
            cityNameText.id = 'cityNameText' + workHours[i];
            cityNameText.classList = 'cityNameText col-1';
            containerSections.appendChild(cityNameText);
        }
    });
};

