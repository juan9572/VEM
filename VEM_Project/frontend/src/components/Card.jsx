import React from "react";
import './Card.css'

function Card({title, imageUrl, body,
fechaInicio, fechaFinalizacion}){
    return(
        <div className="card-container">
            <div className="image-container">
                <img src={imageUrl} alt='' />
            </div>
            <div className="card-content">
                <div className="card-items">
                    <h3>Nombre:</h3>
                    <p>{title}</p>
                </div>
                <div className="card-items">
                    <h3>Fecha inicio:</h3>
                    <p>{fechaInicio}</p>
                </div>
                <div className="card-items">
                    <h3>Fecha finalización:</h3>
                    <p>{fechaFinalizacion}</p>
                </div>
                <div className="card-body">
                    <h3>Descripción:</h3>
                    <p>{body}</p>
                </div>
            </div>
            <div className="btn">
                <button>
                    <a>
                        seguir empresa
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Card;