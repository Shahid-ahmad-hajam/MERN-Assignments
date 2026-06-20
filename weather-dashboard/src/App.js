import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "5f9d845ccd12cdae9c09b2a5b02b7f5d"; // 🔴 Replace this

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`,
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🌦 Weather Dashboard</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {/* Loading */}
        {loading && <p className="loading">Loading...</p>}

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Weather Data */}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].main}</p>
            <h3>{weather.main.temp}°C</h3>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
