// HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import WeatherCard from '../components/WeatherCard';
import ActivitiesCard from '../components/ActivitiesCard';
import Footer from '../components/Footer';
import axios from 'axios';

const HomePage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form state to store input data
    const [formData, setFormData] = useState({
        location: '',
        destination: '',
        date: '',
        time: '',
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fetch weather and activity info when form is submitted
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const weatherResponse = await axios.get(`/api/weather`, {
                params: {
                    location: formData.location,
                    destination: formData.destination,
                    date: formData.date,
                    time: formData.time,
                },
            });
            setWeatherData(weatherResponse.data);

            const activityResponse = await axios.get(`/api/activities`, {
                params: {
                    destination: formData.destination,
                },
            });
            setActivityData(activityResponse.data);
        } catch (err) {
            setError("Error fetching data, please try again.");
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
                <div className="input-group">
                    <label htmlFor="time">Departure Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <Button color="primary" label="Get Info" onClick={handleFormSubmit} />
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {weatherData && <WeatherCard data={weatherData} />}
            {activityData && <ActivitiesCard data={activityData} />}

            <Footer />
        </div>
    );
};

export default HomePage;
