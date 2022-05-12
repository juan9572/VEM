import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProfielCliente() {
    const {username} = useParams();
    return (
        <div><h1>username: {username}</h1></div>
    )
}
