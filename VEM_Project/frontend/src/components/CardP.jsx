import {React,useState,useEffect} from "react";
import imagen from '../17010.jpg';
import { useNavigate } from "react-router-dom";

function CardP(props){
  let navigate = useNavigate();
    const handleGoToPubli= () => {
        return navigate(`/ProfilePublicitario/${props.publi.username}`);
    };
  return(
  <div className="card-container" onClick={handleGoToPubli}>
    <div className="image-container">
      <img src={imagen} alt='' />
    </div>
    <div className="card-content">
      <div className="card-items">
        <h3>{props.publi.username}</h3>
      </div>
    </div>
  </div>)
}

export default CardP;
