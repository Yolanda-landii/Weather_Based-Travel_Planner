import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ActivitiesCard from '../components/ActivitiesCard';

const activitiesData = {
  hot: {
    minTemp: 30,
    maxTemp: 50,
    activities: ['Swimming', 'Beach Volleyball', 'Surfing', 'Snorkeling'],
  },
  warm: {
    minTemp: 20,
    maxTemp: 29,
    activities: ['Hiking', 'Cycling', 'Picnicking', 'Bird Watching'],
  },
  cold: {
    minTemp: 0,
    maxTemp: 19,
    activities: ['Skiing', 'Hot Chocolate by the Fire', 'Snowball Fight', 'Ice Skating'],
  },
};

const API_KEY = 'WfLrkPfJlfRNrmTNK8xGjrtdnWUnKwdZD2OmoKEPxPZGAT6mJzcvvKS6';

const ActivitiesPage = () => {
  const location = useLocation();
  const { weatherCondition, temperature } = location.state || {};
  const [activities, setActivities] = useState([]);
  const [images, setImages] = useState({});
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  );
  const [showPopup, setShowPopup] = useState(false);

  const getActivitiesForWeather = (temp) => {
    for (const [key, value] of Object.entries(activitiesData)) {
      if (temp >= value.minTemp && temp <= value.maxTemp) {
        return value.activities;
      }
    }
    return [];
  };

  const handleFavouriteClick = (activity) => {
    const updatedFavourites = favourites.includes(activity)
      ? favourites.filter((item) => item !== activity)
      : [...favourites, activity];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const handleViewFavourites = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
            <ActivitiesCard
              key={index}
              activity={activity}
              image={images[activity] || 'https://via.placeholder.com/150'}
              isFavourite={favourites.includes(activity)}
              onFavouriteClick={handleFavouriteClick}
            />
          ))
        ) : (
          <p>No activities available for this weather.</p>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleViewFavourites}
          style={{
            color: '#F4C561',
            fontSize: '1.5em',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          View All Favourite Activities
        </button>
      </div>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#1e1e1e',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#F4C561' }}>Favourite Activities</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {favourites.length > 0 ? (
                favourites.map((activity, index) => (
                  <div key={index} style={{ color: 'white' }}>
                    {activity}
                  </div>
                ))
              ) : (
                <div style={{ color: 'white' }}>No favourite activities yet.</div>
              )}
            </div>
            <button
              onClick={closePopup}
              style={{
                backgroundColor: '#FF69B4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
