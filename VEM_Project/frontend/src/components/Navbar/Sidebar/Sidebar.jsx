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
import HomeIcon from '@mui/icons-material/Home'; import AppBar from '../NavbarP';
import Footer from '../../Footer';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Graph from '../../Graph';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Auth/useAuth';
import axios from 'axios';
import Grid from '@mui/material/Grid';

const drawerWidth = 300;

export default function Sidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();
    const [ponde,setPonderado] = React.useState({})
    const [followers,setFollowers] = React.useState(0)

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

    useEffect(() => { //Toma todos los eventos que hay
        const getPonderado = async () => {
          try {
            const res = await axios.post("/api/publicitarios/getPonderadoEventos", [auth.user.username]);
            const aaa = await axios.post("/api/publicitarios/getCantidadFollowers", [auth.user.username]);
            let cantidad = aaa.data
            let ponderado = res.data
            setPonderado(ponderado)
            setFollowers(cantidad)
            
          } catch (err) {
            console.log(err);
          }
        }
        getPonderado();
      }, []);

    const handleClick = () => {
        setOpen(!open);
    };

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
                        <ListItem key={dashboard.text} onClick={() => {return navigate(dashboard.router)}}disablePadding>
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
                                        <List component="div" onClick={() => {return navigate(data.router)}} disablePadding key={index}>
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
                <Typography sx={{ "&:hover": { color: "#347aeb" }, cursor: "pointer" }}>Followers: {followers}</Typography>
                <Grid item xs={3}><Graph evento={ponde} /></Grid>
                <Footer />
            </Box>
        </Box>
    );
}
