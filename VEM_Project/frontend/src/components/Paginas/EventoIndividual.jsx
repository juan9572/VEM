import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ImageList, ImageListItem } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import '../Card.css'
import Imagen from '../../17010.jpg';
import { useParams } from 'react-router-dom'
import useAuth from '../Auth/useAuth';

function EventoIndividual() {
  const { _id } = useParams()
  const myStorage = window.localStorage;
  const auth = useAuth();
  const [value, setValue] = React.useState(0)
  const [mensaje, setMensaje] = React.useState("")
  const [comentarios, setComentarios] = useState([]);
  const navigate = useNavigate()
  const agregarComentario = async (e) => { //Crear un nuevo comentario en el evento
    if (!auth.isLogged()) {
      return navigate("/Login-Cliente")
    }
    e.preventDefault();
    const newComentario = await { //Se crea el pin
      username: auth.user.username,
      mensaje: mensaje,
      rating: value,
      tituloEvento: _id
    };

    try {
      const res = await axios.post("/api/publicitarios/comentar", newComentario); //Se llama a la Api para que los guarde
    } catch (err) {
      console.log(err);
    }
  };
  const itemData = [{
    img: Imagen,
    title: "Logo"
  },
  {
    img: Imagen,
    title: "cliente"
  }
  ]

  const settings = {
    autoPlay: true,
    animation: "fade",
    duration: 1000,
    indicators: false,
    interval: 6000
  };
  useEffect(() => { //Toma todos los eventos que hay
    const getComentarios = async () => {
      try {
        const res = await axios.post("/api/publicitarios/getComentarios", [_id]);
        let comentarios = res.data;
        setComentarios(comentarios);
      } catch (err) {
        console.log(err);
      }
    }
    getComentarios();
  }, []);

  console.log(comentarios)
  return (
    <div>
      <Carousel
        className="MainCarousel"
        {...settings}
      >
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#ffffff',
            mb: 2,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${Imagen})`,
            height: 350
          }}
        >
          {<img style={{ display: 'none' }} src={Imagen} alt={"Error"} />}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
        </Paper>
      </Carousel>
      <div className="card-container">
        <div className="image-container">
          <img src={Imagen} alt='' />
        </div>
        <div className="card-content">
          <div className="card-items">
            <h3>Nombre:</h3>
            <p>Juan</p>
          </div>
          <div className="card-items">
            <h3>Fecha inicio:</h3>
            <p>Juan</p>
          </div>
          <div className="card-items">
            <h3>Fecha finalización:</h3>
            <p>Juan</p>
          </div>
          <div className="card-body">
            <h3>Descripción:</h3>
            <p>Soy feliz</p>
          </div>
        </div>
        <div className="btn">
          <button className="loginBtn" type="submit">
            seguir empresa
          </button>
        </div>
      </div>
      <Grid imagenes>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

      </Grid>
      <Grid comentar>
        <Box component="form" noValidate onSubmit={agregarComentario} sx={{ mt: 1, width: '100%' }}>
          <TextField
            onChange={(e) => setMensaje(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="mensaje"
            label="Que opinas?"
            name="mensaje"
            autoComplete="organization"
          />
          <Rating
            name="rating"
            value={parseInt(value)}
            onChange={(event, newvalue) => {
              setValue(newvalue);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 5 }}
          >
            Comentar
          </Button>
        </Box>
      </Grid>
      <Grid comentarios>
      <h1>Comments</h1>
        {comentarios.map((comentario) => (
          <div class="comment mt-4 text-justify float-left">
          <h4>{comentario.username}</h4>
          <Rating name="read-only" value={comentario.rating} readOnly />
          <span>{comentario.createdAt}</span>
          <br></br>
          <p>{comentario.mensaje}</p>
        </div>
        ))}
      </Grid>

    </div>

  );

}

export default EventoIndividual;