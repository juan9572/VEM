import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../Auth/useAuth";

export default function PrivateRouteC() {
    const auth = useAuth();
    return auth.isLogged() && !auth.isPublicitario() ? <Outlet /> : <Navigate to="/" />
}
