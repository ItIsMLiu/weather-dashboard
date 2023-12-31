$(document).ready(function(){
    // Global variables
    let queryURL;
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    let apiKey = "263bf77c1423fb8b65af30d1f784cb89";
    let cityName = "";

    let searchBtn = $('#search-button');

    let searchHistory = [];

    // Function to get today's weather
    function todayWeather(data) {
        let todayList = $("<ul>");
        let today = dayjs();
        let currentCity = $("<li>").text(data.city.name + " - " + data.city.country + " (" + today.format("DD/MM/YYYY") + ")");
        currentCity.addClass('current-city');

        let iconCode = data.list[0].weather[0].icon;
        let iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        let iconImg = $("<img>").attr('src', iconURL);
        let currentWeather = $("<li>").text("Current Weather: " + data.list[0].weather[0].description);

        let currentTempC = $("<li>").text("Temp: " + (data.list[0].main.temp - 273.15).toFixed(0) + "°C");
        let currentWindSpeed = $("<li>").text("Wind: " + data.list[0].wind.speed + " KPH");
        let currentHumidity = $("<li>").text("Humidity: " + data.list[0].main.humidity + "%");
        $("#today").append(todayList);
        todayList.append(currentCity, currentWeather, currentTempC, currentWindSpeed, currentHumidity);
        currentWeather.append(iconImg);
    }

    // Function to get next 5 days' weather
    function forecastWeather(data) {
        let fiveDay = $("<h5>").text("5-Day Forecast:");
        $("#forecast").append(fiveDay);

        for (let i = 7; i < 41; i += 8) {
            
            let forecastList = $("<ul>");
            forecastList.addClass('col');

            let forecastDate = $("<li>").text(data.list[i].dt_txt);
            
            let forecastIconCode = data.list[i].weather[0].icon;
            let forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIconCode + "@2x.png";
            let forecastIconImg = $("<img>").attr('src', forecastIconURL);
            var forecastIconLi = $("<li>");
            forecastIconLi.append(forecastIconImg);
            
            let forecastTempC = $("<li>").text("Temp: " + (data.list[i].main.temp - 273.15).toFixed(0) + "°C");
            let forecastWindSpeed = $("<li>").text("Wind: " + data.list[i].wind.speed + " KPH");
            let forecastHumidity = $("<li>").text("Humidity: " + data.list[i].main.humidity + "%");
            $("#forecast").append(forecastList);
            forecastList.append(forecastDate, forecastIconLi, forecastTempC, forecastWindSpeed, forecastHumidity);
        }
    }

    // Function to render buttons
    function renderBtns() {
        let historyDiv = $("#history");
        historyDiv.empty();
        for (let i = 0; i < searchHistory.length; i++) {
            let historyBtn = $("<button>");
            historyBtn.addClass("btn btn-secondary citiesBtn");
            historyBtn.attr("data-name", searchHistory[i]);
            historyBtn.text(searchHistory[i]);
            historyDiv.prepend(historyBtn); 
        }
    }

    // Function to fetch and display weather info
    function displayWeatherInfo() {
        // Building the URL we need to query the database
        queryURL = apiURL + "q=" + cityName + "&appid=" + apiKey;
        console.log(queryURL)

        fetch(queryURL)
            .then(function(response) {
                return response.json();
            }).then(function(data){
                console.log(data);

                todayWeather(data);
                forecastWeather(data);
                renderBtns();
            });
    }

    function storeHistory() {
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    function init() {
        let storeHistory = JSON.parse(localStorage.getItem('searchHistory'));
        if (storeHistory !== null) {
            searchHistory = storeHistory;
            displayWeatherInfo(cityName = searchHistory[searchHistory.length-1]);
        }
    }

    init();

    // Search Button when clicked ...
    searchBtn.on('click', function(event){
        event.preventDefault();

        // Clear previous search result
        $("#today").empty();
        $("#forecast").empty();
        
        // Get the value of #search-input
        cityName = $('#search-input').val().trim();
        if (cityName !== '') {
            searchHistory.push(cityName);
            storeHistory();
            displayWeatherInfo();
        }
    }); 

    // When saved city buttons is clicked ...
    $(document).on("click", ".citiesBtn", function(event) {
        let element = event.target;
        cityName = element.getAttribute("data-name");
        
        // Clear previous search result
        $("#today").empty();
        $("#forecast").empty();

        displayWeatherInfo()
    });
}); 



