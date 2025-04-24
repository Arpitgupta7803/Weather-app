import React, { useState } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "YOUR_API_KEY_HERE"; // From OpenWeatherMap

  const handleSearch = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        alert(data.message);
        setWeather(null);
      }
    } catch (err) {
      alert("Error fetching weather data");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🌦️ React Weather App</h1>
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temp: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;
