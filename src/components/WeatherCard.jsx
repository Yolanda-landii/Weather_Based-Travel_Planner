import React from 'react';

const WeatherCard = ({ date, temperature, condition }) => {
  const cardStyle = {
    backgroundColor: '#2d2d2d',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '200px',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
  };

  const hoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div className="weather-card" style={cardStyle}>
      <h3>{date}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {condition}</p>
    </div>
  );
};

export default WeatherCard;
