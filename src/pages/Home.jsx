import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

import backgroundImage from '../assets/background1.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(${backgroundImage}) no-repeat center center fixed; 
    background-size: cover; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh; /* Ensure the background covers the entire screen */
  }
`;

const MainContainer = styled.div`
  background-color: transparent; 
  padding: 50px;
  margin: 20px auto;
  border-radius: 8px;
  max-width: 900px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  height: auto;
  position: relative;
  z-index: 2; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-weight: bold;
    color: #F4C561;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    border-color: #004AAD;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 74, 173, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    destination: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return formData.location && formData.destination && formData.date;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(
        `http://localhost:5000/api/weather/${formData.location}`,
        {
          params: {
            destination: formData.destination,
            date: formData.date,
          },
        }
      );

      setWeatherData(weatherResponse.data);
      navigate('/weather-info', { state: { weatherData: weatherResponse.data } });
    } catch (err) {
      setError('Error fetching data, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle /> 

      <Header />

      <MainContainer>
        <Form onSubmit={handleFormSubmit}>
          <InputGroup>
            <label htmlFor="location">Current Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your current location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              name="destination"
              placeholder="Enter your destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="date">Departure Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <Button type="submit" color="primary" label="Get Info" />
        </Form>

        {loading && <div>Loading...</div>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </MainContainer>

      <Footer />
    </>
  );
};

export default HomePage;
