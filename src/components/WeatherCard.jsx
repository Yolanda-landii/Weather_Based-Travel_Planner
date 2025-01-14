import React from 'react';
import styled from 'styled-components';

const WeatherCardContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 500px;
  margin-top: 21px;
  color: #fff;
`;

const WeatherCard = ({ data }) => {
  return (
    <WeatherCardContainer>
      <h2>{data.location}</h2>
      <p>{data.description}</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Date: {data.date}</p>
      <p>Time: {data.time}</p>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
