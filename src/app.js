function getTemp(response) {
  let tempRound = Math.round(response.data.main.temp);
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
}

function changeCityName(event) {
  event.preventDefault();
  let userCityForm = document.querySelector("#city-name");
  let cityElement = document.querySelector("#city");
  let cityName = userCityForm.value;
  cityElement.innerHTML = cityName;
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemp);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemp);
}

function fToC() {
  let tempF = document.querySelector("#temp");
  tempF.innerHTML = "20";
}

function cToF() {
  let tempC = document.querySelector("#temp");
  tempC.innerHTML = "-7";
}

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
fButton.addEventListener("click", fToC);

let cButton = document.querySelector("#celc");
cButton.addEventListener("click", cToF);
