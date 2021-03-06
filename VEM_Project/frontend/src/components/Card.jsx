import {React,useState,useEffect} from "react";
import imagen from '../17010.jpg';
import { useNavigate } from "react-router-dom";

function Card(props){
  let navigate = useNavigate();
    const handleGoToEvento= () => {
        return navigate(`/EventosFinalizados/${props.evento.title}`);
    };
  return(
  <div className="card-container" onClick={handleGoToEvento}>
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
        <p>{props.evento.fechaInicio.substring(0,10)}</p>
      </div>
      <div className="card-items">
        <h3>Fecha finalización:</h3>
        <p>{props.evento.fechaFinalizacion.substring(0,10)}</p>
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
  </div>)
}

export default Card;
