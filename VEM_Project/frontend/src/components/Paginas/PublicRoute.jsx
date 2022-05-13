import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../Auth/useAuth";

export default function PublicRoute() {
    const auth = useAuth();
    return !auth.isLogged() ? <Outlet /> : <Navigate to="/" />
}
