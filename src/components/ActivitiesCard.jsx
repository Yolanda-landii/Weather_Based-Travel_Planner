import React from 'react';

const ActivitiesCard = ({ activity, image, isFavourite, onFavouriteClick }) => (
  <div
    style={{
      border: '1px solid white',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '250px',
      textAlign: 'center',
      backgroundColor: '#1e1e1e',
      transition: 'transform 0.3s',
      width: '250px',
      height: '350px',
    }}
  >
    <img
      src={image}
      alt={activity}
      style={{
        width: '100%',
        height: '200px',
        borderRadius: '10px',
        marginBottom: '10px',
        objectFit: 'cover',
      }}
    />
    <h3>{activity}</h3>
    <button
      onClick={() => onFavouriteClick(activity)}
      style={{
        backgroundColor: isFavourite ? '#FF69B4' : 'transparent',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '1.5em',
        transition: 'background-color 0.3s',
      }}
    >
      ❤️
    </button>
  </div>
);

export default ActivitiesCard;
