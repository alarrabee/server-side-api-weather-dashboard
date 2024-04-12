//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const searchBtnEl = document.getElementById('searchBtn'); //reminder .getElementbyId does not need #
const searchBarEl = document.getElementById('searchBar');
// const userSearchEl = document.getElementById('#user-search').value; - add .value to button event listener so it triggers on click. The value when your page loads is nothing.




//function that saves search value to localStorage
function getCity() {
  const searchValue = searchBarEl.value.trim(); //trim removes white spaces before and after the entered value 
  if (!searchValue) { //alerts user to enter a city name
    alert('Please enter a city name.');
    return;
}
  let cityArray = JSON.parse(localStorage.getItem('city')) || [];
  cityArray.push(searchValue);
  localStorage.setItem('city', JSON.stringify(cityArray));

  getWeather(searchValue);
  getFiveDay(searchValue);
}


//converts the city into lat and lon by using the direct geocoding api
function getWeather(city) {
  const geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=58e024ee1cf018fe40460b065442e140`;

  fetch(geoCodeApi)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results');
          }
          return response.json();
      })
      .then(function(geoCodeData) {
          const location = geoCodeData[0];
          const latitude = location.lat;
          const longitude = location.lon;

          const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=58e024ee1cf018fe40460b065442e140`;

          return fetch(openWeatherApi);
      })
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results');
          }
          return response.json();
      })
      .then(function(weatherData) {
          displayWeather(weatherData);
      })
      .catch(function(error) {
          console.error('Error:', error.message);
      });
}


//set up to retreive specified information from the weatherData object so that it can be displayed on the page
function displayWeather(weatherData) {
  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;

  // Inserts the above information into a string using template literals
  const cityTitle = `Today's Forecast for: ${cityName}`;
  const todaysDate = dayjs().format('ddd MM/DD/YYYY');
  const cityTemp = `Temperature: ${temperature}K`; //fix to °F
  const cityWind = `Wind Speed: ${windSpeed} m/s`;
  const cityHumidity = `Humidity: ${humidity}%`;

  // Selects the elements where the information will be displayed
  const TitleEl = document.getElementById('city-name');
  TitleEl.textContent = cityTitle;

  const dateEl = document.getElementById('todays-date');
  dateEl.textContent = todaysDate;

  const tempEl = document.getElementById('temp-today');
  tempEl.textContent = cityTemp;

  const windEl = document.getElementById('wind-today');
  windEl.textContent = cityWind;

  const humidityEl = document.getElementById('humidity-today');
  humidityEl.textContent = cityHumidity;

}


//-------------------------------------------------------------
function getFiveDay(city) {
  const geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=58e024ee1cf018fe40460b065442e140`;

  fetch(geoCodeApi)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results');
          }
          return response.json();
      })
      .then(function(geoCodeData) {
          const location = geoCodeData[0];
          const latitude = location.lat;
          const longitude = location.lon;

          const openWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=58e024ee1cf018fe40460b065442e140`;

          return fetch(openWeatherApi);
      })
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results');
          }
          return response.json();
      })
      .then(function(weatherData) {
          displayFiveDay(weatherData);
      })
      .catch(function(error) {
          console.error('Error:', error.message);
      });
}

function displayFiveDay (weatherData) {
  const forecastList = weatherData.list;
    const forecast = [];

    // Iterate over the forecast list to get specified data for each day
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecastItem = forecastList[i]; // Each day has forecast data every 3 hours, so multiple forecasts per day. Data for each day is every 8th entry.
        const date = forecastItem.dt_txt;
        const temperature = forecastItem.main.temp;
        const windSpeed = forecastItem.wind.speed;
        const humidity = forecastItem.main.humidity;

        forecast.push({ date, temperature, windSpeed, humidity });
    }

    const fiveDayContainer = document.getElementById('five-day-container');

    forecast.forEach(function(day, index) {
      const dayContainer = document.createElement('div');
      dayContainer.classList.add('day-container');

      const dateElement = document.createElement('p');
      dateElement.textContent = day.date;
      dayContainer.appendChild(dateElement);

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${day.temperature}°C`;
      dayContainer.appendChild(temperatureElement);

      const windElement = document.createElement('p');
      windElement.textContent = `Wind Speed: ${day.windSpeed} m/s`;
      dayContainer.appendChild(windElement);

      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${day.humidity}%`;
      dayContainer.appendChild(humidityElement);

      // Append the day container to the respective day div
      const dayDiv = document.getElementById(`day${index + 1}`);
      dayDiv.innerHTML = ''; // Clear previous data
      dayDiv.appendChild(dayContainer);

      // Append the day div to the five-day container
      fiveDayContainer.appendChild(dayDiv);
  });



}

//------------------------------------------------------------


//event listener on search button that will call getCity function that saves the value to localStorage
searchBtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  getCity();
});



//-------------------------------------------------------------


