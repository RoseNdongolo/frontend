import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
);

export default AuthRoute;
