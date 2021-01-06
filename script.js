//

//

//

//

// - - - - -  WEATHER API - - - - - //

// CUANDO PULSO EL BOTÓN //

document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault();
  var city = document.querySelector("#search").value;

  // ya tengo el dato que está dentro del buscador.
  // Ahora ese dato lo aplico a la api url y al resto de cosas.
  // TODO EMPIEZA CUANDO PULSO EL BOTÓN DE SUBMIT DEL FORMULARIO

  var apiKey = "36c8bd885e1b84703cd48d295c95399d";
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}`;

  function showWeather(response) {
    console.log(response.data);
    var title = document.querySelector("#title");
    var temperature = document.querySelector("#temperature");
    var max = document.querySelector("#max");
    var min = document.querySelector("#min");
    var description = document.querySelector("#description");
    temperature.innerHTML = `${response.data.main.temp}ºC`;
    max.innerHTML = `${response.data.main.temp_max}ºC`;
    min.innerHTML = `${response.data.main.temp_min}ºC`;
    description.innerHTML = `${response.data.weather[0].description}`;

    title.innerHTML = `This is the weather in ${response.data.name}`;
  }

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showWeather);
});

//

//

//

//

// - - - - -  GEOLOCATION - - - - - //

function getPosition(position) {
  console.log(position);
  var text = document.querySelector("#location");
  text.style.color = "black";
  text.innerHTML = `Latitude: ${position.coords.latitude}  |  Longitude: ${position.coords.longitude}`;
  var lat = `${position.coords.latitude}`;
  var lon = `${position.coords.longitude}`;

  // hago esto para "conectar" geolocation con weather...
  function currentLocation(result) {
    console.log(result);
    var geoCity = document.querySelector("#geoCity");
    var geoTemp = document.querySelector("#geoTemp");
    var geoMax = document.querySelector("#geoMax");
    var geoMin = document.querySelector("#geoMin");
    var geoDescription = document.querySelector("#geoDescription");
    geoCity.innerHTML = `${result.data.name}`;
    geoTemp.innerHTML = `${result.data.main.temp}`;
    geoMax.innerHTML = `${result.data.main.temp_max}`;
    geoMax.style.color = "red";
    geoMin.innerHTML = `${result.data.main.temp_min}`;
    geoMin.style.color = "blue";
    geoDescription.innerHTML = `${result.data.weather[0].description}`;
  }
  var apiKey = "36c8bd885e1b84703cd48d295c95399d";
  var geoapi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(geoapi).then(currentLocation);
}

var btn = document.querySelector("button");

btn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getPosition);
});
