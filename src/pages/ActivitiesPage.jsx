import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const activitiesData = {
  hot: {
    minTemp: 30,
    maxTemp: 50,
    activities: ['Swimming', 'Beach Volleyball'],
  },
  warm: {
    minTemp: 20,
    maxTemp: 29,
    activities: ['Hiking', 'Cycling'],
  },
  cold: {
    minTemp: 0,
    maxTemp: 19,
    activities: ['Skiing', 'Hot Chocolate by the Fire'],
  },
};

const API_KEY = 'WfLrkPfJlfRNrmTNK8xGjrtdnWUnKwdZD2OmoKEPxPZGAT6mJzcvvKS6';

const ActivitiesPage = () => {
  const location = useLocation();
  const { weatherCondition, temperature } = location.state || {};
  const [activities, setActivities] = useState([]);
  const [images, setImages] = useState({});

  const getActivitiesForWeather = (temp) => {
    for (const [key, value] of Object.entries(activitiesData)) {
      if (temp >= value.minTemp && temp <= value.maxTemp) {
        return value.activities;
      }
    }
    return [];
  };

  useEffect(() => {
    if (temperature) {
      const activityList = getActivitiesForWeather(temperature);
      setActivities(activityList);

      activityList.forEach((activity) => {
        axios
          .get('https://api.pexels.com/v1/search', {
            headers: { Authorization: API_KEY },
            params: { query: activity, per_page: 1 },
          })
          .then((response) => {
            const photoUrl = response.data.photos[0]?.src?.medium || '';
            setImages((prev) => ({ ...prev, [activity]: photoUrl }));
          })
          .catch((error) => console.error(`Error fetching image for ${activity}:`, error));
      });
    }
  }, [temperature]);

  if (!weatherCondition || !temperature) {
    return <div style={{ textAlign: 'center', color: 'white' }}>No weather data available to suggest activities.</div>;
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
                backgroundColor: '#1e1e1e',
              }}
            >
              <img
                src={images[activity] || 'https://via.placeholder.com/150'}
                alt={activity}
                style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  objectFit: 'cover',
                }}
              />
              <h3>{activity}</h3>
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
