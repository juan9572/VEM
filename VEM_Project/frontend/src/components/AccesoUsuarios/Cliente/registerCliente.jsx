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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cliente from '../../../ClienteImagen.svg';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useAuth from '../../Auth/useAuth';

const theme = createTheme();

export default function SignInSide() {
    const [errorServidor, setErrorServidor] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();

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
                    } else{
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
    let navigate = useNavigate();
    const handleGoToPublicitario = () => {
        return navigate("/Register-Publicitario");
    };
    const defaultValues = {
        username: "",
        email: "",
        password: ""
    };
    const { handleSubmit, control, setError } = useForm({
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
                        backgroundImage: `url(${Cliente})`,
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
                            <Button variant="contained">Cliente</Button>
                            <Button variant="outlined" onClick={handleGoToPublicitario}>Publicitario</Button>
                        </ButtonGroup>
                        <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registrarse
                        </Typography>
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
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 5 }}
                            >
                                Registrarse
                            </Button>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs={3}>
                                    <Link style={{ textDecoration: 'underline' }} to={'/Login-Cliente'}><Button variant="">Ya tienes cuenta?, Logueate</Button></Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}