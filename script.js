//initial array of cities
var cityArr = [];

//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {

    event.preventDefault();

    //clear for new search result
    $("#weather-result").html("");

    var APIKey = "3d44e735d54eb161a90e34a5ec76979e";

    var cityInput = $("#city-input").val();

    //cityArr.push(cityInput);

    // Query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;
    //var queryURLUV = "https://openweathermap.org/data/2.5/onecall?lat=-33.87&lon=151.21&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02"


    $.ajax({
        url: queryURL,
        method: "GET"
    })

        //$.ajax({
        //url: queryURLUV,
        //method: "GET"
        //})

        //.then(function (response) {

        //var weatherDiv = $("<div class='weatherdiv'>");

        //var uvInd = $("<p>").html(response.current.uvi);

        //weatherDiv.append(uvInd);

        //$("#weather-result").prepend(uvInd);

        //})



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

            //$("#weather-result").empty();

            //$('#weather-result').text(JSON.stringify(response, null, 2));



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