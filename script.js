let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('description');
let clouds = document.getElementById('.clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
})
