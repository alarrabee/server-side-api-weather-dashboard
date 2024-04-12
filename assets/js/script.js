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
  const todaysDate = dayjs();
  const todaysWeather = `Temperature: ${temperature}°C, Wind Speed: ${windSpeed} m/s, Humidity: ${humidity}%`;

  // Selects the elements where the information will be displayed
  const TitleEl = document.getElementById('city-name');
  TitleEl.textContent = cityTitle;

  const dateEl = document.getElementById('todays-date');
  dateEl.textContent = todaysDate;

  const weatherParagraphEl = document.getElementById('todaysResults');
  weatherParagraphEl.textContent = todaysWeather;
}

//event listener on search button that will call getCity function that saves the value to localStorage
searchBtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  getCity();
});
