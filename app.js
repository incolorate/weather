// Temperature div
let temperatureDiv = document.querySelector("#temperature");
// Current Weather image
let imageDiv = document.querySelector("#weather-image");

// Current weather
async function getWeather(city) {
  temperatureDiv.innerHTML = "";
  imageDiv.innerHTML = "";
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e3674787c6ec0c4c2df46d6a2ee73350&units=metric`;
  let response = await fetch(URL);
  let weatherObject = await response.json();

  // Error text
  try {
    //this way you can catch error and dsplay them to really know why the api call failed
    if (weatherObject.cod != 200) throw "error";
  } catch (error) {
    getWeather("Oradea");
    alert("Invalid city name");
  }

  let temperature = `Temperature: ${weatherObject.main.temp} °C`;
  let temperatureFeelsLike = `Feels like: ${weatherObject.main.feels_like} °C`;

  //  Weather description
  let weatherDescription = weatherObject.weather[0].description;

  // Necessary html elements
  let pText = document.createElement("p");
  let pText2 = document.createElement("p");
  let pText3 = document.createElement("p");
  let pText4 = document.createElement("p");
  let weatherImg = document.createElement("img");

  //Set value the value of the elements
  pText.innerText = temperature;
  pText2.innerText = temperatureFeelsLike;
  pText3.innerText = `City: ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  pText4.innerText = `${
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
  }`;
  weatherImg.src = `./img/${weatherDescription}.svg`;

  // Classes
  weatherImg.classList.add("current-weather");

  // Append
  temperatureDiv.appendChild(pText3);
  temperatureDiv.appendChild(pText2);
  temperatureDiv.appendChild(pText);
  imageDiv.appendChild(weatherImg);
  imageDiv.appendChild(pText4);
}

// Forecast weather
async function getForecast(city) {
  let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=e3674787c6ec0c4c2df46d6a2ee73350&units=metric`;
  let response = await fetch(URL);
  let weatherObject = await response.json();
  // date when searching
  let currentDay = weatherObject.list[0].dt_txt.split(" ")[0];
  console.log();
  //Today's forecast div
  let todayForecast = document.querySelector("#forecast");
  todayForecast.innerHTML = "";
  // 5 day forecast div
  let dayForecast = document.querySelector("#day-forecast");
  dayForecast.innerHTML = "";

  // Generate forecast
  for (let i = 0; i < weatherObject.list.length; i++) {
    let currentDate = weatherObject.list[i].dt_txt;
    currentDate = currentDate.split(" ");
    let day = currentDate[0];
    let hour = currentDate[1];
    // Generate 5 day forecast
    if (hour === "15:00:00") {
      //  Calculate the day based on the date
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const d = new Date(day);
      let dayName = weekday[d.getDay()];

      // Create elements
      let div = document.createElement("div");
      let pText = document.createElement("p");
      let pText2 = document.createElement("p");
      let smallWeatherImg = document.createElement("img");
      let weatherDescription = weatherObject.list[i].weather[0].description;
      // Element content
      smallWeatherImg.src = `./img/${weatherDescription}.svg`;
      pText.innerText = `${weatherObject.list[i].main.temp} °C `;
      pText2.innerText = dayName;

      div.appendChild(pText2);
      div.appendChild(smallWeatherImg);
      div.appendChild(pText);
      dayForecast.appendChild(div);
    }
    // Generate Today's forecast
    if (day === currentDay) {
      // Create elements
      let div = document.createElement("div");
      let pText = document.createElement("p");
      let pText2 = document.createElement("p");
      let smallWeatherImg = document.createElement("img");
      let weatherDescription = weatherObject.list[i].weather[0].description;
      // Element content
      smallWeatherImg.src = `./img/${weatherDescription}.svg`;
      pText.innerText = `${weatherObject.list[i].main.temp} °C `;
      pText2.innerText = hour.substr(0, 5);

      div.appendChild(pText2);
      div.appendChild(smallWeatherImg);
      div.appendChild(pText);
      todayForecast.appendChild(div);
    }
  }

  // Get date format in an array  year-month-day format and hour:min:sec format
}

// Search
let searchBar = document.querySelector("#search-bar");
function searchCity() {
  getWeather(`${searchBar.value}`);
  getForecast(`${searchBar.value}`);
}

//Search bar-functionality
document
  .querySelector("#magnifying-glass")
  .addEventListener("click", searchCity);

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
});

// Default
document.addEventListener("onload", getWeather("Oradea"));
document.addEventListener("onload", getForecast("Oradea"));
