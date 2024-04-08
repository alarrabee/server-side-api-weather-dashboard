
const searchBtn = document.querySelector('button');
const userSearchEl = document.getElementById('#user-search');
// const userSearchEl = document.getElementById('#user-search').value; - add .value to button event listener so it triggers on click. The value when your page loads is nothing.
const todayContainerEl = document.getElementById('#today-container');


//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

function getCity(userSearchValue) {

    //const openWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=58e024ee1cf018fe40460b065442e140`;
    //our query needs to be whatever is pased in. I need to convery user search city into lat and lon.


    fetch(openWeatherApi)
        .then(function(response) {
            console.log(response);
            return response.json();
            
        })
        .then(function(data) {

            //create a html tag and populate it with what comes back from the url
            const pEl = document.createElement('p');
            pEl.setAttribute("src", data.photos[0].src.large); //picture

            const imgLabelEl = document.createElement("h3");
            imgLabelEl.textContent = data.photos[0].alt;

            todayContainerEl.append(pEl);
            todayContainerEl.append(imgLabelEl);

            console.log(data);
});
}



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

//if there is something in there lets clear it out. 