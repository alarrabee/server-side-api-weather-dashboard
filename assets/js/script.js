const searchBtnEl = document.getElementById('searchBtn'); //reminder .getElementbyId does not need #
const searchBarEl = document.getElementById('searchBar');
// const userSearchEl = document.getElementById('#user-search').value; - add .value to button event listener so it triggers on click. The value when your page loads is nothing.


//Saves search value to localStorage
function getCity() {
  const searchValue = searchBarEl.value.trim(); //trim removes white spaces before and after the entered value 
  if (!searchValue) { //alerts user to enter a city name
    alert('Please enter a city name.');
    return;
}
  let cityArray = JSON.parse(localStorage.getItem('city')) || [];
  cityArray.push(searchValue);
  localStorage.setItem('city', JSON.stringify(cityArray));

  savedCities();
  getWeather(searchValue);
  getFiveDay(searchValue);
  
}

//-----------------------------------------------------------------------------------------
//Gives lat and lon for the city using the direct geocoding api for today's weather
function getWeather(city) {
  const geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=58e024ee1cf018fe40460b065442e140`;

  fetch(geoCodeApi)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results-1'); //for troubleshooting
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
          console.log(response);
          if (!response.ok) {
              throw new Error('Failed to load results-2');
          }
          return response.json();
      })
      .then(function(weatherData) {
          displayWeather(weatherData);
          console.log(weatherData);
      })

}


//Displays the current weather results to the page
function displayWeather(weatherData) {
  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;
  const iconId = weatherData.weather[0].icon;
  console.log(weatherIcon);

  // Inserts the above information into a string using template literals
  const cityTitle = `Today's Forecast: ${cityName}`;
  const todaysDate = dayjs().format('ddd MM/DD/YYYY');
  const cityTemp = `Temp: ${temperature}K`; //fix to °F
  const cityWind = `Wind: ${windSpeed} m/s`;
  const cityHumidity = `Humidity: ${humidity}%`;
  
  // Selects the elements where the information will be displayed
 // Uses the API weather id to grab the associated img icon
  const iconImg = document.getElementById('weatherIcon');
  iconImg.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  const TitleEl = document.getElementById('city-name');
  TitleEl.textContent = `${cityTitle} (${todaysDate})`;

  const tempEl = document.getElementById('temp-today');
  tempEl.textContent = cityTemp;

  const windEl = document.getElementById('wind-today');
  windEl.textContent = cityWind;

  const humidityEl = document.getElementById('humidity-today');
  humidityEl.textContent = cityHumidity;
}


//-------------------------------------------------------------
////Gives lat and lon for the city using the direct geocoding api for the forecasted weather
function getFiveDay(city) {
  const geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=58e024ee1cf018fe40460b065442e140`;

  fetch(geoCodeApi)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to load results-3');
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
              throw new Error('Failed to load results-4');
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


//-----------------------------------------------------------------------------
//Displays the forecasted weather results to the page
function displayFiveDay (weatherData) {
  const forecastList = weatherData.list;
    const forecast = [];

    // Iterate over the forecast list to get specified data for each day
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecastItem = forecastList[i]; // Each day has forecast data every 3 hours, so multiple forecasts per day. Data for each day shown is every 8th entry.
        const date = dayjs(forecast.dt_txt).format('ddd MM/DD/YYYY');
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
      temperatureElement.textContent = `Temp: ${day.temperature} K`;
      dayContainer.appendChild(temperatureElement);

      const windElement = document.createElement('p');
      windElement.textContent = `Wind: ${day.windSpeed} m/s`;
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
//makes a list of recently searched cities that when clicked pulls up their weather data
function savedCities() {
    const cities = JSON.parse(localStorage.getItem('city')) || [];

    const savedCitiesDiv = document.getElementById('recent-cities');
    // Clear the previous list of cities
    savedCitiesDiv.innerHTML = '';
  
    const buttonsContainer = document.createElement('div');
  
    // Iterates through the list of cities and creates a button for them
    cities.forEach(function(city) {
      const cityButton = document.createElement('button');
      cityButton.textContent = city;
      

      buttonsContainer.appendChild(cityButton);
    });
    // Appends the newly created buttonsContainer of buttons to the already created savedCitiesDiv
    savedCitiesDiv.appendChild(buttonsContainer);
  }
  



//------------------------------------------------------------
//event listener on search button that will call getCity function that saves the value to localStorage
searchBtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  getCity();
});







