import React from 'react';
import { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import "./register.css";

export default function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false); //es un mensaje que nos dice si se realizo correctamente el registro
  const [error, setError] = useState(false); //es un mensaje que nos dice si hubo un error con el registro
  const usernameRef = useRef(); //Para sacar el campo del form para username
  const emailRef = useRef();//Para sacar el campo del form para email
  const nitRef = useRef();//Para sacar el campo del form para nit
  const categoriaPublicidadRef = useRef();//Para sacar el campo del form para categoria publicidad
  const passwordRef = useRef();//Para sacar el campo del form para password

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPublicitario = {
      _id: usernameRef.current.value,
      email: emailRef.current.value,
      nit: nitRef.current.value,
      categoriaPublicidad: categoriaPublicidadRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/publicitarios/register", newPublicitario); // La Api lo manda al backend
      setError(false);
      setSuccess(true); //Se confrima que se hizo bien el registro
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>Eventos</span>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text"placeholder="username" ref={usernameRef}></input>
            <input type="email"placeholder="email" ref={emailRef}></input>
            <input type="text"placeholder="nit" ref={nitRef}></input>
            <input type="text"placeholder="categoria publicidad" ref={categoriaPublicidadRef}></input>
            <input type="password"placeholder="password" ref={passwordRef}></input>
            <button className="registerBtn" type="submit">Register</button>
            {success && (
            <span className="success">Successfull. You can login now!</span>
            )}
            {error && <span className="failure">Something went wrong!</span>}
        </form>
        <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
        />
    </div>
  );
}
