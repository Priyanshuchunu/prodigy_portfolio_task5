async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherBox = document.getElementById('weatherResult');

  // Empty input validation
  if (!city) {
    weatherBox.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiKey = '5f2dc16a6d2c82414e728f9d4c96d686';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to fetch weather data.");
    }

    const data = await response.json();
    const { name, main, weather, wind } = data;

    // Display weather information
    weatherBox.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp} °C</p>
      <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
  } catch (error) {
    // Show user-friendly error
    weatherBox.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
