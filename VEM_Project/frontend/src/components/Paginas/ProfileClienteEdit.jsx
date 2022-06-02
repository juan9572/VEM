import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Imagen from '../../FondoProfile.jpg';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
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
    const ImagenProfile = "../../frontend/src/img/"
    const [file, setFile] = React.useState();
    const auth = useAuth();
    const [errorServidor, setErrorServidor] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    let { username } = useParams();
    const [filename, setFilename] = React.useState()
    const [usuario, setUsuario] = React.useState({});
    const [email, setEmail] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [imageChanged, setImageChanged] = React.useState(false);
    useEffect(() => {
        if (username !== auth.user.username) {
            navigate("*");
        }
        const getData = async () => {
            try {
                const name = { "username": auth.user.username };
                const data = await axios.post("/api/clientes/getCliente", name);
                setUsuario({
                    username: data.data.username,
                    email: data.data.email,
                    age: data.data.age
                });
                setEmail(usuario.email);
                setAge(usuario.age);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [usuario]);
    //GET THE DATA FROM THE BACKEND AND SHOWED TO THE DEFAULT_VALUES
    const { handleSubmit, control, setError } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldFocusError: false,
        defaultValues: usuario
    });
    const [image,setImage] = useState();
    const form = new FormData();
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageChanged(true);
    };
    const actualizarCliente = async (data) => {
        let edad = data.age ? data.age : -1;
        const cliente = { //Se reciben los datos
            email: data.email,
            age: edad,
            current: username
        };
        try {
            const res = await axios.post("/api/clientes/actualizar", cliente); //La Api lo pasa al backend
            subirImagen();
        } catch (err) {
            console.log(err);
        }
    };
    const subirImagen = async() => {
        try {
            if(imageChanged){
                form.append('username', auth.user.username);
                form.append('image',image);
                const fi = await axios.post("/api/clientes/upload", form, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
                    }
                });
                auth.login({
                    username: auth.user.username,
                    rol: auth.user.rol,
                    image: fi.data
                })
                setFilename(fi.data);
                setImageChanged(false);
            }
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
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                mr={10}
                            >
                                <Box component="form" noValidate onSubmit={handleSubmit((data) => actualizarCliente(data))} sx={{ mt: 1, width: '100%' }}>
                                    <Grid container>
                                        <Grid container ml={5}
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center" >
                                            <div className="App">
                                                <h2>Add Image:</h2>
                                                <input type="file" onChange={imageHandler} />
                                                <img src={file} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Controller
                                        control={control}
                                        name="username"
                                        rules={
                                            {
                                                required: { value: false, message: "Este campo es requerido" },
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
                                                value={username}
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
                                            {email ? (
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
                                                            defaultValue={email}
                                                            id="email"
                                                            label="Correo electrónico"
                                                            name="email"
                                                            autoComplete="email"
                                                            error={Boolean(error)}
                                                            helperText={error ? formState.errors.email.message : null}
                                                        />
                                                    )}
                                                />) : null}
                                        </Grid>
                                        {age ? (
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
                                                            defaultValue={age}
                                                            id="age"
                                                            label="Edad"
                                                            name="age"
                                                            error={Boolean(error)}
                                                            helperText={error ? formState.errors.age.message : null}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        ) : null}
                                    </Grid>
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
