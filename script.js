$(document).ready(function(){
    var queryURL;
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "263bf77c1423fb8b65af30d1f784cb89";
    var cityName = "";
    var forecastDays = 5;

    var searchBtn = $('#search-button');

    searchBtn.on('click', function(event){
        event.preventDefault();
        $("#forecast").empty();
        $("#today").empty();

        forecastDays = 5;
        // Get the value of #search-input
        cityName = $('#search-input').val().trim();
        // Building the URL we need to query the database
        queryURL = apiURL + "q=" + cityName + "&appid=" + apiKey;
        console.log(queryURL)

        fetch(queryURL)
        .then(function(response) {
            return response.json();
        }).then(function(data){
            console.log(data);
        });
    }); 
}); 


