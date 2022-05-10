import * as React from 'react';
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
import '../Card.css'
import Imagen from '../../17010.jpg';



function EventoIndividual(tituloEvento) {
  const myStorage = window.localStorage;
  const agregarComentario = async (data) => { //Crear un nuevo comentario en el evento
    const newComentario = await { //Se crea el pin
      username: myStorage.getItem("user"),
      mensaje: data.mensaje,
      rating: data.rating,
      tituloEvento: tituloEvento
    };
    console.log(data)
    try {
      const res = await axios.post("/api/publicitarios/comentar", newComentario); //Se llama a la Api para que los guarde
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const itemData = [{
    img:Imagen,
    title:"Logo"
  },
  {
    img:Imagen,
    title:"cliente"
  }
  ]
  const defaultValues = {
    username: "",
    mensaje: "",
    rating: ""
  };
  const [value, setValue] = React.useState(0)
  const { handleSubmit, control, setError } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValues,
  });
  return (
    <Grid container>
      <Grid banner>
        <Box component="img" src={Imagen}
          sx={{
            position: 'realtive',
            top: 10,
            bottom: 0,
            right: 0,
            left: 10,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}>
        </Box>
      </Grid>
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
            <p>Soy gay</p>
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
        <Box component="form" noValidate onSubmit={handleSubmit((data) => agregarComentario(data))} sx={{ mt: 1, width: '100%' }}>

          <Rating name="read-only" value={5} readOnly />
          <Controller
            control={control}
            name="mensaje"
            rules={
              {
                required: { value: true, message: "Este campo es requerido" },
                maxLength: { value: 200, message: "El máximo de caracteres es 200" },
                minLength: { value: 2, message: "El mínimo de caracteres es 2" }
              }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
              formState,
            }) => (
              <TextField
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
                inputRef={ref}
                margin="normal"
                required
                fullWidth
                id="mensaje"
                label="Que opinas?"
                name="mensaje"
                autoComplete="organization"
                error={Boolean(error)}
                helperText={error ? formState.errors.mensaje.message : null}
              />
            )}
          />
          <Controller
            control={control}
            name="rating"
            rules={{ required: "Este campo es requerido" }}
            render={({
              field: { onChange, onBlur, value, ref },
            }) => (
              <Rating
                name="rating"
                value={parseInt(value)}
                onChange={(event, newvalue) => {
                  setValue(newvalue);
                }}
              />
            )}
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

    </Grid>

  );

}

export default EventoIndividual;