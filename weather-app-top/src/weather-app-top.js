function getForecast(coordinates) {
  let apiKey = "2abt2f6340do47141b6f92d3a14301be";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function getTemp(response) {
  celciusTemperature = response.data.main.temp;
  let tempRound = Math.round(celciusTemperature);
  let humidityRound = Math.round(response.data.main.humidity);
  let windRound = Math.round(response.data.wind.speed);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = tempRound;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidityRound;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = windRound;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function changeCityName(event) {
  event.preventDefault();
  let userCityForm = document.querySelector("#city-name");
  let cityElement = document.querySelector("#city");
  let cityName = userCityForm.value;
  cityElement.innerHTML = cityName;
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemp);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemp);
}

function convertToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  cButton.classList.remove("active");
  fButton.classList.add("active");
  let tempF = (celciusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(tempF);
}

function convertToC(event) {
  event.preventDefault();
  cButton.classList.add("active");
  fButton.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  x = 0;
  days.forEach(function (day) {
    tempMax = Math.round(response.data.daily[x].temperature.maximum);
    tempMin = Math.round(response.data.daily[x].temperature.minimum);
    iconURL = response.data.daily[x].condition.icon_url;
    console.log(icon);

    forecastHTML =
      forecastHTML +
      `
    <div class="col-sm">
      <div class="weather-forecast-date">${day}</div>
      <img src=${iconURL} alt="" width="50"/>
      <div class="weather-forecast-temps">
        <span class="temp-max"> ${tempMax} </span>
        <span class="temp-min"> ${tempMin} </span>
      </div>
    </div>

  `;
    x = x + 1;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;

let now = new Date();

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} ${hour}:${mins}`;

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", changeCityName);

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentPosition)
);

let fButton = document.querySelector("#faren");
fButton.addEventListener("click", convertToF);

let cButton = document.querySelector("#celc");
cButton.addEventListener("click", convertToC);
