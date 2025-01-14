import React from 'react';
import styled from 'styled-components';

const ActivitiesCardContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  color: #fff;
`;

const ActivitiesCard = ({ data }) => {
  return (
    <ActivitiesCardContainer>
      <h2>Activities at {data.destination}</h2>
      {data.activities.map((activity, index) => (
        <div key={index}>
          <h4>{activity.name}</h4>
          <p>{activity.description}</p>
          <a href={activity.link} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
      ))}
    </ActivitiesCardContainer>
  );
};

export default ActivitiesCard;
