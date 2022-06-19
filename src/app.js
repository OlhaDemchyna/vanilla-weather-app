let apiKey = "2833a5c0ffd88b47f1e5f1647b27776f";
let hasErrorBeenShown = false;
let isCelsiusShown = true;

function formatDate (timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    console.log(response.data);

    lastCelsiusTemp = response.data.main.temp;

    let temperature = lastCelsiusTemp;

    if (!isCelsiusShown) {
        temperature = celsiusToFahrenheit(lastCelsiusTemp);
    }

    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(temperature);
    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#last-updated").innerHTML = `Last Updated ${formatDate(response.data.dt*1000)}`;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

    document.querySelector("#info").classList.remove("d-none");
}

function handleError() {
    if (hasErrorBeenShown) {
        alert ("┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻");
    } else {
        alert ("Type the city name correctly (╯°□°）╯︵ ┻━┻");
    }

    hasErrorBeenShown = true;
}

function search(event) {
    event.preventDefault();
    let cityValue = document.querySelector("#city-input").value;
    if (cityValue !== "") {
        let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        axios.get(apiURL).then(displayTemperature).catch(handleError);
    }
}

let lastCelsiusTemp = null;

function celsiusTemp(event) {
    event.preventDefault();
    
    document.querySelector("#temperature").innerHTML = Math.round(lastCelsiusTemp);

    document.querySelector("#fahrenheit").classList.remove("active");
    document.querySelector("#celsius").classList.add("active");

    isCelsiusShown = true;
}

function fahrenheitTemp(event) {
    event.preventDefault();

    document.querySelector("#temperature").innerHTML = Math.round(celsiusToFahrenheit(lastCelsiusTemp));

    document.querySelector("#celsius").classList.remove("active");
    document.querySelector("#fahrenheit").classList.add("active");

    isCelsiusShown = false;
}

function celsiusToFahrenheit(celsius) {
    return celsius*9/5+32
}

document.querySelector("#search-form").addEventListener("submit", search);

document.querySelector("#celsius").addEventListener("click", celsiusTemp);
document.querySelector("#fahrenheit").addEventListener("click", fahrenheitTemp);