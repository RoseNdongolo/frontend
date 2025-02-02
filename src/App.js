import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Virtual/Home/Home'; // Import your Home component
import Login from './Virtual/Auth/Login'; // Import your Login component
import Destination from './Virtual/Home/Destination';
import Booking from './Virtual/Home/Booking';
import Attraction from './Virtual/Home/Attraction';
import NavBar from './components/NavBar';  // Import the NavBar component

const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

function App() {
    return (
        <Router>
            {/* Render Navbar only on routes that are not login */}
            <NavBar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/destinations' element={<Destination />} />
                <Route path='/attraction' element={<Attraction />} />
                <Route path="/booking/:name" element={<Booking />} />
                {/* You can add a fallback route for undefined paths */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;
