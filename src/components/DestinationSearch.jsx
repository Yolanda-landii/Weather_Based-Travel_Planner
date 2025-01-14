import React, { useState } from 'react';

const DestinationSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationSearch, setIsLocationSearch] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (isLocationSearch) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Searching for location at lat: ${latitude}, lon: ${longitude}`);
          onSearch({ type: 'location', latitude, longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.log(`Searching for destination: ${searchTerm}`);
      onSearch({ type: 'city', cityName: searchTerm });
    }
  };

  return (
    <div className="destination-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={isLocationSearch ? "Finding current location..." : "Search for a destination..."}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div>
        <button
          className={`toggle-location-button ${isLocationSearch ? 'active' : ''}`}
          onClick={() => setIsLocationSearch((prev) => !prev)}
        >
          {isLocationSearch ? 'Search by City' : 'Use Current Location'}
        </button>
      </div>
      <style jsx>{`
        .destination-search {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px;
        }

        .search-input {
          padding: 10px;
          font-size: 16px;
          width: 250px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }

        .search-button {
          padding: 10px 20px;
          background-color: #004aad;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .search-button:hover {
          background-color: #00357d;
        }

        .toggle-location-button {
          margin-top: 10px;
          background: none;
          border: none;
          color: #004aad;
          font-size: 14px;
          cursor: pointer;
          padding: 5px;
        }

        .toggle-location-button.active {
          color: #00357d;
        }
      `}</style>
    </div>
  );
};

export default DestinationSearch;
