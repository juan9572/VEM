import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PinDropIcon from '@mui/icons-material/PinDrop';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '../Navbar/NavbarP';
import Footer from '../Footer';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth/useAuth';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';

const drawerWidth = 300;

export default function EditarEvento() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();

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
        },
        {
            text: "Muestra tu eventos",
            icon: <CampaignIcon />,
            router: "/Dashboard/CompartirEvento"
        }
    ];

    const [rows, setRows] = React.useState([]);

    const handleClick = () => {
        setOpen(!open);
    };

    React.useEffect(() => { //Toma todos los eventos que hay
        const getEventos = async () => {
            try {
                const res = await axios.post("/api/publicitarios/getEventosSamePublicitario", [auth.user.username]);
                let eventos = [];
                res.data.forEach(evento => eventos.push({
                    id: evento._id,
                    titulo: evento.title,
                    categoria: evento.category,
                    rating: evento.rating ? evento.rating : 0,
                    fechaInicio: evento.fechaInicio.substring(0, 10),
                    fechaFinalizacion: evento.fechaFinalizacion.substring(0, 10)
                }));
                setRows(eventos);
            } catch (err) {
                console.log(err);
            }
        }
        getEventos();
    }, []);

    const editEvent = React.useCallback(
        (id) => () => {
            return navigate(`/Dashboard/CompartirEvento/${id}`)
        },
        [],
    );

    const [openDialog, setOpenDialog] = React.useState(false);
    const [select, setSelect] = React.useState(null);

    const columns = React.useMemo(
        () => [
            {
                field: 'titulo',
                headerName: 'Titulo',
                width: 250
            },
            {
                field: 'categoria',
                headerName: 'Categoria',
                type: 'singleSelect',
                valueOptions: [
                    'Arte y cultura',
                    'Deportes',
                    'Mascotas',
                    'Gastronomía',
                ],
                width: 150,
            },
            {
                field: 'rating',
                headerName: 'Rating',
                renderCell: (cellValues) => {
                    return (
                        <Rating name="read-only" value={cellValues.row.rating} readOnly />
                    );
                },
                width: 145,
            },
            {
                field: 'fechaInicio',
                headerName: 'Fecha Inicio',
                type: 'number',
                width: 140,
            },
            {
                field: 'fechaFinalizacion',
                headerName: 'Fecha Finalizacion',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 140,
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<CampaignIcon />}
                        label="Edit"
                        onClick={editEvent(params.id)}
                    />
                ],
            },
        ],
        [editEvent],
    );

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
                <Grid item xs={6} md={4}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%' }}>
                            <Divider variant="inset" />
                            <Paper style={{ maxHeight: 530, overflow: 'auto' }}>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Paper>
                        </Paper>
                    </Box>
                </Grid>
                <Footer />
            </Box>
        </Box>
    );
}
