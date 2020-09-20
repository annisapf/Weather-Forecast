
var APIKey = "3d44e735d54eb161a90e34a5ec76979e";




//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {
    getWeatherToday(APIKey);
    getWeatherForecast(APIKey);
});


function getWeatherToday(APIKey) {

    var cityInput = $("#city-input").val();

    //clear for new search result
    $("#weather-result").html("");

    //cityArr.push(cityInput);

    // Query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

    var cityLat;
    var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })


        .then(function (response) {

            console.log(response);


            var currentDate = moment().format('MM/D/YYYY');


            //Create div for weather
            var weatherDiv = $("<div class='weatherdiv'>");


            var city = $("<p>").html("<h3>" + response.name + " (" + currentDate + ")" + '<i class="fas fa-sun"></i></h3>');


            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            $('.temp').html(tempF.toFixed() + "Degree");

            //Store the weather data
            var temp = $("<p>").html("Temperature: " + tempF.toFixed() + "&deg" + "F");

            var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");


            weatherDiv.append(city, temp, wind, humidity);


            $("#weather-result").prepend(city, temp, humidity, wind);


            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            getUVInd(APIKey, cityLat, cityLon);


            for (var i = 0; i < city.length; i++) {

                // Then dynamicaly generating buttons for each movie in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<li>");

                // Providing the initial button text
                a.text(response.name);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
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
            var weatherDiv = $("<div class='weatherdiv'>");


            var uvInd = $("<p>").text("UV Index: " + response.value);

            weatherDiv.append(uvInd);

            $("#weather-result").append(uvInd);
        })
}

function getWeatherForecast(APIKey) {

    var cityInput = $("#city-input").val();

    //clear for new search result
    $("#weather-result").html("");


    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURLFor,
        method: "GET"
    })

        .then(function (response) {

            console.log(response);

            //epoch & unix timestamp conversion tools
            //var getNowTime = new Date();
            //var epoch = getNowTime.getTime();

            //get 5 days forecast
            //var getFirstDay = epoch + (24 * 60 * 60);
            //console.log(epoch);
            //console.log(getFirstDay);

            var getForDate = response.list;

            for (var i = 1; i < getForDate.length; i++) {

                getForDate == getForDate.length[i * 7];
                var getForTemp = getForDate[i * 7].main.temp;
                var getForHum = getForDate[i * 7].main.humidity;

                console.log("Temperature: " + getForTemp);
                console.log("Humidity: " + getForHum);

                var weatherForTemp = $("<p>").html("Temperature: " + getForTemp + "&deg" + "F");
                var weatherForHum = $("<p>").html("Humidity: " + getForHum + "%");



                $("#weather-forecast").append(weatherForTemp, weatherForHum);

            }


        })

}


