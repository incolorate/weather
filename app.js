async function getWeather(city) {
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e3674787c6ec0c4c2df46d6a2ee73350&units=metric`;
  let response = await fetch(URL);
  let weatherObject = await response.json();

  // Current Temperature
  let temperature = `${weatherObject.main.temp} °C`;
  console.log(temperature);

  let temperatureFeelsLike = `${weatherObject.main.feels_like} °C`;

  console.log(temperatureFeelsLike);
  console.log(weatherObject);
}

getWeather("London");
