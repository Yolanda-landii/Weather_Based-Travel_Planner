import React, { useState } from 'react';

const WeatherCard = ({ date, temperature, condition }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: '#2d2d2d',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '200px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out', // Smooth transition
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Scale effect when hovered
  };

  return (
    <div
      className="weather-card"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <h3>{date}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {condition}</p>
    </div>
  );
};

export default WeatherCard;
