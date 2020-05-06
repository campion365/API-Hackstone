'use strict'

const weatherBaseURL = 'https://api.weather.gov/points/'

const geoBaseURL = `http://open.mapquestapi.com/geocoding/v1/address?key=MCCppEt045mG3EoM97nQbYGGPv5SbKuw&location=`

function getLocInfo(zipInput){
    fetch(geoBaseURL+zipInput) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
   
});
 console.log (getLocInfo());
}


//code taken from a different project - was planning to adapt it to this one, but long ways away from figuring that 
//part out yet...


// function displayResults(responseJson) {
//     console.log(responseJson);
//     $('#results').empty();
//     for (let i = 0; i < responseJson.results.locations.length; i++) {
//       $('#results').append(
//         `<li><h3>${responseJson.data[i].fullName}</h3>
//         <p>${responseJson.data[i].description}</p>
//         <a href='${responseJson.data[i].url}' target= "_blank">Website</a>
//         </li>`
//       )
//     };
//     $('#results').removeClass('hidden');
//   };

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const zipInput = $('#Zip-Field').val();
      console.log("submit recorded");
      getLocInfo(zipInput);
    });
  
  }
  
  $(watchForm);