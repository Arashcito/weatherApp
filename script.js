let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description'); // Fixed selector
let clouds = document.getElementById('clouds'); // Fixed selector
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');

// API key for OpenWeatherMap
const apiKey = '04df2b48cb363f752d5209b1df24ccf8';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
});

// Function to fetch and display weather data
async function searchWeather() {
    try {
        const cityName = valueSearch.value.trim();

        // Fetch weather data from OpenWeatherMap API
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);

        if (!weatherResponse.ok) {
            throw new Error('City not found or API error');
        }

        const weatherData = await weatherResponse.json();

        // Update UI with weather data
        updateWeatherUI(weatherData);

        // Clear the search input
        valueSearch.value = '';

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not find weather data for that location. Please try again.');
    }
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
    // Update city name country flag
    const countryCode = data.sys.country;
    city.innerHTML = `
        <figcaption>${data.name}</figcaption>
        <img src="https://flagsapi.com/${countryCode}/shiny/32.png" alt="${data.name}">
    `;

    // Update temperature and weather icon
    const weatherIcon = data.weather[0].icon;
    const temp = Math.round(data.main.temp);
    temperature.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="temperature">
        <figcaption>
            <span>${temp}</span>
            <sup>o</sup>
        </figcaption>
    `;

    // Update weather description
    description.textContent = data.weather[0].description;

    // Update weather details
    clouds.textContent = data.clouds.all;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
}

// Optional: Get user's current location weather on page load
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                // Default to a popular city if geolocation fails
                valueSearch.value = 'London';
                searchWeather();
            }
        );
    } else {
        // Geolocation not supported
        valueSearch.value = 'London';
        searchWeather();
    }
});

// Function to fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error('API error');
        }

        const data = await response.json();
        updateWeatherUI(data);

    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        // Fall back to default city
        valueSearch.value = 'London';
        searchWeather();
    }
}