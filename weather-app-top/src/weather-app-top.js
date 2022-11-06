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
