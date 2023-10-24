const apiKey = '61347040a749344a97dc531e11ab32fc';

// Function to fetch current weather data
function fetchWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {

      // Extract the city name and country from the response
      const cityName = data.name;
      const country = data.sys.country;

      // Update HTML elements with current weather data
      const today = new Date();
      document.querySelector('.city').textContent = cityName;
      document.querySelector('.country').textContent = country;
      document.querySelector('.today-info h2').textContent = today.toLocaleDateString('en-US', { weekday: 'long' });
      document.querySelector('.today-info span').textContent = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      document.querySelector('.weather-temp').textContent = `${data.main.temp}°C`;
      document.querySelector('.today-weather h3').textContent = data.weather[0].main;

      // Update humidity, precipitation, and wind speed
      document.querySelector('.value.precipitation').textContent = `${data.rain ? data.rain['1h'] : 0} mm`;
      document.querySelector('.value.humidity').textContent = `${data.main.humidity} %`;
      document.querySelector('.value.wind-speed').textContent = `${data.wind.speed} m/s`;

      setWeatherIcon(data.weather[0].main, document.querySelector('.today-weather .bx'));
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
      const forecastList = data.list.slice(1, 6); // Start from the second item to skip the current day
      const daysList = document.querySelectorAll('.days-list li');
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Calculate the current day of the week
      const today = new Date();
      const currentDay = today.getDay();

      // Loop through the forecast days
      forecastList.forEach((forecast, index) => {
        // Calculate the day index for the forecast
        const forecastDayIndex = (currentDay + index + 1) % 7; // +1 to skip the current day

        // Update the day name for each day based on the current day and index
        daysList[index].querySelector('span').textContent = daysOfWeek[forecastDayIndex];
        daysList[index].querySelector('.day-temp').textContent = `${forecast.main.temp}°C`;

        // Set the weather icon for each day
        setWeatherIcon(forecast.weather[0].main, daysList[index].querySelector('i'));
      });
    })
    .catch((error) => {
      console.error('Error fetching weather forecast:', error);
    });
}

function setWeatherIcon(weatherCode, iconElement) {
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
