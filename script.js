$(document).ready(function(){
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "263bf77c1423fb8b65af30d1f784cb89";
    var cityName ="";
    var queryURL;
    var forecastDays = 5;

    var searchBtn = $('#search-button');

    searchBtn.on('click', function(event){
        event.preventDefault();
        // Get the value of #search-input
        cityName = $('#search-input').val().trim();
        console.log(cityName);

        // Building the URL we need to query the database
        queryURL = apiURL + "q=" + cityName + "&appid=" + apiKey;
        console.log(queryURL)
    }) 
}) 


