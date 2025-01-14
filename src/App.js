import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'; 
import WeatherInfo from './pages/WeatherInfo'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/weather-info" element={<WeatherInfo />} />
            </Routes>
        </Router>
    );
};

export default App;
