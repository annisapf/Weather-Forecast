
var APIKey = "3d44e735d54eb161a90e34a5ec76979e";

//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {

    event.preventDefault();

    //clear for new search result
    $("#weather-result").html("");

    var cityInput = $("#city-input").val();

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
            var temp = $("<p>").text("Temperature: " + tempF.toFixed() + " F");

            var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

            var humidity = $("<p>").text("Humidity: " + response.main.humidity);


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
})

function getUVInd(APIKey, cityLat, cityLon) {

    queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;


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

            $("#weather-result").prepend(uvInd);
        })



}