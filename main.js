     const apiKey = '305ed99d42965d6c3750b76aa04a84de'; 
        const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
        const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';

        async function getWeather() {
            const cityInput = document.getElementById('cityInput');
            const city = cityInput.value.trim();

            if (city === '') {
                alert('Please enter a city name');
                return;
            }

            try {
                const weatherResponse = await fetch(`${weatherApiUrl}${city}&appid=${apiKey}`);
                const forecastResponse = await fetch(`${forecastApiUrl}${city}&appid=${apiKey}`);

                if (!weatherResponse.ok) {
                    throw new Error('City not found');
                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();

                displayWeather(weatherData);
                displayForecast(forecastData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            }
        }

        function displayWeather(data) {
            document.getElementById('cityName').innerText = data.name || '--';
            document.getElementById('temp').innerText = Math.round(data.main.temp) || '--';
            document.getElementById('weatherDesc').innerText = data.weather[0]?.description || '--';
            document.getElementById('humidity').innerText = data.main.humidity || '--';
            document.getElementById('windSpeed').innerText = Math.round(data.wind.speed * 3.6) || '--'; // Convert m/s to km/h
        }

        function displayForecast(data) {
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = ''; // Clear previous forecast

            const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

            dailyData.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
                const temp = Math.round(day.main.temp) + '°C';

                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
                    <div>${date}</div>
                    <div>${temp}</div>
                `;

                forecastContainer.appendChild(forecastItem);
            });
        }