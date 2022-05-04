import React from 'react';
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();//Para sacar el campo del form para username
    const passwordRef = useRef();//Para sacar el campo del form para password
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const publicitario = { //Se reciben los datos
        _id: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      try {
        const res = await axios.post("/publicitarios/login", publicitario); //La Api lo pasa al backend
        setCurrentUsername(res.data._id);// Pone el nombre del publictario actual para que pueda identificar sus pines
        myStorage.setItem('user', res.data._id); //Queda almacenado en el almacenamiento local así evitamos que estar diciendole que se loguee
        setShowLogin(false);
      } catch (err) {
        setError(true);
      }
    };
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>LamaPin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
    );
}
