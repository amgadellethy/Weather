// * HTML Element
const searchInput = document.querySelector(".city .search-input input");
const findButton = document.querySelector(".city button");
const weatherContainer = document.querySelector(".weather_container");

// console.log(weatherContainer);

// * App Variables
var lat;
var lng;
// * Functions
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    getData(` https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);


    console.log(` https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
    console.log(lat, lng);

 }, (error) => {
  console.log(error.message);
})



async function getData(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9021404a4fb34eacbdb212918242503&q=${country}&days=3`
  );
  // console.log(response);
  let data = await response.json();

  // console.log(data);


  displayData(data);
}


function displayData(arr) {


  // console.log(arr)
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateNow = new Date(arr.forecast.forecastday[0].date);
  let currentDay = days[dateNow.getDay()];
  let currentMonth = months[dateNow.getMonth()];
  let currentDayNumber = dateNow.getDate();


  weatherContainer.innerHTML = `
    <div class="row g-0 ">
        <div class="col-lg-4 col-12 wbg">         
            <div class="weather-content ">
              <div
                class="weather-date d-flex align-items-center justify-content-between "
              >
                <p class="current-day m-0">${currentDay}</p>
                <p class="current-date m-0">${currentDayNumber}${currentMonth}</p>
              </div>
              <div class="weather-main">
                <p class="h5 fw-normal wcolor">${arr.location.name}</p>
                <div class="weather-head d-flex align-items-center justify-content-between">
                    <h2 class="main-head">${
                      arr.forecast.forecastday[0].day.maxtemp_c
                    } <span>o</span>C</h2>
                    <img src="${
                      arr.forecast.forecastday[0].day.condition.icon
                    }" alt="" />
                </div>
                <p class="patchy">${
                  arr.forecast.forecastday[0].day.condition.text
                }</p>
              </div>
              <div class="weather-info d-flex align-items-center gap-3">
                <div class="weather-group d-flex align-items-center gap-2">
                  <img src="./imgs/icon-umberella.png" alt="" />
                  <span>${
                    arr.forecast.forecastday[0].day.daily_chance_of_rain
                  }%</span>
                </div>
                <div class="weather-group d-flex align-items-center gap-2">
                  <img src="./imgs/icon-wind.png" alt="" />
                  <span>${
                    arr.forecast.forecastday[0].day.maxwind_kph
                  }km/h</span>
                </div>
                <div class="weather-group d-flex align-items-center gap-2">
                  <img src="./imgs/icon-compass.png" alt="" />
                  <span>East</span>
                </div>
              </div>
            
          </div>
        </div>
        <div class="col-lg-4 col-12 dbg">         
            <div class="weather-content dbg">
            <div class="weather-date text-center ">
                <p class="current-day m-0">${days[dateNow.getDay() + 1]}</p>
            </div>
            <div class="weather-main text-center dbg pt-5">
                <img class="img2" src="${
                  arr.forecast.forecastday[1].day.condition.icon
                }" alt="">
                <p class="fw-bold h5 mt-3">${
                  arr.forecast.forecastday[1].day.maxtemp_c
                } <sup class="zero1">o</sup> <span class="ms-2">C</span></p>
                <p class="wcolor">${
                  arr.forecast.forecastday[1].day.mintemp_c
                } <span class="zero2">o</span></p>
                <p class="patchy">${
                  arr.forecast.forecastday[1].day.condition.text
                }</p>
            </div>
                     
        </div>
      </div>
        <div class="col-lg-4 col-12 wbg">
          
            <div class="weather-content">
            <div class="weather-date text-center">
                <p class="current-day m-0">${days[dateNow.getDay() + 2]}</p>
            </div>
            <div class="weather-main text-center mt-4">
                <img class="img2" src="${
                  arr.forecast.forecastday[2].day.condition.icon
                }" alt="">
                <p class="fw-bold h5 mt-3">${
                  arr.forecast.forecastday[2].day.maxtemp_c
                }<sup class="zero1">o</sup> <span class="ms-2">C</span></p>
                <p class="wcolor w-auto">${
                  arr.forecast.forecastday[2].day.mintemp_c
                }<span class="zero2">o</span></p>
                <p class="patchy">${
                  arr.forecast.forecastday[2].day.condition.text
                }</p>
            </div>
            
        </div>
      </div>
      </div>
      `;
}

// * Events
searchInput.addEventListener("input", function () {
  getData(searchInput.value);
});
findButton.addEventListener("click", function () {
  getData(searchInput.value);
})







