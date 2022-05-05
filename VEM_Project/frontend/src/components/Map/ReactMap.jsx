import React from 'react';
import {useEffect, useState} from 'react';
import Map, {Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from "@material-ui/icons";
import axios from 'axios';
import './ReactMap.css';

function ReactMap() {
  const [viewState, setViewState] = useState({ //Para crear el mapa
    latitude: 6.25184,
    longitude: -75.56359,
    zoom: 11
  });
  const [pins,setPins] = useState([]);//Para poner pins(los eventos) en el mapa
  const [currentPlaceId,setCurrentPlaceId] = useState(null);
  useEffect(() => { //Toma todos los eventos que hay
    const getEventos = async () =>{
      try{
        const res = await axios.get("/api/publicitarios/getEventos");
        setPins(res.data.eventosCreados);
      }catch(err){
        console.log(err);
      }
    }
    getEventos();
  }, []);
  const handleMarkerClick = (id,lat,long) => { //Para los popups de los eventos
    setViewState({...viewState,latitude:lat,longitude:long}); //Centra la atención del usuario en el popup
    setCurrentPlaceId(id);
  }
  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      {pins.map(p=>( //Es un for-each
        <>
          <Marker longitude={p.long} latitude={p.latitude}//Pone el puntero en la latitud y longitud
          offsetLeft={viewState.zoom*2} offsetTop={viewState.zoom*2} anchor="bottom">
          <Room 
            style={{fontSize:viewState.zoom*4}}
            onClick={()=>{handleMarkerClick(p._id,p.latitude,p.long)}}//Cuando se le de click sale el pop up
          />
          </Marker>
          {p._id === currentPlaceId && ( //si se le dio click a alguno sale el popup
          <Popup 
          longitude={p.long} 
          latitude={p.latitude}
          anchor="bottom"
          closeOnClick={true}
          closeButton={true}
          >
            <div className="card">
              <label>{p.title}</label>
              <label>{p.description}</label>
              <h5>Evento X</h5>
              <label>{p.fechaInicio.substring(0,10)}</label>
              <label>{p.fechaFinalizacion.substring(0,10)}</label>
              <label>{p.category}</label>
              <p>{p.link}</p>
              <div className="container-star">
                {Array(p.rating).fill(<Star className="star"/>)}
              </div>
            </div>
          </Popup>
          )}
        </>
      ))}
    </Map>
  );
}

export default ReactMap;
