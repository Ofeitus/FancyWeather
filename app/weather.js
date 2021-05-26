const latitude = document.querySelector("#latitude-value");
const longitude = document.querySelector("#longitude-value");
const cityInput = document.querySelector("#location-input");
const cityInputButton = document.querySelector(".search-button");
const location_header = document.querySelector("#location-header");
const today_temperature = document.querySelector("#today-temperature-value");
const weather_description = document.querySelector("#description")
const feels_like = document.querySelector("#feels-like-value");
const wind_speed = document.querySelector("#wind-speed-value");
const humidity = document.querySelector("#humidity-value");
const today_weather_info = document.querySelector("#today-weather-info");

const units_toggle = document.querySelector(".form_toggle");
const celsius = document.querySelector("#fid-2");
const fahrenheit = document.querySelector("#fid-1");

if (localStorage.getItem("weather_units") == null) {
    localStorage.setItem("weather_units", "metric");
} else if (localStorage.getItem("weather_units") == "metric") {
    celsius.checked = true;
    fahrenheit.checked = false;
} else if (localStorage.getItem("weather_units") == "imperial") {
    celsius.checked = false;
    fahrenheit.checked = true;
}

var weather_data;
var weather_coords = [0, 0];

function displayTemp() {
    if (celsius.checked) {
        today_temperature.innerHTML = Math.round(weather_data.list[0].main.temp);
        feels_like.innerHTML = Math.round(weather_data.list[0].main.feels_like);
    } else {
        today_temperature.innerHTML = Math.round(weather_data.list[0].main.temp*1.8+32);
        feels_like.innerHTML = Math.round(weather_data.list[0].main.feels_like*1.8+32);
    }
    // future weather
    for (let i = 1; i <= 3; i++) {
        let future_temperature = document.querySelector("#temperature"+i);
        if (celsius.checked) {
            future_temperature.innerHTML = Math.round(weather_data.list[8 * i].main.temp) + "°";
        } else {
            future_temperature.innerHTML = Math.round(weather_data.list[8 * i].main.temp*1.8+32) + "°";
        }
    }
}

function setUnits() {
    if (celsius.checked) {
        localStorage.setItem("weather_units", "metric");
    } else {
        localStorage.setItem("weather_units", "imperial");
    }
    displayTemp();
}

function handleSearch(e) {
    cityInput.setAttribute("placeholder", "Enter city or zip");
    if (e.which == 13 || e.keyCode == 13) {
        getWeather(getWeatherApiUrlByCity(cityInput.value));
    }
}

function getWeatherApiUrlByCity(city) {
    return "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&lang="+localStorage.getItem("weather_locale")+"&units=metric&APPID=1c77421b3dcb55d2c0da4104a6ada19f";
}

function getWeatherApiUrlByCoords(coords) {
    return "https://api.openweathermap.org/data/2.5/forecast?lat="+coords[0]+"&lon="+coords[1]+"&lang="+localStorage.getItem("weather_locale")+"&units=metric&APPID=1c77421b3dcb55d2c0da4104a6ada19f";
}

async function getWeather(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod != "200") {
        cityInput.value = "";
        cityInput.setAttribute("placeholder", data.message);
    }

    weather_data = data;

    location_header.innerHTML = (data.city.name + ", " + (new Intl.DisplayNames([localStorage.getItem("weather_locale")], { type: 'region' })).of(data.city.country)).toUpperCase();
    timezone = data.city.timezone;

    weather_description.innerHTML = data.list[0].weather[0].description.toUpperCase();
    wind_speed.innerHTML = Math.round(data.list[0].wind.speed);
    humidity.innerHTML = data.list[0].main.humidity;

    today_weather_info.setAttribute("src", "http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png");

    weather_coords = [data.city.coord.lat, data.city.coord.lon];
    latitude.innerHTML = Math.trunc(weather_coords[0]) + "°" + weather_coords[0].toString().split(".")[1].slice(0, 2).padEnd(2, "0") + "'";
    longitude.innerHTML= Math.trunc(weather_coords[1]) + "°" + weather_coords[1].toString().split(".")[1].slice(0, 2).padEnd(2, "0") + "'";
    
    // future weather
    for (let i = 1; i <= 3; i++) {
        let future_weather_info = document.querySelector("#future-weather-info"+i);
        future_weather_info.setAttribute("src", "http://openweathermap.org/img/wn/"+data.list[8 * i].weather[0].icon+"@2x.png")
    }

    displayTemp();
    getMap(weather_coords);
}

async function main() {
    cityInputButton.addEventListener("click", function(){getWeather(getWeatherApiUrlByCity(cityInput.value));});
    units_toggle.addEventListener("click", setUnits);
    cityInput.addEventListener("keypress", handleSearch);
    let myCity = await getMyCity();
    await getWeather(getWeatherApiUrlByCity(myCity));
    setLocale();
}

main();