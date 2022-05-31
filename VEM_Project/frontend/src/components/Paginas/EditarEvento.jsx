import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PetsIcon from '@mui/icons-material/Pets';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import useAuth from '../Auth/useAuth';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

const drawerWidth = 300;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function EditarEvento() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();

    const dashboard = {
        text: "Dashboard",
        icon: <HomeIcon />,
        router: "/Dashboard"
    };

    const [pins, setPins] = React.useState([]);
    const [totalPins, setTotalPins] = React.useState([]);

    const buscarPorRegex = async (evento) => {
        console.log(evento.target.value);
        try {
          if (evento.target.value == "") {
            setPins(totalPins)
          } else {
            const res = await axios.post("/api/publicitarios/getBusquedaEvento", [evento.target.value]);
            setPins(res.data)
          }
        } catch (err) {
          console.log(err);
        }
      }

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
                                <Search onKeyUp={buscarPorRegex}>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Buscar..."
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                                <Divider variant="inset" />
                                <Paper style={{ maxHeight: 530, overflow: 'auto' }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 400,
                                            bgcolor: 'background.paper',
                                        }}
                                    >
                                        {pins.map((evento, index) => (
                                            <div key={index}>
                                                <ListItem sx={{ bgcolor: evento.category === "Mascotas" ? 'rgba(0, 106, 149, 0.05)' : evento.category === "Arte y cultura" ? 'rgba(151, 15, 242, 0.05)' : evento.category === "Deportes" ? 'rgba(3, 145, 69, 0.05)' : 'rgba(255, 20, 0, 0.05)' }}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: evento.category === "Mascotas" ? 'rgba(0, 106, 149, 1)' : evento.category === "Arte y cultura" ? 'rgba(151, 15, 242, 1)' : evento.category === "Deportes" ? 'rgba(3, 145, 69, 1)' : 'rgba(255, 20, 0, 1)' }}>
                                                            {evento.category === "Mascotas" && (
                                                                <PetsIcon />
                                                            )}
                                                            {evento.category === "Arte y cultura" && (
                                                                <TheaterComedyIcon />
                                                            )}
                                                            {evento.category === "Gastronomia" && (
                                                                <FoodBankIcon />
                                                            )}
                                                            {evento.category === "Deportes" && (
                                                                <SportsVolleyballIcon />
                                                            )}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={evento.title} secondary={evento.category} />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </div>
                                        ))}
                                    </List>
                                </Paper>
                            </Paper>
                    </Box>
                </Grid>
                <Footer />
            </Box>
        </Box>
    );
}
