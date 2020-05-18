'use strict'

$(".help").click(function(){
  alert("Input a zip code into the form below. Weather information for that zip will be displayed, as well as some recipe ideas based on the weather.");
});


const weatherBaseURL = 'https://api.weather.gov/points/'
const geoBaseURL = `https://open.mapquestapi.com/geocoding/v1/address?key=MCCppEt045mG3EoM97nQbYGGPv5SbKuw&location=`


function getLocInfo(zipInput) {
  fetch(geoBaseURL + zipInput)
    .then(response =>
      response.json().then(data => ({
       
        data: data,
        status: response.status


      })).then(function (getTemp) {
        let latLng = getTemp.data.results[0].locations[0].latLng
        let lat = parseFloat(latLng.lat.toFixed(4))
        let lng = parseFloat(latLng.lng.toFixed(4))

        console.log("getLocInfo")
        console.log(getTemp.status, lat, lng)
        getWeatherFromLatLng(lat, lng)
      }));
}

function getWeatherFromLatLng(lat, lng) {
  let url = `https://api.weather.gov/points/${lat}%2C${lng}`
  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json()}
      else throw new Error ("Sorry, please try a different zip code")
    }).then(getTemp => {
      console.log("getWeatherFromLatLng")
      console.log(getTemp)
      if (getTemp && getTemp.properties && getTemp.properties.forecast) {
        getDetailedForecast(getTemp.properties.forecast)
      }
    })
    .catch(err=>  {  
      $('#js-error-msg').removeClass('hidden');
      $('#js-error-msg').append(`${err.message}`);
      })
    }


function getDetailedForecast(url) {
  fetch(url)
    .then(response => {
      return response.json()
    }).then(getTemp => {
      console.log("getDetailedForecast")
      if (getTemp && getTemp.properties && getTemp.properties.periods && getTemp.properties.periods[0]) {

        console.log(getTemp.properties.periods[0])
        console.log(getTemp.properties.periods[0].temperature)

        let temp = getTemp.properties.periods[0].temperature;
        let food;
        if (temp > 85) {
          food = 'salad'
        } else if (temp <= 84 && temp > 61) {
          food = 'healthy+dinner'
        } else {
          food = 'soup'
        }
        displayWeather(getTemp);

        getSpoon(food);
      }
    })
}


function getSpoon(food) {
  let url = `https://api.spoonacular.com/recipes/random?apiKey=d327b936f3224bd19f8fd19203cfbb64&number=3&tags=${food}`
  fetch(url)
    .then(response => {
      return response.json()
    }).then(res => {
      console.log("getSpoon" + food)
      displayRecipes(res)
    })
}

//this to manage the dom showing weather and forecast
function displayWeather(weatherData) {
  console.log("showing final weather");
  $('#forecast-area').removeClass('hidden');
  $('#forecast-area').append(
    `<h2>Weather Info</h2>
    <h3>${weatherData.properties.periods[0].detailedForecast}</h3>`
  );
}

//this to manage the dom showing weather and forecast
function displayRecipes(recipeData) {
  console.log("showing recipes");
  $('#recipe-area').removeClass('hidden');
  $('#recipe-area').append(
    `<h2>What to Eat</h2>
    <div class="recipe1">
      <h3><a href="${recipeData.recipes[0].sourceUrl}" target="_blank">${recipeData.recipes[0].title}</a>
      <img src="${recipeData.recipes[0].image}" alt="${recipeData.recipes[0].title} image">
      </div><br>

      <div class="recipe2">
      <h3><a href="${recipeData.recipes[1].sourceUrl}" target="_blank">${recipeData.recipes[1].title}</a>
      <img src="${recipeData.recipes[1].image}" alt="${recipeData.recipes[1].title} image">
      </div><br>

      <div class="recipe3">
      <h3><a href="${recipeData.recipes[2].sourceUrl}" target="_blank">${recipeData.recipes[2].title}</a>
      <img src="${recipeData.recipes[2].image}" alt="${recipeData.recipes[2].title} image">
      </div>`
  );
}

$('#newSearch').click(function(){
  $('#Zip-Field').val("");
  $('#recipe-area').empty();
  $('#forecast-area').empty();
  $(window).scrollTop(0); 
})

$('#newSearchbottom').click(function(){
  $('#Zip-Field').val("");
  $('#recipe-area').empty();
  $('#forecast-area').empty();
  $(window).scrollTop(0); 
})

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#recipe-area').empty()
    $('#forecast-area').empty()
    $('#newSearch').removeClass('hidden');
    $('#newSearchbottom').removeClass('hidden');
    const zipInput = $('#Zip-Field').val();
    console.log("submit recorded");
    getLocInfo(zipInput);
  });
}

$(watchForm);

