//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const searchBtn = document.querySelector('button');
const userSearchEl = document.getElementById('#user-search');
// const userSearchEl = document.getElementById('#user-search').value; - add .value to button event listener so it triggers on click. The value when your page loads is nothing.
const todayContainerEl = document.getElementById('#today-container');


const geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q=minneapolis&limit=1&appid=58e024ee1cf018fe40460b065442e140';
//this will give the .lat and .lon of the searched.
//I want to have the user type in a city, instert city name intogeoCodeApi
//submit the form and capture the value


//const openWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=58e024ee1cf018fe40460b065442e140`;
//our query needs to be whatever is pased in. I need to convery user search city into lat and lon.


const cityLatEl = document.querySelector("h1");

function displayLat(dataFromApi) {
    cityLatEl.textContent = dataFromApi[0].lat;
}

// function getCity(userSearchValue) {  }


    fetch(geoCodeApi) //response ok: true, status: 200
        .then(function(response) {
            console.log(response);
            return response.json(); 
        })
        .then(function(data) {
            displayLat(data);
            console.log(data);





            //create a html tag and populate it with what comes back from the url
            // const pEl = document.createElement('p');
            // pEl.setAttribute("src", data.photos[0].src.large); //picture

            // const imgLabelEl = document.createElement("h3");
            // imgLabelEl.textContent = data.photos[0].alt;

            // todayContainerEl.append(pEl);
            // todayContainerEl.append(imgLabelEl);

});




//The trim() method removes whitespace from both sides of a string.
searchBtn.addEventListener('click', function() {
    const userSearchValue = userSearchEl.value.trim();

    //check, does this have something in it?
    if (userSearchValue) {
        //if there is something there, clear it out to keep it from appending
        userSearchEl.textContent = "";
        getCity(userSearchValue)

    }
})








