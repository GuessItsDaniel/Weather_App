const apiKey = '61347040a749344a97dc531e11ab32fc';

// Function to fetch current weather data
function fetchWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update HTML elements with current weather data
      const today = new Date();
      document.querySelector('.today-info h2').textContent = today.toLocaleDateString('en-US', { weekday: 'long' });
      document.querySelector('.today-info span').textContent = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      document.querySelector('.weather-temp').textContent = `${data.main.temp}°C`;
      document.querySelector('.today-weather h3').textContent = data.weather[0].main;

      // Update humidity, precipitation, and wind speed
      document.querySelector('.value.precipitation').textContent = `${data.rain ? data.rain['1h'] : 0} mm`;
      document.querySelector('.value.humidity').textContent = `${data.main.humidity} %`;
      document.querySelector('.value.wind-speed').textContent = `${data.wind.speed} m/s`;

      setWeatherIcon(data.weather[0].main)

    })
    .catch((error) => {
      console.error('Error fetching current weather data:', error);
    });
}

// Function to fetch 5-day weather forecast
function fetchWeatherForecast(city) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update 5-day weather forecast
      const forecastList = data.list.slice(0, 5); // Get the first 5 days
      const daysList = document.querySelectorAll('.days-list li');
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Calculate offset between current day of week and first day of forecast
      const today = new Date();
      const forecastStartDay = new Date(forecastList[0].dt_txt);
      const offset = today.getDay() - forecastStartDay.getDay();


      for (let i = 0; i < daysList.length; i++) {
      const dayOfWeek = daysOfWeek[i];
      daysList[i].querySelector('span').textContent = dayOfWeek;
      }

      forecastList.forEach((forecast, index) => {
        daysList[index].querySelector('.day-temp').textContent = `${forecast.main.temp}°C`;
      });
    })
    .catch((error) => {
      console.error('Error fetching weather forecast:', error);
    });
}

function setWeatherIcon(weatherCode) {
   const iconElement = document.querySelector('.today-weather .bx');
 
   switch (weatherCode) {
     case 'Clear':
       iconElement.className = 'bx bx-sun';
       break;
     case 'Clouds':
       iconElement.className = 'bx bx-cloud';
       break;
     case 'Rain':
       iconElement.className = 'bx bx-cloud-light-rain';
       break;
     case 'Snow':
       iconElement.className = 'bx bx-cloud-drizzle';
       break;
     // Add more cases for other weather conditions
     default:
       iconElement.className = 'bx bx-question-mark'; // Default icon for unknown weather
   }
 }

// Function to search for a location
function searchLocation() {
  const city = document.querySelector('#search-input').value;
  fetchWeatherData(city);
  fetchWeatherForecast(city);
}

// Initial data load (You can specify a default city)
fetchWeatherData('Paris');
fetchWeatherForecast('Paris');
