import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating'
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";


function EventoIndividual() {
  const myStorage = window.localStorage;
  const agregarComentario = async (data) => { //Crear un nuevo comentario en el evento
    const newComentario = await { //Se crea el pin
      username: myStorage.getItem("user"),
      mensaje: data.mensaje,
      rating: data.rating,
      tituloEvento: "Nose"
    };
    console.log(data)
    try {
      const res = await axios.post("/api/publicitarios/comentar", newComentario); //Se llama a la Api para que los guarde
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
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
    <Box component="form" noValidate onSubmit={handleSubmit((data) => agregarComentario(data))} sx={{ mt: 1, width: '100%' }}>
      <Typography component="legend">Read only</Typography>
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


  );

}

export default EventoIndividual;