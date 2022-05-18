import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Imagen from '../../FondoProfile.jpg';
import ImagenProfile from './vsco5c3ca40baab64.jpg';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import useAuth from '../Auth/useAuth';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

export default function ProfileClienteEdit() {
    const auth = useAuth();
    const [errorServidor, setErrorServidor] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { username } = useParams();
    const [usuario,setUsuario] = useState(null);
    useLayoutEffect(() => {
        if (username !== auth.user.username) {
            navigate("*");
        }
        console.log("a");
        const getData = async () =>{ 
            try{
                const name = {"username": username};
                const data = await axios.post("/api/clientes/getCliente",name);
                console.log(data);
                setUsuario({
                    username:data.data.username,
                    email:data.data.email,
                    age:data.data.age
                });
                console.log(usuario);
                console.log(control._defaultValues);
            }catch(err){
                console.log(err);
            }
        }
        getData();
      }, []);
    //GET THE DATA FROM THE BACKEND AND SHOWED TO THE DEFAULT_VALUES
    const { handleSubmit, control, setError, reset } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues:usuario
    });
    const crearCliente = async (data) => {
        let edad = data.age ? data.age : -1;
        const cliente = { //Se reciben los datos
            username: data.username,
            email: data.email,
            age: edad,
            password: data.password,
        };
        try {
            const res = await axios.post("api/clientes/register", cliente).catch(
                function (error) {
                    if (error.response.status === 200) {
                    } else if (error.response.data.field === "username") {
                        setError("username", { type: "error", message: error.response.data.error });
                    } else if (error.response.data.field === "email") {
                        setError("email", { type: "error", message: error.response.data.error });
                    } else {
                        setOpen(true);
                        setErrorServidor(true);
                    }
                }
            ); //La Api lo pasa al backend
            auth.login(res.data);
            return navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    const settings = {
        cycleNavigation: false,
        swipe: false,
        indicators: false,
        navButtonsAlwaysInvisible: true,
    };
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <div className="profile">
            <div className="profileRight">
                <div className="profileRightTop">
                    <Carousel
                        className="MainCarousel"
                        {...settings}
                    >
                        <Paper
                            sx={{
                                position: 'relative',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${Imagen})`,
                                justifyContent: 'center',
                                alignItems: "end",
                                display: 'flex',
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
                                }}
                            />
                            <Paper sx={{
                                position: 'relative',
                                backgroundColor: '#fff',
                                width: "80%",
                                height: 100,
                                justifyContent: 'center',
                                display: 'flex',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            }} elevation={3}>
                            </Paper>
                        </Paper>
                    </Carousel>
                    <Box container>
                        <Paper sx={{
                            margin: 'auto',
                            position: 'relative',
                            backgroundColor: '#fff',
                            width: "80%",
                            justifyContent: 'center',
                            alignItems: 'start',
                            display: 'flex',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            paddingBottom: 5,
                            marginBottom: 5
                        }} elevation={3} >
                            {errorServidor &&
                                <Collapse in={open}>
                                    <Alert
                                        severity="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        sx={{ mb: 2 }}
                                    >
                                        <AlertTitle>Error</AlertTitle>
                                        Parece que algo ha salido mal, intentalo más tarde
                                    </Alert>
                                </Collapse>
                            }
                            <Grid container>
                                <Grid container ml={5}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center" >

                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" type="file" />
                                        <Button component="span" sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}>
                                            <Avatar
                                                src={ImagenProfile}
                                                sx={{ width: 160, height: 160, }}
                                            />
                                        </Button>
                                    </label>
                                    <Typography variant="h6">Cambiar foto de perfil</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                mr={10}
                            >
                                <Box component="form" noValidate onSubmit={handleSubmit((data) => crearCliente(data))} sx={{ mt: 1, width: '100%' }}>
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
                                                id="username"
                                                label="Nombre de usuario"
                                                name="username"
                                                autoComplete="username"
                                                error={Boolean(error)}
                                                helperText={error ? formState.errors.username.message : null}
                                            />
                                        )}
                                    />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={8}>
                                            <Controller
                                                control={control}
                                                name="email"
                                                rules={
                                                    {
                                                        required: { value: true, message: "Este campo es requerido" },
                                                        maxLength: { value: 60, message: "El máximo de caracteres es 60" },
                                                        minLength: { value: 5, message: "El mínimo de caracteres es 5" },
                                                        pattern: {
                                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: 'No es un email válido',
                                                        }
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
                                                        id="email"
                                                        label="Correo electrónico"
                                                        name="email"
                                                        autoComplete="email"
                                                        error={Boolean(error)}
                                                        helperText={error ? formState.errors.email.message : null}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Controller
                                                control={control}
                                                name="age"
                                                rules={
                                                    {
                                                        max: { value: 110, message: "No se permite esta edad" },
                                                        min: { value: 5, message: "No se permite esta edad" },
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: 'No es un número válido',
                                                        }
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
                                                        fullWidth
                                                        id="age"
                                                        label="Edad"
                                                        name="age"
                                                        error={Boolean(error)}
                                                        helperText={error ? formState.errors.age.message : null}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={
                                            {
                                                required: { value: true, message: "Este campo es requerido" }
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
                                                name="password"
                                                label="Contraseña"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                error={Boolean(error)}
                                                helperText={error ? formState.errors.password.message : null}
                                            />
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 3, mb: 5 }}
                                    >
                                        Actualizar Datos
                                    </Button>
                                </Box>
                            </Grid>
                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}
