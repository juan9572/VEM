import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../Auth/useAuth";

export default function PublicRoute() {
    const auth = useAuth();
    let route;
    if(auth.user && auth.user.rol === "C"){
        route = `/Profile/${auth.user.username}`;
    }else{
        route = "/Dashboard";
    }
    return !auth.isLogged() ? <Outlet /> : <Navigate to={route} />
}
