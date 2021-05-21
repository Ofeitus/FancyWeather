const language_chooser = document.querySelector(".language-choice");

function setLocale() {
    locale = language_chooser.value.toLowerCase();
    recognition.lang = locale;
    if (language_chooser.value == "RU") {
        document.querySelector("#feels-like").innerHTML = "Ощущается как:&nbsp;";
        document.querySelector("#wind-speed").innerHTML = "Ветер:&nbsp;";
        document.querySelector("#humidity").innerHTML = "Влажность:&nbsp;";
        document.querySelector("#latitude").innerHTML = "Широта:&nbsp;";
        document.querySelector("#longitude").innerHTML = "Долгота:&nbsp;";
        document.querySelector(".search-button").innerHTML = "Поиск";
        document.querySelector("#location-input").setAttribute("placeholder", "Введите город или zip");
    } else {
        document.querySelector("#feels-like").innerHTML = "FEELS LIKE:&nbsp;";
        document.querySelector("#wind-speed").innerHTML = "WIND:&nbsp;";
        document.querySelector("#humidity").innerHTML = "HUMIDITY:&nbsp;";
        document.querySelector("#latitude").innerHTML = "Latitude:&nbsp;";
        document.querySelector("#longitude").innerHTML = "Longitude:&nbsp;";
        document.querySelector(".search-button").innerHTML = "Search";
        document.querySelector("#location-input").setAttribute("placeholder", "Enter city or zip");
    }
    getWeather(getWeatherApiUrlByCoords(weather_coords));
}

language_chooser.addEventListener("change", setLocale);