
var APIKey = "3d44e735d54eb161a90e34a5ec76979e";

var cityArr = [];



function showSavedData() {
    var storeSaveCity = JSON.parse(localStorage.getItem(cityArr));


    if (storeSaveCity !== null) {
        getWeatherTodayButton();
    }


}

//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {
    event.preventDefault();
    getWeatherTodayButton();
    getWeatherForecast(APIKey);
    saveCity();

});


function getWeatherTodayButton() {

    var cityInput = $("#city-input").val();

    getWeatherToday(cityInput, "new");
}

function getWeatherToday(cityInput, callType) {


    //clear for new search result
    $("#weather-result").html("");

    cityArr.push(cityInput);

    // Query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

    var cityLat;
    var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })


        .then(function (response) {


            var currentDate = moment().format('MM/D/YYYY');


            //Create div for weather
            var weatherDiv = $('<div class="weatherdiv">');


            var getIcon = response.weather[0].icon;
            console.log("cek icon", getIcon);

            var iconURL = $('<img>').attr({ "src": "https://openweathermap.org/img/w/" + getIcon + ".png" });


            var city = $("<p>").html("<h3>" + response.name + " (" + currentDate + ")");
            city.append(iconURL);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            $('.temp').html(tempF.toFixed() + "Degree");

            //Store the weather data
            var temp = $('<p>').html("Temperature: " + tempF.toFixed() + "&deg" + "F");

            var wind = $('<p>').text("Wind Speed: " + response.wind.speed + " MPH");

            var humidity = $('<p>').text("Humidity: " + response.main.humidity + "%");



            //var weatherIcon = $("<p>").append(iconURL);



            weatherDiv.append(city, temp, wind, humidity);


            $("#weather-result").prepend(city, temp, humidity, wind);


            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            getUVInd(APIKey, cityLat, cityLon);


            //if button city name already exist
            if (callType == "existing")
                return;

            for (var i = 0; i < city.length; i++) {


                // Then dynamicaly generating buttons for each city in the array
                var a = $("<button>").attr({ "class": "list-group-item list-group-item-action", "id": response.name });

                // Providing the initial button text
                a.text(response.name);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);

                $("#" + response.name).on("click", function (event) {
                    event.preventDefault();

                    var cityName = this.id;

                    getWeatherToday(cityName, "existing");

                });
            }
        })
}



function getUVInd(APIKey, cityLat, cityLon) {

    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;



    $.ajax({
        url: queryURLUV,
        method: "GET"
    })

        .then(function (response) {

            console.log(response);

            //Create div for weather
            var weatherDiv = $('<div class="weatherdiv">');


            var uvInd = $('<p>').html("UV Index: " + "<span class='badge badge-danger p-2'>" + response.value + "</span>");

            weatherDiv.append(uvInd);

            $("#weather-result").append(uvInd);
        })
}

function getWeatherForecast(APIKey) {

    var cityInput = $("#city-input").val();

    //clear for new search result
    $("#weather-forecast").html("");


    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURLFor,
        method: "GET",

    })

        .then(function (response) {


            var getForInfo = response.list;


            //divide by 8 since API updates weather every 3 hours a day
            for (var i = 1; i <= getForInfo.length / 8; i++) {

                var getIcon = getForInfo[i * 7].weather[0].icon;
                console.log(getIcon);


                //get epoch time
                var getForDate = getForInfo[i * 7].dt * 1000;
                var getWeatherDate = new Date(getForDate).getDate();
                var getWeatherMonth = new Date(getForDate).getMonth();
                var getWeatherYear = new Date(getForDate).getFullYear();

                var getForTemp = getForInfo[i * 7].main.temp;
                var getForHum = getForInfo[i * 7].main.humidity;

                console.log("epoch: " + getForDate);
                console.log("Date: " + getWeatherDate);
                console.log("Humidity: " + getForHum);
                console.log("Temperature: " + getForTemp);
                console.log("Humidity: " + getForHum);

                //create card body
                var cardWeather = $('<div>').attr({ "class": "card bg-info shadow m-4 flex-container" });

                var cardBodyWeather = $('<div>').attr({ "class": "card-body" });
                var iconURL = $('<img>').attr({ "src": "https://openweathermap.org/img/w/" + getIcon + ".png" });

                var weatherForDate = $('<p>').html(getWeatherMonth + "/" + getWeatherDate + "/" + getWeatherYear);


                var weatherIcon = $("<p>").append(iconURL);

                var weatherForTemp = $('<p>').html("Temperature: " + getForTemp + "&deg" + "F");
                var weatherForHum = $('<p>').html("Humidity: " + getForHum + "% <br>");


                cardBodyWeather.append(weatherForDate, weatherIcon, weatherForTemp, weatherForHum);

                cardWeather.append(cardBodyWeather);
                $("#weather-forecast").append(cardWeather);


            }


        })

}


function saveCity() {
    localStorage.setItem("citylist", JSON.stringify(cityArr));
}


showSavedData();