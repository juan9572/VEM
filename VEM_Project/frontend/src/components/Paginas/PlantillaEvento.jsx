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
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";


const theme = createTheme();

export default function PlantillaEvento() {
    const [errorServidor, setErrorServidor] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState([null, null]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const categorias = [{ categoria: 'Arte y cultura' }, { categoria: 'Deportes' }, { categoria: 'Gastronomía' }, { categoria: 'Mascotas' }];

    const myStorage = window.localStorage; //guarda en el servidor local
    const createPublicitario = async (data) => {
        const publicitario = { //Se reciben los datos
            username: data.username,
            email: data.email,
            password: data.password,
            nit: data.nit,
            telefono: data.telefono,
            categoriaPublicidad: categoria
        };
        try {
            const res = await axios.post("api/publicitarios/register", publicitario).catch(
                function (error) {
                    if (error.response.status === 200) {
                    } else if (error.response.data.field === "username") {
                        setError("username", { type: "error", message: error.response.data.error });
                    } else if (error.response.data.field === "email") {
                        setError("email", { type: "error", message: error.response.data.error });
                    } else if (error.response.data.field === "nit") {
                        setError("nit", { type: "error", message: error.response.data.error });
                    } else if (error.response.status === 500) {
                        setOpen(true);
                        setErrorServidor(true);
                    }
                }
            ); //La Api lo pasa al backend
            //myStorage.setItem('Publicitario', res.data.username); //Queda almacenado en el almacenamiento local así evitamos que estar diciendole que se loguee
        } catch (err) {
            console.log(err);
        }
    };

    const [categoria, setCategoria] = React.useState([]);

    let navigate = useNavigate();

    const handleGoToCliente = () => {
        return navigate("/Register-Cliente");
    };

    const defaultValues = {
        titulo: "",
        descripcion: "",
        categoria: "",
        latitud: 0,
        long: 0,
        fechaInicio: "",
        fechaFinalizacion: "",
        publicitario: ""
    };

    const { handleSubmit, control, clearErrors, setError } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues
    });
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{
                height: '100vh', alignItems: "center",
                justifyContent: "center"
            }}>
                <CssBaseline />
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
                        <Typography component="h1" variant="h5">
                            Crear evento
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
                        <Box component="form" noValidate onSubmit={handleSubmit((data) => createPublicitario(data))} sx={{ mt: 1, width: '100%', alignItems: "center", }}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="titulo"
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
                                            id="titulo"
                                            label="Titulo"
                                            name="titulo"
                                            autoComplete="organization"
                                            error={Boolean(error)}
                                            helperText={error ? formState.errors.titulo.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="descripcion"
                                    rules={
                                        {
                                            required: { value: true, message: "Este campo es requerido" },
                                            maxLength: { value: 60, message: "El máximo de caracteres es 60" },
                                            minLength: { value: 5, message: "El mínimo de caracteres es 5" }
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
                                            id="descripcion"
                                            label="Descripción"
                                            name="descripcion"
                                            multiline
                                            rows={6}
                                            autoComplete="email"
                                            error={Boolean(error)}
                                            helperText={error ? formState.errors.descripcion.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                            <Controller
                                xs={12} sm={6}
                                control={control}
                                name="categoria"
                                rules={
                                    {
                                        validate: () => {
                                            if (categoria.length === 0) {
                                                return false;
                                            }
                                        }
                                    }}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                    fieldState: { error },
                                    formState,
                                }) => (
                                    <Autocomplete
                                        isOptionEqualToValue={(option, value) => option.categoria === value.categoria}
                                        disablePortal
                                        id="categoria"
                                        name="categoria"
                                        onChange={(event, newValue) => {
                                            setCategoria(newValue);
                                            if (newValue.length > 0) {
                                                clearErrors("categoria");
                                            } else {
                                                setError("categoria", { type: "required", message: "Se necesita mínimo una categoria" });
                                            }
                                        }}
                                        options={categorias}
                                        getOptionLabel={(option) => option.categoria}
                                        filterSelectedOptions
                                        onBlur={onBlur}
                                        sx={{ width: 200 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Categorias de publicidad"
                                                placeholder="Seleccionadas"
                                                required
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                error={Boolean(error)}
                                                helperText={error ? "Se necesita mínimo una categoria" : null}
                                            />
                                        )}
                                    />
                                )}
                            />
                            {/*
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                    startText="Check-in"
                                    endText="Check-out"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                                    </LocalizationProvider>*/}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 5 }}
                            >
                                Crear evento
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}