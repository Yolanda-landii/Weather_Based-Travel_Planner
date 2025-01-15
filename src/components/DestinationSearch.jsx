import React, { useState } from 'react';
import axios from 'axios';

const DestinationSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Handle input changes and fetch auto-complete suggestions
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`/api/autoComplete`, {
          params: { query },
        });
        setSuggestions(response.data.suggestions || []); // Update suggestions
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search`, {
        params: { query: searchTerm },
      });
      onSearch(response.data); // Return full search result to parent
    } catch (err) {
      console.error('Error fetching destination:', err);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
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
          autoComplete="off"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Auto-complete suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .destination-search {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }
        .search-input {
          padding: 10px;
          font-size: 16px;
          width: 250px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
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
        .suggestions-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0;
          width: 250px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: white;
        }
        .suggestion-item {
          padding: 10px;
          cursor: pointer;
        }
        .suggestion-item:hover {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default DestinationSearch; 
