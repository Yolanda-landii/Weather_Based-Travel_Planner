import React from 'react';
import { useLocation } from 'react-router-dom';

const activitiesData = {
  hot: {
    minTemp: 30,
    maxTemp: 50,
    activities: [
      { name: 'Swimming', image: 'swimming_image_url' },
      { name: 'Beach Volleyball', image: 'volleyball_image_url' },
    ],
  },
  warm: {
    minTemp: 20,
    maxTemp: 29,
    activities: [
      { name: 'Hiking', image: 'hiking_image_url' },
      { name: 'Cycling', image: 'cycling_image_url' },
    ],
  },
  cold: {
    minTemp: 0,
    maxTemp: 19,
    activities: [
      { name: 'Skiing', image: 'skiing_image_url' },
      { name: 'Hot Chocolate by the Fire', image: 'hot_chocolate_image_url' },
    ],
  },
};

const ActivitiesPage = () => {
  const location = useLocation();
  const { weatherCondition, temperature } = location.state || {};

  const getActivitiesForWeather = (temp) => {
    for (const [key, value] of Object.entries(activitiesData)) {
      if (temp >= value.minTemp && temp <= value.maxTemp) {
        return value.activities;
      }
    }
    return [];
  };

  const activities = getActivitiesForWeather(temperature);

  if (!weatherCondition || !temperature) {
    return <div>No weather data available to suggest activities.</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Activities for {weatherCondition}</h1>
      <h2 style={{ textAlign: 'center' }}>Temperature: {temperature}°C</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              style={{
                border: '1px solid white',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '200px',
                textAlign: 'center',
              }}
            >
              <img
                src={activity.image}
                alt={activity.name}
                style={{ width: '100%', height: '150px', borderRadius: '10px', marginBottom: '10px' }}
              />
              <h3>{activity.name}</h3>
            </div>
          ))
        ) : (
          <p>No activities available for this weather.</p>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;
