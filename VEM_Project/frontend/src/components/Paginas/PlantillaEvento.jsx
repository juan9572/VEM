import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PinDropIcon from '@mui/icons-material/PinDrop';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '../Navbar/NavbarP';
import Footer from '../Footer';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useAuth from '../Auth/useAuth';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Map, { Marker } from 'react-map-gl';
import Geocoder from '../Map/Geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 300;

export default function PlantillaEvento() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();
    const [errorServidor, setErrorServidor] = React.useState(false);

    const dashboard = {
        text: "Dashboard",
        icon: <HomeIcon />,
        router: "/Dashboard"
    };

    const eventos = [
        {
            text: "Crear eventos",
            icon: <AddLocationAltIcon />,
            router: "/Dashboard/CrearEvento"
        },
        {
            text: "Editar eventos",
            icon: <EditLocationAltIcon />,
            router: "/Dashboard/EditarEvento"
        },
        {
            text: "Estadísticas de eventos",
            icon: <BarChartIcon />,
            router: "/Dashboard/VerDatosEvento"
        }
    ];

    const crearEvento = async (data) => {
        const evento = {
            name: auth.user.username,
            title: data.title,
            description: data.description,
            category: data.category,
            latitude: newPlace.lat,
            long: newPlace.long,
            fechaInicio: fecha[0].startDate,
            fechaFinalizacion: fecha[0].endDate
        };
        if (data.link) {
            evento.link = data.link;
        }
        console.log(evento);
        try {
            const resEvento = await axios.post("/api/publicitarios/crearEvento", evento); //Se llama a la Api para que los guarde
            const res = await axios.post("/api/publicitarios/getFollowers", [auth.user.username])
            let lista = res.data
            for (let i = 0; i < lista.length; i++) {
                var dato = {
                    service_id: 'service_lfewldj',
                    template_id: 'template_b26cy9f',
                    user_id: '1nddrz4D7Xy8naENC',
                    template_params: {
                        'email': lista[i].email,
                        'to_name': lista[i].username,
                        'from_name': auth.user.username
                    }
                };
                const aaa = await axios.post("https://api.emailjs.com/api/v1.0/email/send", dato)
            }
            navigate("/Dashboard");
        } catch (err) {
            console.log(err);
        }
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const defaultValues = {
        title: "",
        description: "",
        category: "",
        latitude: 0,
        long: 0,
        fechaInicio: "",
        fechaFinalizacion: ""
    };
    const { handleSubmit, control, setError } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues
    });
    const [viewState, setViewState] = useState({ //Para crear el mapa
        latitude: 6.25184,
        longitude: -75.56359,
        zoom: 11
    });
    let mapRef = useRef();
    const [newPlace, setNewPlace] = useState(null);
    const sacarCordenadas = (infoMap) => {
        let longitude;
        let latitude;
        if (infoMap.result) {
            longitude = infoMap.result.center[0];
            latitude = infoMap.result.center[1];
        } else {
            longitude = infoMap.lngLat.lng;
            latitude = infoMap.lngLat.lat;
        }
        setViewState({ ...viewState, latitude: latitude, longitude: longitude });
        setNewPlace({ lat: latitude, long: longitude });
    };
    const changeFecha = (fecha) => {
        setNewFecha([fecha.selection]);
    }
    const [fecha, setNewFecha] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListSubheader component="div" id="nested-list-header-Dash">
                            Inicio de dashboard
                        </ListSubheader>
                        <ListItem key={dashboard.text} onClick={() => { return navigate(dashboard.router) }} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {dashboard.icon}
                                </ListItemIcon>
                                <ListItemText primary={dashboard.text} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListSubheader component="div" id="nested-list-header-Events">
                            Gestión de eventos
                        </ListSubheader>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <PinDropIcon />
                            </ListItemIcon>
                            <ListItemText primary="Eventos" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {
                                eventos.map((data, index) => {
                                    return (
                                        <List component="div" onClick={() => { return navigate(data.router) }} disablePadding key={index}>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    {data.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={data.text} />
                                            </ListItemButton>
                                        </List>
                                    );
                                })
                            }
                        </Collapse>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h3">Crear evento</Typography>
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
                <Box component="form" noValidate onSubmit={handleSubmit((data) => crearEvento(data))}
                    sx={{
                        mt: 1, width: '100%'
                    }}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid container spacing={2}
                            mt={3}
                            pb={3}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ border: '1px solid #D9F1FF', backgroundColor: "#F7FCFF" }}
                        >
                            <Grid item xs={3}>
                                <Controller
                                    control={control}
                                    name="title"
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
                                            id="title"
                                            label="Titulo"
                                            name="title"
                                            error={Boolean(error)}
                                            helperText={error ? formState.errors.title.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    control={control}
                                    name="description"
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
                                            multiline
                                            maxRows={4}
                                            required
                                            fullWidth
                                            id="description"
                                            label="Descripción"
                                            name="description"
                                            error={Boolean(error)}
                                            helperText={error ? formState.errors.description.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}
                            mt={3}
                            pb={3}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ border: '1px solid #D9F1FF', backgroundColor: "#F7FCFF" }}
                        >
                            <Grid item>

                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label" required style={{ fontSize: 25, margin: "auto" }}>Categoria</FormLabel>
                                    <Controller
                                        control={control}
                                        name="category"
                                        rules={
                                            {
                                                required: { value: true },

                                            }}
                                        render={({
                                            field: { onChange, onBlur, value, ref },
                                            fieldState: { error },
                                            formState,
                                        }) => (
                                            < RadioGroup
                                                row
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Deportes" control={<Radio icon={<SportsVolleyballOutlinedIcon sx={{ fontSize: 70 }} />} checkedIcon={<SportsVolleyballIcon sx={{ fontSize: 70 }} />} />} labelPlacement="bottom" label="Deportes" />
                                                <FormControlLabel value="Gastronomia" control={<Radio icon={<FoodBankOutlinedIcon sx={{ fontSize: 70 }} />} checkedIcon={<FoodBankIcon sx={{ fontSize: 70 }} />} />} labelPlacement="bottom" label="Gastronomia" />
                                                <FormControlLabel value="Mascotas" control={<Radio icon={<PetsIcon sx={{ fontSize: 70 }} />} checkedIcon={<PetsIcon sx={{ fontSize: 70 }} />} />} labelPlacement="bottom" label="Mascotas" />
                                                <FormControlLabel value="Arte y cultura" control={<Radio icon={<TheaterComedyOutlinedIcon sx={{ fontSize: 70 }} />} checkedIcon={<TheaterComedyIcon sx={{ fontSize: 70 }} />} />} labelPlacement="bottom" label="Arte y cultura" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}
                            mt={3}
                            pb={3}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ border: '1px solid #D9F1FF', backgroundColor: "#F7FCFF" }}
                        >
                            <Grid item>
                                <Typography variant="h5">Selecciona el lugar del evento *</Typography>
                                <Map
                                    ref={mapRef}
                                    {...viewState}
                                    onMove={evt => setViewState(evt.viewState)}
                                    style={{ width: 800, height: 500 }}
                                    mapStyle="mapbox://styles/mapbox/streets-v11"
                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                                    onClick={sacarCordenadas} //Saca la latitud y longitud del mapa y crea un objeto newPlace
                                >
                                    {mapRef.current ?
                                        <Geocoder
                                            mapRef={mapRef}
                                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                                            position="top-right"
                                            onResult={sacarCordenadas}
                                        /> : null
                                    }
                                    {newPlace && ( //si se le da click a algun nuevo lugar para crear un evento.
                                        <Marker
                                            longitude={newPlace.long}
                                            latitude={newPlace.lat}
                                            anchor="bottom"
                                            closeOnClick={false}
                                            color={"#4272f5"}
                                            draggable
                                            onDragEnd={sacarCordenadas}
                                            closeButton={true}
                                        />
                                    )}
                                </Map>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}
                            mt={3}
                            pb={3}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ border: '1px solid #D9F1FF', backgroundColor: "#F7FCFF" }}
                        >
                            <Grid item xs={8}>
                                <Controller
                                    control={control}
                                    name="link"
                                    rules={
                                        {
                                            required: { value: false }
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
                                            id="link"
                                            label="Link de evento"
                                            name="link"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid container spacing={2}
                                mt={3}
                                pb={3}
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid item>
                                    <DateRangePicker
                                        onChange={changeFecha}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        ranges={fecha}
                                        direction="horizontal"
                                        preventSnapRefocus={true}
                                        calendarFocus="backwards"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 5 }}
                                >
                                    Crear evento
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}
