import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WeatherInfo from './pages/WeatherInfo';
import MapView from './components/MapView';
import ActivitiesPage from './pages/ActivitiesPage'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather-info" element={<WeatherInfo />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/activities" element={<ActivitiesPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
