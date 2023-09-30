"use strict";
//Nav bar
// JavaScript to toggle the mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

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

//Getting the map data
var map = L.map("map-load").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 13,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.watchPosition(success, error);

let marker, circle;

function success(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

  map.fitBounds(circle.getBounds());
}

function error(err) {
  if (err.code === 1) {
    alert("Please allow geolocation access");
  } else {
    alert("Cannot get current location");
  }
}

function clicked() {
  $.ajax({
    method: "GET",
    url:
      "http://api.weatherapi.com/v1/current.json?key=" +
      apiKey +
      `&q=${searchTxt.val()}`,
    success: (resp) => {
      // FindLocaiton(resp.location.lat,resp.location.lon);
      searchedCity.html(resp.location.name);
      weatherIcon.attr("src", resp.current.condition.icon);
      weatherDesc.html(resp.current.condition.text);
      dateAndTime.html(resp.current.last_updated);
      currentTemp.html(resp.current.temp_c + " °C");
      currentWs.html(resp.current.wind_kph + " kmp/h");
      currentHumidity.html(resp.current.humidity + " %");

      // resp.location.lat, resp.location.lon
      getLocation(resp.location.lat, resp.location.lon);
    },
  });

  function getLocation(lat, long) {

    $("#map-load").html("<div id='map' style='width: 100%; height: 100%;'></div>")
    var map = L.map("map").setView([lat, long], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 13,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    var marker = L.marker([lat, long]).addTo(map);
  }

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
  let fIconThree = $(".forcast-day3-icon3");
  let fHumidityThree = $(".f-day3-hum");
  let fWsThree = $(".f-day3-ws");

  let dayFour = $(".date-4");
  let fIconFour = $(".forcast-day4-icon");
  let fHumidityFour = $(".f-day4-hum");
  let fWsFour = $(".f-day4-ws");

  let aqIndex = $(".air-quality-index");
  let co = $(".co");
  let no2 = $(".no2");
  let o3 = $(".03");
  let so2 = $(".so2");

  $.ajax({
    method: "GET",
    url:
      "http://api.weatherapi.com/v1/forecast.json?&aqi=yes&days=5&key=" +
      apiKey +
      `&q=${searchTxt.val()}`,
    success: (resp) => {
      console.log(resp);
      dayOne.html(resp.forecast.forecastday[1].date);
      fIconOne.attr("src", resp.forecast.forecastday[2].day.condition.icon);
      fHumidityOne.html(resp.forecast.forecastday[1].day.avghumidity + "%");
      fWsOne.html(resp.forecast.forecastday[1].day.maxwind_kph + "km/h");

      dayTwo.html(resp.forecast.forecastday[2].date);
      fIconTwo.attr("src", resp.forecast.forecastday[2].day.condition.icon);
      fHumidityTwo.html(resp.forecast.forecastday[2].day.avghumidity + "%");
      fWsTwo.html(resp.forecast.forecastday[2].day.maxwind_kph + "km/h");

      dayThree.html(resp.forecast.forecastday[3].date);
      fIconThree.attr(resp.forecast.forecastday[3].day.condition.icon);
      fHumidityThree.html(resp.forecast.forecastday[3].day.avghumidity + "%");
      fWsThree.html(resp.forecast.forecastday[3].day.maxwind_kph + "km/h");

      dayFour.html(resp.forecast.forecastday[4].date);
      fIconFour.attr("src", resp.forecast.forecastday[4].day.condition.icon);
      fHumidityFour.html(resp.forecast.forecastday[4].day.avghumidity + "%");
      fWsFour.html(resp.forecast.forecastday[4].day.maxwind_kph + "km/h");

      co.html(resp.current.air_quality.co + " μg/m3");
      no2.html(resp.current.air_quality.no2 + " μg/m3");
      o3.html(resp.current.air_quality.o3 + " μg/m3");
      so2.html(resp.current.air_quality.so2 + " μg/m3");
    },
  });

  // History
  var currenDate = new Date();
  console.log(currenDate + " today");

  var yearC = currenDate.getFullYear();
  var monthC = String(currenDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it is zero-based
  var dayC = String(currenDate.getDate()).padStart(2, "0");

  var formattedDateC = yearC + "-" + monthC + "-" + dayC;
  console.log(formattedDateC + " Curr day");

  // Subtract 5 days (5 * 24 * 60 * 60 * 1000 milliseconds) from the current date
  var sevenDaysAgo = new Date(currenDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Extract the year, month, and day components from the sevenDaysAgo date
  var year = sevenDaysAgo.getFullYear();
  var month = String(sevenDaysAgo.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it is zero-based
  var day = String(sevenDaysAgo.getDate()).padStart(2, "0");

  // Create the "yyyy-mm-dd" formatted string
  var formattedDate = year + "-" + month + "-" + day;
  console.log(formattedDate + " 7 days back");

  const dayH1 = $(".day-1");
  const dayH2 = $(".day-2");
  const dayH3 = $(".day-3");
  const dayH4 = $(".day-4");
  const dayH5 = $(".day-5");
  const dayH6 = $(".day-6");
  const dayH7 = $(".day-7");

  const dayH1Icon = $(".day1-h-icon");
  const dayH2Icon = $(".day2-h-icon");
  const dayH3Icon = $(".day3-h-icon");
  const dayH4Icon = $(".day4-h-icon");
  const dayH5Icon = $(".day5-h-icon");
  const dayH6Icon = $(".day6-h-icon");
  const dayH7Icon = $(".day7-h-icon");

  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/history.json?&dt=${formattedDate}&end_dt=${formattedDateC}&key=${apiKey}&q=${searchTxt.val()}`,
    success: (res2) => {
      console.log(res2);

      dayH1.html(res2.forecast.forecastday[0].date);
      dayH2.html(res2.forecast.forecastday[1].date);
      dayH3.html(res2.forecast.forecastday[2].date);
      dayH4.html(res2.forecast.forecastday[3].date);
      dayH5.html(res2.forecast.forecastday[4].date);
      dayH6.html(res2.forecast.forecastday[5].date);
      dayH7.html(res2.forecast.forecastday[6].date);

      dayH1Icon.attr("src", res2.forecast.forecastday[0].day.condition.icon);
      dayH2Icon.attr("src", res2.forecast.forecastday[1].day.condition.icon);
      dayH3Icon.attr("src", res2.forecast.forecastday[2].day.condition.icon);
      dayH4Icon.attr("src", res2.forecast.forecastday[3].day.condition.icon);
      dayH5Icon.attr("src", res2.forecast.forecastday[4].day.condition.icon);
      dayH6Icon.attr("src", res2.forecast.forecastday[5].day.condition.icon);
      dayH7Icon.attr("src", res2.forecast.forecastday[6].day.condition.icon);
    },
  });
}
