import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    
    return true == false ? <Outlet /> : <Navigate to="/" />
}
