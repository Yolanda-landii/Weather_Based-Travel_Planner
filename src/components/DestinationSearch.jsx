import React, { useState } from 'react';

const DestinationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for destination: ${searchTerm}`);
  };

  return (
    <div className="destination-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a destination..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
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
      `}</style>
    </div>
  );
};

export default DestinationSearch;
