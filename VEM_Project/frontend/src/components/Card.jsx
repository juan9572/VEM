import {React,useState,useEffect} from "react";
import './Card.css'
import imagen from '../17010.jpg';
import axios from 'axios';

function Card(props){
  <div className="card-container">
    <div className="image-container">
      <img src={imagen} alt='' />
    </div>
    <div className="card-content">
      <div className="card-items">
        <h3>Nombre:</h3>
          <p>{props.evento.title}</p>
      </div>
      <div className="card-items">
        <h3>Fecha inicio:</h3>
        <p>{props.evento.fechaInicio}</p>
      </div>
      <div className="card-items">
        <h3>Fecha finalización:</h3>
        <p>{props.evento.fechaFinalizacion}</p>
      </div>
      <div className="card-body">
        <h3>Descripción:</h3>
        <p>{props.evento.description}</p>
      </div>
    </div>
    <div className="btn">
      <button className="loginBtn" type="submit">
        seguir empresa
      </button>
    </div>
  </div>
}

export default Card;
