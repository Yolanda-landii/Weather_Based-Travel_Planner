import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

const WeatherInfo = () => {
  const location = useLocation();
  const weatherData = location.state?.weatherData;
  const navigate = useNavigate();

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  const { currentWeather, forecast } = weatherData;

  if (!currentWeather) {
    return <div>No current weather data available.</div>;
  }

  const containerStyle = {
    backgroundColor: '#121212',
    color: 'white',
    padding: '30px',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const sectionStyle = {
    margin: '20px 0',
  };

  const subheadingStyle = {
    fontSize: '1.8em',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const forecastContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#004AAD',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2em',
    display: 'block',
    margin: '20px auto',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#003366',
  };

  const handleActivitiesClick = () => {
    navigate('/activities', { state: { weatherCondition: currentWeather.condition, temperature: currentWeather.temperature } });
  };

  return (
    <div className="weather-info" style={containerStyle}>
      <h1 style={headingStyle}>{weatherData.locationName}</h1>
      <div className="current-weather" style={sectionStyle}>
        <h2 style={subheadingStyle}>Current Weather</h2>
        <p>Temperature: {currentWeather.temperature ? `${currentWeather.temperature}°C` : 'N/A'}</p>
        <p>Humidity: {currentWeather.humidity ? `${currentWeather.humidity}%` : 'N/A'}</p>
        <p>Wind Speed: {currentWeather.windSpeed ? `${currentWeather.windSpeed} m/s` : 'N/A'}</p>
        <p>Condition: {currentWeather.condition || 'N/A'}</p>
      </div>

      <div className="forecast" style={sectionStyle}>
        <h2 style={subheadingStyle}>Weather Forecast</h2>
        <div className="forecast-cards" style={forecastContainerStyle}>
          {forecast.length > 0 ? (
            forecast.map((forecastItem, index) => (
              <WeatherCard
                key={index}
                date={forecastItem.date || 'N/A'}
                temperature={forecastItem.temperature[0] || 'N/A'}
                condition={forecastItem.condition[0] || 'N/A'}
              />
            ))
          ) : (
            <p>No forecast data available.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleActivitiesClick}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
      >
        View Available Activities
      </button>
    </div>
  );
};

export default WeatherInfo;
