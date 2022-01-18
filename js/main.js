/*
wind_dir
N = North (349 - 011 degrees)
NNE = North-Northeast (012-033 degrees)
NE = Northeast (034-056 degrees)
ENE = East-Northeast (057-078 degrees)
E = East (079-101 degrees)
ESE = East-Southeast (102-123 degrees)
SE = Southeast (124-146 degrees)
SSE = South-Southeast (147-168 degrees)
S = South (169-191 degrees)
SSW = South-Southwest (192-213 degrees)
SW = Southwest (214-236 degrees)
WSW = West-Southwest (237-258 degrees)
W = West (259-281 degrees)
WNW = West-Northwest (282-303 degrees)
NW = Northwest (304-326 degrees)
NNW = North-Northwest (327-348 degrees)
VAR = Variable wind direction
CLM = Calm winds (speed = 0 knots)
ALL = All direction categories combined
*/

/*
var vs const vs let
var, const, let => hoisting
const, let => not in window object
const, let => value can change in run time
const => value can't change in code time
*/

const searchInput = document.getElementById('search');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getData(text = 'cairo', callback = displayData) {
  const key = '27b81bb84d644a22872132514221401';
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${text}&days=3&aqi=no&alerts=no`;

  // using fetch() : function => Promise() : object
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 400) {
        searchInput.value = '';
        throw new Error('Please Enter A Valid City Name');
      } else {
        searchInput.value = '';
        throw new Error('Something Went Wrong');
      }
    })
    .then(data => callback(data))
    .catch(error => {
      alert(error);
    });
}

function displayData({ location, current, forecast: { forecastday } }) {
  const zeroDay = document.getElementById('zero-day');
  const firstDay = document.getElementById('first-day');
  const secondDay = document.getElementById('second-day');

  zeroDay.innerHTML = `
  <div class="aa-card card border-0 rounded-0" id="zero-day">
  <div class="aa-card-header card-header">
    <div class="d-flex justify-content-between align-items-center">
      <span>${days[new Date(current.last_updated).getDay()]}</span>
      <span>${new Date(current.last_updated).getDate()}${months[new Date(current.last_updated).getMonth()]}</span>
    </div>
  </div>
  <div class="card-body">
    <div class="aa-data">
      <p class="aa-location">${location.name}</p>
      <div class="aa-degree d-flex align-items-center flex-wrap">
        <span class="text-uppercase">${Math.floor(+current.temp_c)}°c</span>
        <span><img src="https:${current.condition.icon}" alt="weather-icon" /></span>
      </div>
      <div class="aa-icons d-flex align-items-center flex-wrap">
        <div class="aa-icon m-2">
          <img src="./img/icon-umbrella.png" alt="icon" class="me-2" />
          <span class="aa-icon-data">${Math.floor(+current.precip_mm)}%</span>
        </div>
        <div class="aa-icon m-2">
          <img src="./img/icon-wind.png" alt="icon" />
          <span class="aa-icon-data">${Math.floor(+current.wind_kph)}km/h</span>
        </div>
        <div class="aa-icon m-2">
          <img src="./img/icon-compass.png" alt="icon" />
          <span class="aa-icon-data">${current.wind_dir}</span>
        </div>
        <div class="aa-icon m-2">
        <span class="aa-icon-data">Humidity: ${Math.floor(+current.humidity)}%</span>
        </div>
      </div>
      <p class="aa-weather-type">${current.condition.text}</p>
    </div>
  </div>
</div>
  `;

  firstDay.innerHTML = `
  <div class="aa-card-header card-header text-center bg-dark">
    <span>${days[new Date(forecastday[1].date).getDay()]}</span>
  </div>
  <div class="card-body d-flex align-items-center justify-content-center">
  <div class="aa-data">
    <div class="d-flex align-items-center justify-content-center flex-wrap flex-column">
      <span><img src="https:${forecastday[1].day.condition.icon}" alt="weather-icon" /></span>
      <p class="text-white text-uppercase">${Math.floor(+forecastday[1].day.maxtemp_c)}°c</p>
      <p>${Math.floor(+forecastday[1].day.mintemp_c)}°</p>
    </div>
     <p class="aa-weather-type text-center">${forecastday[1].day.condition.text}</p>
    </div>
  </div>
  `;

  secondDay.innerHTML = `
  <div class="aa-card-header card-header text-center bg-dark">
    <span>${days[new Date(forecastday[2].date).getDay()]}</span>
  </div>
  <div class="card-body d-flex align-items-center justify-content-center">
  <div class="aa-data">
    <div class="d-flex align-items-center justify-content-center flex-wrap flex-column">
      <span><img src="https:${forecastday[2].day.condition.icon}" alt="weather-icon" /></span>
      <p class="text-white text-uppercase">${Math.floor(+forecastday[2].day.maxtemp_c)}°c</p>
      <p>${Math.floor(+forecastday[2].day.mintemp_c)}°</p>
    </div>
     <p class="aa-weather-type text-center">${forecastday[2].day.condition.text}</p>
    </div>
  </div>
  `;
}

const search = e => (e.target.value.trim().toLowerCase().length < 3 ? null : getData(e.target.value));

getData();

searchInput.addEventListener('keyup', e => search(e));
