"use strict";
//Getting the map data

var map;
var geocoder;
function InitializeMap(lat,lon) {

    var latlng = new google.maps.LatLng(7.1,79.84);
    var myOptions =
    {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
}

function FindLocaiton(lat,lon) {
    geocoder = new google.maps.Geocoder();
    InitializeMap();

    var address = document.getElementById("addressinput").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

}


window.onload = InitializeMap;

// Taking the current data

const apiKey = "6bac593baa7c4af4b82154952231909";
const apiURL = "http://api.weatherapi.com/v1/current.json?Key=";

const searchTxt = $("#search-bar");
const searchBtn = $("#search-btn");
const weatherIcon = $("#weather-icon");
const searchedCity = $("#searched-city");
const weatherDesc = $(".weather-desc");
const dateAndTime = $(".date-and-time");
const currentTemp = $("#current-temp");
const currentWs = $("#current-ws");
const currentHumidity = $("#current_humidity");

function clicked() {
  $.ajax({
    method: "GET",
    url:
      "http://api.weatherapi.com/v1/current.json?key=" +
      apiKey +
      `&q=${searchTxt.val()}`,
    success: (resp) => {
      FindLocaiton(resp.location.lat,resp.location.lon);
      searchedCity.html(resp.location.name);
      weatherIcon.attr("src", resp.current.condition.icon);
      weatherDesc.html(resp.current.condition.text);
      dateAndTime.html(resp.current.last_updated);
      currentTemp.html(resp.current.temp_c + " °C");
      currentWs.html(resp.current.wind_kph + " kmp/h");
      currentHumidity.html(resp.current.humidity + " %");
    },
  });

  //Weather forcast
  let dayOne = $(".date-1");
  let fIconOne = $(".forcast-day1-icon");
  let fHumidityOne = $(".f-day1-hum");
  let fWsOne = $(".f-day1-ws");

  let dayTwo = $(".date-2");
  let fIconTwo = $(".forcast-day2-icon");
  let fHumidityTwo = $(".f-day2-hum");
  let fWsTwo = $(".f-day2-ws");  
  
  let dayThree = $(".date-3");
  let fIconThree = $(".forcast-day3-icon");
  let fHumidityThree = $(".f-day3-hum");
  let fWsThree = $(".f-day3-ws");

  let aqIndex = $(".air-quality-index");
  let co = $(".co");
  let no2 = $(".no2");
  let o3 = $(".03");
  let so2 = $(".so2");

  $.ajax({
    method: "GET",
    url:
      "http://api.weatherapi.com/v1/forecast.json?&aqi=yes&days=3&key=" +
      apiKey +
      `&q=${searchTxt.val()}`,
    success: (resp) => {
      console.log(resp);
      dayOne.html(resp.forecast.forecastday[0].date);
      fIconOne.attr("src",resp.forecast.forecastday[0].day.condition.icon);
      fHumidityOne.html(resp.forecast.forecastday[0].day.avghumidity + "%");
      fWsOne.html(resp.forecast.forecastday[0].day.maxwind_kph + "km/h");
      
      dayTwo.html(resp.forecast.forecastday[1].date);
      fIconTwo.attr("src",resp.forecast.forecastday[1].day.condition.icon);
      fHumidityTwo.html(resp.forecast.forecastday[1].day.avghumidity + "%");
      fWsTwo.html(resp.forecast.forecastday[1].day.maxwind_kph + "km/h");

      dayThree.html(resp.forecast.forecastday[2].date);
      fIconThree.attr("src",resp.forecast.forecastday[2].day.condition.icon);
      fHumidityThree.html(resp.forecast.forecastday[2].day.avghumidity + "%");
      fWsThree.html(resp.forecast.forecastday[2].day.maxwind_kph + "km/h");

      co.html(resp.current.air_quality.co + " μg/m3");
      no2.html(resp.current.air_quality.no2 + " μg/m3");
      o3.html(resp.current.air_quality.o3 + " μg/m3");
      so2.html(resp.current.air_quality.so2 + " μg/m3");
    },
  });
}
