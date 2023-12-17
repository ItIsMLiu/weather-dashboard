$(document).ready(function(){
    var queryURL;
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "263bf77c1423fb8b65af30d1f784cb89";
    var cityName = "";

    var searchBtn = $('#search-button');

    searchBtn.on('click', function(event){
        event.preventDefault();
        $("#forecast").empty();
        $("#today").empty();

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

            var todayList = $("<ul>");
            var today = dayjs();
            var currentCity = $("<li>").text(data.city.name + " - " + data.city.country + " (" + today.format("DD/MM/YYYY") + ")");
            currentCity.addClass('current-city');

            var iconCode = data.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            var iconImg = $("<img>").attr('src', iconURL);
            var currentWeather = $("<li>").text("Current Weather: " + data.list[0].weather[0].description);

            var currentTempC = $("<li>").text("Temp: " + (data.list[0].main.temp - 273.15).toFixed(0) + "°C");
            var currentWindSpeed = $("<li>").text("Wind: " + data.list[0].wind.speed + " KPH");
            var currentHumidity = $("<li>").text("Humidity: " + data.list[0].main.humidity + "%");
            $("#today").append(todayList);
            todayList.append(currentCity, currentWeather, currentTempC, currentWindSpeed, currentHumidity);
            currentWeather.append(iconImg);

            var fiveDay = $("<h5>").text("5-Day Forecast:");
            $("#forecast").append(fiveDay);

            for (let i = 7; i < 41; i += 8) {
                
                let forecastList = $("<ul>");
                forecastList.addClass('col');

                let forecastDate = $("<li>").text(data.list[i].dt_txt);
                
                let forecastIconCode = data.list[i].weather[0].icon;
                let forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIconCode + "@2x.png";
                let forecastIconImg = $("<img>").attr('src', forecastIconURL);
                var forecastWeather = $("<li>");
                forecastWeather.append(forecastIconImg);
                
                let forecastTempC = $("<li>").text("Temp: " + (data.list[i].main.temp - 273.15).toFixed(0) + "°C");
                var forecastWindSpeed = $("<li>").text("Wind: " + data.list[i].wind.speed + " KPH");
                var forecastHumidity = $("<li>").text("Humidity: " + data.list[i].main.humidity + "%");
                $("#forecast").append(forecastList);
                forecastList.append(forecastDate, forecastWeather, forecastTempC, forecastWindSpeed, forecastHumidity);
            }
        });
    }); 
}); 



