//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const searchBtnEl = document.getElementById('searchBtn'); //reminder .getElementbyId does not need #
const searchBarEl = document.getElementById('searchBar');
const todayContainerEl = document.getElementById('today-container');
// const userSearchEl = document.getElementById('#user-search').value; - add .value to button event listener so it triggers on click. The value when your page loads is nothing.


const geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q=minneapolis&limit=1&appid=58e024ee1cf018fe40460b065442e140';
//const openWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=58e024ee1cf018fe40460b065442e140`;

//our query needs to be whatever is pased in. I need to convery user search city into lat and lon.



fetch(geoCodeApi) //response ok: true, status: 200 - successfully connects
  .then(function(response) {
      console.log(response);
      return response.json(); 
  })
  .then(function(data) {
      displayLat(data);
      console.log(data);
});


//append to values page check
const cityLatEl = document.querySelector("h1");

function displayLat(dataFromApi) {
    cityLatEl.textContent = dataFromApi[0].lon;
}



//function that saves search value to localStorage
function getCity() {
  let cityArray = JSON.parse(localStorage.getItem('city')) || [];

  const searchValue = document.getElementById('searchBar').value;
  cityArray.push(searchValue);

  localStorage.setItem('city', JSON.stringify(cityArray));
}


//event listener on search button that will call getCity function that saves the value to localStorage
searchBtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  getCity();
});
