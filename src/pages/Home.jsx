import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';

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
            // Pass destination as a query parameter
            const weatherResponse = await axios.get(`http://localhost:5000/api/weather/${formData.location}`, {
                params: {
                    destination: formData.destination,  
                    date: formData.date,
                },
            });
    
            setWeatherData(weatherResponse.data);
            navigate('/weather-info', { state: { weatherData: weatherResponse.data } });
        } catch (err) {
            setError('Error fetching data, please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="Main">
            <Header />
            <form onSubmit={handleFormSubmit}>
                <div className="input-group">
                    <label htmlFor="location">Current Location:</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter your current location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Enter your destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="date">Departure Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <Button type="submit" color="primary" label="Get Info" />
            </form>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}

            <Footer />
        </div>
    );
};

export default HomePage;
