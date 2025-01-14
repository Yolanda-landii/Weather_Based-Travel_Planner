import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MapView = () => {
  const location = useLocation();
  const { lat, lon, locationName } = location.state || {};

  useEffect(() => {
    if (lat && lon) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat, lng: lon },
        zoom: 10,
      });

      new window.google.maps.Marker({
        position: { lat, lng: lon },
        map: map,
        title: locationName,
      });
    }
  }, [lat, lon, locationName]);

  if (!lat || !lon) {
    return <div>Coordinates not available.</div>;
  }

  return (
    <div className="MapView">
      <h1>Map View - {locationName}</h1>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapView;
