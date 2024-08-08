import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useOutletContext();
    console.log("User dentro do prive route " + user)
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
