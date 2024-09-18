import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import LandingPage from './LandingPage'; // Import LandingPage
import Homepage from './Homepage'; // Import Homepage

function App() {
  return (
    <Router> {/* Wrap Routes in Router */}
      <Routes> {/* Use Routes to define routes */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/home" element={<Homepage />} /> {/* New route for Homepage */}
      </Routes>
    </Router>
  );
}

export default App;
