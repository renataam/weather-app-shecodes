function formatDate(date){
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thusrday",
      "Friday",
      "Saturday",
    ];
    let dayss = days[day];
    return `${dayss} ${hours}:${minutes}`;
}

function displayWeatherCondition(response){
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humi").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;  
}

function searchForcity(city){
    let apiKey = "170ed67c56f7d3751961a6f26123ed61";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);

}

function search(event){
   event.preventDefault();
   let city = document.querySelector("#city-input").value;
   searchForcity(city);
}

function showCurrentlocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position){
let apiKey = "170ed67c56f7d3751961a6f26123ed61";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeatherCondition);

}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let searchFomr = document.querySelector("#search-form");


searchFomr.addEventListener("submit", search)

dateElement.innerHTML = formatDate(currentTime); 

let currentLocationButton = document.querySelector("#buttonCurrent");
currentLocationButton.addEventListener("click", showCurrentlocation);

searchForcity("Brazil");