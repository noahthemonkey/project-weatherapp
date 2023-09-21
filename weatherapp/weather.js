// Function to show the loading component
function showLoading() {
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
}

// Function to hide the loading component
function hideLoading() {
  const loading = document.getElementById("loading");
  loading.classList.add("hidden");
}

// Function to fetch weather data and display it on the page
async function getWeatherAndDisplay(apiKey, city) {
  showLoading();

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const data = await response.json();

    // Extract weather information
    const weatherInfo = {
      country: data.location.country,
      cityName: data.location.name,
      localtime: data.location.localtime,
      icon: data.current.condition.icon,
      condition: data.current.condition.text,
      temperatureC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      humidity: data.current.humidity,
      uvIndex: data.current.uv,
      windDirection: data.current.wind_dir,
      windSpeedKph: data.current.wind_kph,
    };

    // Display weather information on the page
    const weatherInfoContainer = document.getElementById("weatherInfo");
    weatherInfoContainer.innerHTML = `
      <h2>${weatherInfo.cityName}, ${weatherInfo.country}</h2>
      <p>Local Time: ${weatherInfo.localtime}</p>
      <img src="${weatherInfo.icon}" alt="${weatherInfo.condition}">
      <p>Condition: ${weatherInfo.condition}</p>
      <p>Temperature: ${weatherInfo.temperatureC}°C</p>
      <p>Feels Like: ${weatherInfo.feelsLikeC}°C</p>
      <p>Humidity: ${weatherInfo.humidity}%</p>
      <p>UV Index: ${weatherInfo.uvIndex}</p>
      <p>Wind: ${weatherInfo.windDirection} at ${weatherInfo.windSpeedKph} km/h</p>
    `;

    hideLoading();
  } catch (error) {
    console.error("Error:", error);
    // Display an error message on the page if needed
    hideLoading();
  }
}

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim(); // Get and clean user input
  if (city) {
    const apiKey = "1f461a6b9ff94ec08be135215231709";
    getWeatherAndDisplay(apiKey, city);
  }
});

// Add an event listener for the "Enter" key in the input field
document.getElementById("cityInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim(); // Get and clean user input
    if (city) {
      const apiKey = "1f461a6b9ff94ec08be135215231709";
      getWeatherAndDisplay(apiKey, city);
    }
  }
});
