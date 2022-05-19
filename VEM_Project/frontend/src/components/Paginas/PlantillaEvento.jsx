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
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Auth/useAuth';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";


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
            title: data.title,
            description: data.description,
            category:data.category,
            latitude:data.latitude,
            long:data.long,
            fechaInicio:data.fechaInicio,
            fechaFinalizacion:data.fechaFinalizacion
        };
        try {
            const resEvento = await axios.post("api/publicitarios/crearEvento", evento); //Se llama a la Api para que los guarde
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
        category:"",
        latitude:0,
        long:0,
        fechaInicio:"",
        fechaFinalizacion:""
    };
    const { handleSubmit, control, setError } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues
    });

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
                <Box component="form" noValidate onSubmit={handleSubmit((data) => crearEvento(data))} sx={{ mt: 1, width: '100%' }}>
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
                                id="title"
                                label="Titulo"
                                name="title"
                                autoComplete="organization"
                                error={Boolean(error)}
                                helperText={error ? formState.errors.title.message : null}
                            />
                        )}
                    />
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}