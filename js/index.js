"use strict";

// Taking the current data

const apiKey = "6bac593baa7c4af4b82154952231909";
const apiURL = "http://api.weatherapi.com/v1/current.json?Key="

const searchTxt = $("#search-bar");
const searchBtn = $("#search-btn");
const weatherIcon = $("#weather-icon");
const searchedCity = $("#searched-city");
const weatherDesc = $(".weather-desc");
const dateAndTime = $(".date-and-time");
const currentTemp = $("#current-temp");
const currentWs = $("#current-ws");
const currentHumidity = $("#current_humidity");

function clicked(){
    $.ajax({
        method : "GET",
        url: "http://api.weatherapi.com/v1/current.json?key=" + apiKey + `&q=${searchTxt.val()}`,
        success : (resp) => {
           console.log(resp);
           searchedCity.html(resp.location.name);
           weatherIcon.attr("src",resp.current.condition.icon);
           weatherDesc.html(resp.current.condition.text);   
           dateAndTime.html(resp.current.last_updated);
           currentTemp.html(resp.current.temp_c + " °C");
           currentWs.html(resp.current.wind_kph + " kmp/h");
           currentHumidity.html(resp.current.humidity + " %");
        }
     });
}