import React from 'react';
import { useLocation } from 'react-router-dom';

const WeatherInfo = () => {
  const location = useLocation();
  const weatherData = location.state?.weatherData;

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  const { currentWeather, forecast } = weatherData;
  
  if (!currentWeather) {
    return <div>No current weather data available.</div>;
  }

  return (
    <div className="WeatherInfo">
      <h1>{weatherData.locationName}</h1>
      <div>
        <h2>Current Weather</h2>
        <p>Temperature: {currentWeather.temperature ? `${currentWeather.temperature}°C` : 'N/A'}</p>
        <p>Humidity: {currentWeather.humidity ? `${currentWeather.humidity}%` : 'N/A'}</p>
        <p>Wind Speed: {currentWeather.windSpeed ? `${currentWeather.windSpeed} m/s` : 'N/A'}</p>
        <p>Condition: {currentWeather.condition || 'N/A'}</p>
      </div>

      <div>
        <h2>Forecast</h2>
        {forecast.length > 0 ? (
          forecast.map((forecastItem, index) => (
            <div key={index}>
              <p>Date: {forecastItem.date || 'N/A'}</p>
              <p>Temperature: {forecastItem.temperature ? `${forecastItem.temperature}°C` : 'N/A'}</p>
              <p>Condition: {forecastItem.condition || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>

      <button onClick={() => window.open(`https://www.google.com/maps?q=${weatherData.coordinates.lat},${weatherData.coordinates.lon}`, '_blank')}>
        View on Map
      </button>
    </div>
  );
};

export default WeatherInfo;
