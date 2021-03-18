import * from './secret';
const weather = document.querySelector(".weather");
const wImg = document.querySelector(".wImg");

const COORDS = "coords";

function getWeatherAPI(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      weather.innerText = `${json.name} - ${json.main.temp}˚c ${json.weather[0].description}`;
      const imgUrl = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      console.log(imgUrl);

      const weatherImg = document.createElement("img");
      weather.appendChild(weatherImg);
      weatherImg.src = imgUrl;
    });
}

function loadWeather() {
  const loadedWeather = localStorage.getItem(COORDS);
  if (loadedWeather === null) {
    getCurrentLocation();
  } else {
    console.log(loadedWeather);
    const parsedLocation = JSON.parse(loadedWeather);
    weather.innerText = `${parsedLocation.latitude} & ${parsedLocation.longitude}`;
    getWeatherAPI(parsedLocation.latitude, parsedLocation.longitude);
  }
}

function saveCurrentLocationToLS(locationObj) {
  localStorage.setItem(COORDS, JSON.stringify(locationObj));
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  weather.innerText = `${latitude} & ${longitude}`;
  const locationObj = {
    latitude,
    longitude,
  };
  saveCurrentLocationToLS(locationObj);
}

function handleError(errorMessage) {
  console.log("failed get location");
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function init() {
  loadWeather();
}
init();
