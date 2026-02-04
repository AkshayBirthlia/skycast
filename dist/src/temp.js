//variable
let city = 'abohar';
let country = 'india';
let promiseForecast = [];

//buttons
const button = document.getElementById("locationBtn");


setTimeout(async () => {
    const promise = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfa41be7acd54a7f9fd80300262101&q=${city}&aqi=yes&days=12`);
    promiseForecast = await promise.json();
    document.querySelector('#time').textContent = promiseForecast.location.localtime;
    updateDetails(city);
    console.log(promiseForecast);

    todayFxn();

}, 100);

//update Details
async function updateDetails(cityName) {
    city = cityName;
    const promise = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfa41be7acd54a7f9fd80300262101&q=${city}&aqi=yes&days=12`);
    promiseForecast = await promise.json();

    let pinLocation = document.getElementById('pinLocation');
    pinLocation.textContent = city + ' , ' + country;
    todayFxn();

    //update details of Current Weather
    //img updated here ----
    if (promiseForecast.current.condition.text === 'Clear' || promiseForecast.current.condition.text === 'Sunny') {
        document.querySelector('.imgSize1').src = "./assets/img/sun.png";
    }
    else if (promiseForecast.current.condition.text === 'Overcast' || promiseForecast.current.condition.text === 'Mostly Cloudy' || promiseForecast.current.condition.text === 'Cloudy') {
        document.querySelector('.imgSize1').src = "./assets/img/sun-behind-cloud.png";
    }
    else if (promiseForecast.current.condition.text === 'Partly Cloudy' || promiseForecast.current.condition.text === 'Mist' || promiseForecast.current.condition.text === 'Fog' || promiseForecast.current.condition.text === 'Haze' || promiseForecast.current.condition.text === 'Smoke' || promiseForecast.current.condition.text === 'Dust') {
        document.querySelector('.imgSize1').src = "./assets/img/sun-cloud.png";
    }
    else if (promiseForecast.current.condition.text === 'Drizzle' || promiseForecast.current.condition.text === 'Light Rain' || promiseForecast.current.condition.text === 'Moderate Rain' || promiseForecast.current.condition.text === 'Heavy Rain' || promiseForecast.current.condition.text === 'Patchy Rain') {
        document.querySelector('.imgSize1').src = "./assets/img/sun-rain.png";
    }
    else if (promiseForecast.current.condition.text === 'Thunderstorm' || promiseForecast.current.condition.text === 'Thunderstorm with Rain' || promiseForecast.current.condition.text === 'Thunderstorm with Hail') {
        document.querySelector('.imgSize1').src = "./assets/img/thunder-rain.png";
    }

    document.querySelector('#clock').innerHTML = `<h4 id="clock">${promiseForecast.current.temp_f} <sup>o</sup>F</h4>`;
    document.querySelector('#conditionTxt').textContent = promiseForecast.current.condition.text;
    document.querySelector('#feelsLike').innerHTML = 'feels like ' + promiseForecast.current.feelslike_c + '<sup>o</sup>C';

    // Updation of Cloud
    document.querySelector('#cloud').textContent = promiseForecast.current.cloud;
    // Updation of Wind
    document.querySelector('#wind').textContent = promiseForecast.current.wind_kph;
    // Updation of Humidity
    document.querySelector('#humidity').textContent = promiseForecast.current.humidity;
    // Updation of Humidity
    document.querySelector('#uv').textContent = promiseForecast.current.uv;

    // Updation of rain in mm
    document.querySelector('#rainMm').textContent = promiseForecast.current.precip_mm;
    // Updation of Air Pressure
    document.querySelector('#airPressure').textContent = promiseForecast.current.pressure_mb;

    //update summary
    document.querySelector('#sunRiseTime').textContent = promiseForecast.forecast.forecastday[0].astro.sunrise;

    document.querySelector('#sunSetTime').textContent = promiseForecast.forecast.forecastday[0].astro.sunset;

    document.querySelector('#moonRiseTime').textContent = promiseForecast.forecast.forecastday[0].astro.moonrise;

    document.querySelector('#moonSetTime').textContent = promiseForecast.forecast.forecastday[0].astro.moonset;
    //time update
    document.querySelector('#time').textContent = promiseForecast.location.localtime;

}
//current position fetch
button.addEventListener("click", async () => {
    const currentPosition = navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log(navigator.geolocation.getCurrentPosition);
            const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=cfa41be7acd54a7f9fd80300262101&q=${lat},${lng}&aqi=yes`);
            const data = await promise.json();

            city = data.location.name;
            country = data.location.country;
            updateDetails(city);
        },
        () => {
            console.log("Error occured");
        },
    );
});

//table data of today in hour
let today = document.querySelector("#today");
today.addEventListener("click", () => {
    todayFxn();
});
function todayFxn() {
    document.querySelector("#days").style.backgroundColor = "rgb(216, 237, 237)";
    document.querySelector("#today").style.backgroundColor = "#cbf1f5";
    let table = document.querySelector("#tableId");
    table.innerHTML = ` <tr>
          <th id="tbTh1">Time</th>
          <th id="tbTh2">Weather</th>
          <th id="tbTh3">Temp :</th>
        </tr>`;
    for (let index = 0; index < 12; index++) {
        let tablerow = document.createElement("tr");
        let tabledata1 = document.createElement("td");
        let tabledata2 = document.createElement("td");
        let tabledata3 = document.createElement("td");
        tabledata1.textContent = index * 2 + ":" + "00";
        tabledata2.textContent = promiseForecast.forecast.forecastday[0].hour[index * 2].condition.text;
        tabledata3.textContent = promiseForecast.forecast.forecastday[0].hour[index * 2].temp_c;
        tablerow.append(tabledata1);
        tablerow.append(tabledata2);
        tablerow.append(tabledata3);
        table.append(tablerow);
    }
};



// table data of next days
let days = document.querySelector("#days");
days.addEventListener("click", () => {
    let table = document.querySelector("#tableId");
    document.querySelector("#days").style.backgroundColor = "#cbf1f5";
    document.querySelector("#today").style.backgroundColor = "rgb(216, 237, 237)";


    table.innerHTML = ` <tr>
          <th id="tbTh1">Time</th>
          <th id="tbTh2">Weather</th>
          <th id="tbTh3">Temp :</th>
        </tr>`;
    for (let index = 0; index < 12; index++) {
        let tablerow = document.createElement("tr");
        let tabledata1 = document.createElement("td");
        let tabledata2 = document.createElement("td");
        let tabledata3 = document.createElement("td");
        if (promiseForecast.forecast.forecastday.length == 3 && index > 2) {

            tabledata1.textContent = "-";
            tabledata2.textContent = "-";
            tabledata3.textContent = "-";
        }
        else {
            tabledata1.textContent = promiseForecast.forecast.forecastday[index].date;
            tabledata2.textContent = promiseForecast.forecast.forecastday[index].day.condition.text;
            tabledata3.textContent = promiseForecast.forecast.forecastday[index].day.avgtemp_c;
        }
        tablerow.append(tabledata1);
        tablerow.append(tabledata2);
        tablerow.append(tabledata3);
        table.append(tablerow);
    }
});
// search location
const input = document.querySelector("#inputSearch");
input.addEventListener('keydown', (enter) => {
    let cityName = input.value.toLowerCase();
    if (cityName === "") return;
    if (enter.key == "Enter")
        updateDetails(cityName);
});