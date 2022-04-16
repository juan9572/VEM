import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Publicitario from '../../../PublicitarioImagen.svg';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const theme = createTheme();

export default function SignInSide() {
  const myStorage = window.localStorage; //guarda en el servidor local
  const logeoPublicitario = async (data) => {
    const publicitario = { //Se reciben los datos
      username: data.username,
      password: data.password,
    };
    try {
      const res = await axios.post("/publicitarios/login", publicitario); //La Api lo pasa al backend
      myStorage.setItem('Publicitario', res.data.username); //Queda almacenado en el almacenamiento local así evitamos que estar diciendole que se loguee
    } catch (err) {
      console.log(err);
    }
  };
  let navigate = useNavigate();
  const handleGoToCliente = () => {
    return navigate("/Login-Cliente");
  };
  const defaultValues = {
    username: "",
    password: ""
  };
  const { handleSubmit, control } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValues
  });
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Publicitario})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[250] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button variant="outlined" onClick={handleGoToCliente}>Cliente</Button>
              <Button variant="contained">Publicitario</Button>
            </ButtonGroup>
            <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit((data) => logeoPublicitario(data))} sx={{ mt: 1, width: '100%' }}>
              <Controller
                control={control}
                name="username"
                rules={
                  {
                    required: { value: true, message: "Este campo es requerido" },
                    maxLength: { value: 35, message: "El máximo de caracteres es 35" },
                    minLength: { value: 2, message: "El mínimo de caracteres es 2" }
                  }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: {error },
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
                    id="username"
                    label="Nombre entidad"
                    name="username"
                    autoComplete="organization"
                    error={Boolean(error)}
                    helperText={error ? formState.errors.username.message : null}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{ required: "Este campo es requerido" }}
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
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(error)}
                    helperText={error ? formState.errors.password.message : null}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
              >
                Ingresar
              </Button>
              <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                  <Link style={{ textDecoration: 'underline' }} to={'/Register-Publicitario'}><Button variant="">No tienes cuenta?, Registrate</Button></Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}