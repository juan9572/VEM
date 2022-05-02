import {useEffect, useState} from 'react';
import Map, {Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from "@material-ui/icons";
import './ReactMap.css';
import axios from 'axios';
import Register from "../Register";
import Login from "../Login";

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
        const res = await axios.get("/pins");
        setPins(res.data);
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
  //Logica para crear eventos
  const [newPlace,setNewPlace] = useState(null); //Para crear nuevos eventos en el mapa
  const sacarCordenadas = (infoMap) => { //Metodo para sacar la latitud y longitud del mapa
    const longitude = infoMap.lngLat.lng;// Saco la información de la longitud de donde se hizo click en el mapa
    const latitude = infoMap.lngLat.lat;// Saco la información de la latitud de donde se hizo click en el mapa
    setViewState({...viewState,latitude:latitude,longitude:longitude}); //Centra la atención en el popup
    setNewPlace({lat:latitude,long:longitude});
  };
  const [title,setTitle] = useState(null);//Para sacar información del form para el titulo
  const [desc,setDesc] = useState(null);//Para sacar información del form para la descripción
  const [categoria,setCategoria] = useState(null);
  const [lastTitle, setLastTitle] = useState(null);
  const handleSubmit = async (e) => { //Crear un nuevo evento en el mapa
    e.preventDefault();
    const newPin = { //Se crea el pin
      title:title,
      description:desc,
      category:categoria, //
      latitude:newPlace.lat,
      long:newPlace.long,
      link:"AAA",
      fechaInicio:"2020-06-12",
      fechaFinalizacion:"2022-06-12"
    };
    try{
      const res = await axios.post("/pins",newPin); //Se llama a la Api para que los guarde
      setPins([...pins, res.data]); //Lo agrega al mapa
      setNewPlace(null);
    }catch(err){ 
      console.log(err);
    }
  };
  const actualizaDatos = async (e) => { //Crear un nuevo evento en el mapa
    e.preventDefault();
    const newPin = { //Se crea el pin
      title:title,
      description:desc,
      category:categoria, //
      latitude:newPlace.lat,
      long:newPlace.long,
      link:"AAA",
      fechaInicio:"2020-06-12",
      fechaFinalizacion:"2022-06-12"
    };
    try{
      const res = await axios.post("/pins/actualizar",[newPin,lastTitle]); //Se llama a la Api para que los guarde
      setPins([...pins, res.data]); //Lo agrega al mapa
    }catch(err){ 
      console.log(err);
    }
  };
  //Logica para el registro para crear puntos
  const myStorage = window.localStorage; //guarda en el servidor local
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const handleLogout = () => { //Manejar el log out
    setCurrentUser(null);
    myStorage.removeItem("user");
  };
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onContextMenu={currentUser && sacarCordenadas} //Saca la latitud y longitud del mapa y crea un objeto newPlace
    >
      {pins.map(p=>( //Es un for-each
        <>
          <Marker longitude={p.long} latitude={p.latitude}//Pone el puntero en la latitud y longitud
          offsetLeft={viewState.zoom*2} offsetTop={viewState.zoom*2} anchor="bottom">
          <Room 
            style={{fontSize:viewState.zoom*4,color: p.publicitario===currentUser?"tomato":"slateblue", cursor:"pointer"}}
            onClick={()=>{handleMarkerClick(p._id,p.latitude,p.long);setLastTitle(p.title);}}//Cuando se le de click sale el pop up
          />
          </Marker>
          {!currentUser && p._id === currentPlaceId && ( //si se le dio click a alguno sale el popup
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
          {currentUser && p._id === currentPlaceId && ( //si se le dio click a alguno sale el popup
          <Popup 
          longitude={p.long} 
          latitude={p.latitude}
          anchor="bottom"
          closeOnClick={true}
          closeButton={true}
          >
            <div className="card">
            <form onSubmit={actualizaDatos}>
            <label>Titulo</label>
            <input placeholder={p.title} type="text" onChange={(e) => setTitle(e.target.value)}/>
              <h4>{currentUser}</h4>
              <label>Categoria</label>
              <input placeholder={p.category} type="text" onChange={(e) => setCategoria(e.target.value)}/>
              <label>Descripción</label>
              <textarea placeholder={p.description} onChange={(e) => setDesc(e.target.value)}/>
              <label>{p.fechaInicio.substring(0,10)}</label>
              <label>{p.fechaFinalizacion.substring(0,10)}</label>
              <label>Más información</label>
              <p>Link</p>
              <div className="container-star">
                {Array(p.rating).fill(<Star className="star"/>)}
              </div>
              <button className="submitButton" type="submit">Actualizar</button>
              </form>
            </div>
          </Popup>
          )}
        </>
      ))} 
      {newPlace && ( //si se le da click a algun nuevo lugar para crear un evento.
          <Popup 
          longitude={newPlace.long} 
          latitude={newPlace.lat}
          anchor="bottom"
          closeOnClick={false}
          closeButton={true}
          onClose={() => setNewPlace(null)}
          >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Titulo" type="text" onChange={(e) => setTitle(e.target.value)}/>
              <label>Categoria</label>
              <input placeholder="Categoria" type="text" onChange={(e) => setCategoria(e.target.value)}/>
              <label>Descripción</label>
              <textarea placeholder="Descripción" onChange={(e) => setDesc(e.target.value)}/>
              <label>Puntaje</label>
              <select >
                <option defaultValue value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Agregar evento</button>
            </form>
          </div>
          </Popup>
      )}
      {currentUser ? ( //Si hay nombre de usuario es que esta logueado por lo tanto se muestra es el botón de logout
      <button className="btn logout" onClick={handleLogout}>Log out</button>) : ( //logica para registrar usuarios
      <div className="buttons">
        <button className="btn login" onClick={() => setShowLogin(true)}>Login</button>
        <button className="btn register" onClick={() => setShowRegister(true)}>Register</button>
      </div>
      )}
       {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUser}
            myStorage={myStorage}
          />
        )}
    </Map>
  );
}

export default ReactMap;
