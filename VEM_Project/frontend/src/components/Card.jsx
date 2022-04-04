import {React,useState,useEffect} from "react";
import './Card.css'
import axios from 'axios';

function Card({title, imageUrl, body,
fechaInicio, fechaFinalizacion}){
    /*
    const [eventosF,setEventosF] = useState(null);
    useEffect(() => {
        const getEventosFinalizados = async (id) => {
            try{
                const eventosFinalizados = await axios.get("/pins/finalEvento",id);
                setEventosF(eventosFinalizados.data);
            }catch(e){
                console.log(e);
            }
        }
        getEventosFinalizados();
    },[]);*/
    return(
        <div className="card-container">
            <div className="image-container">
                <img src={imageUrl} alt='' />
            </div>
            <div className="card-content">
                <div className="card-items">
                    <h3>Nombre:</h3>
                    <p>{"eventosF.title"}</p>
                </div>
                <div className="card-items">
                    <h3>Fecha inicio:</h3>
                    <p>{"eventosF.fechaInicio"}</p>
                </div>
                <div className="card-items">
                    <h3>Fecha finalización:</h3>
                    <p>{"eventosF.fechaFinalizacion"}</p>
                </div>
                <div className="card-body">
                    <h3>Descripción:</h3>
                    <p>{body}</p>
                </div>
            </div>
            <div className="btn">
                <button className="loginBtn" type="submit">
                        seguir empresa
                </button>
            </div>
        </div>
    )
}

export default Card;