import React from 'react';
import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room } from "@material-ui/icons";
import axios from 'axios';
import useAuth from '../Auth/useAuth';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PetsIcon from '@mui/icons-material/Pets';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import Link from '@mui/material/Link';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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

function ReactMap() {
  const auth = useAuth();
  const [viewState, setViewState] = useState({
    latitude: 6.25184,
    longitude: -75.56359,
    zoom: 11
  });
  const [totalPins, setTotalPins] = useState([]);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState();

  const filtros = [
    {
      titulo: "Arte y cultura",
      icon: <TheaterComedyIcon sx={{ fontSize: 40 }} />,
      color: 'rgba(151, 15, 242, 1)',
      onClick: async () => {
        try {
          const res = await axios.post("/api/publicitarios/filtrarEvento", ["Arte y cultura"]);
          setPins(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    },
    {
      titulo: "Deportes",
      icon: <SportsVolleyballIcon sx={{ fontSize: 40 }} />,
      color: 'rgba(3, 145, 69, 1)',
      onClick: async () => {
        try {
          const res = await axios.post("/api/publicitarios/filtrarEvento", ["Deportes"]);
          setPins(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    },
    {
      titulo: "Gastronomia",
      icon: <FoodBankIcon sx={{ fontSize: 40 }} />,
      color: 'rgba(255, 20, 0, 1)',
      onClick: async () => {
        try {
          const res = await axios.post("/api/publicitarios/filtrarEvento", ["Gastronomia"]);
          setPins(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    },
    {
      titulo: "Mascotas",
      icon: <PetsIcon sx={{ fontSize: 40 }} />,
      color: 'rgba(0, 106, 149, 1)',
      onClick: async () => {
        try {
          const res = await axios.post("/api/publicitarios/filtrarEvento", ["Mascotas"]);
          setPins(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  ];

  const limpiarFiltros = async () => {
    try {
      const res = await axios.get("/api/publicitarios/getEventos");
      let eventos = [];
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < res.data[i].eventosCreados.length; j++) {
          res.data[i].eventosCreados[j].publicitario = res.data[i].username;
          eventos.push(res.data[i].eventosCreados[j]);
        }
      }
      setPins(eventos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getEventos = async () => {
      try {
        const res = await axios.get("/api/publicitarios/getEventos");
        console.log(res.data);
        setPins(res.data);
        setTotalPins(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getEventos();
  }, []);

  const handleMarkerClick = async (id, lat, long) => { //Para los popups de los eventos
    setViewState({ ...viewState, latitude: lat, longitude: long }); //Centra la atención del usuario en el popup
    setCurrentPlaceId(id);
    try {
      const res = await axios.post("/api/publicitarios/interaccionEvento", [id]);
    } catch (err) {
      console.log(err);
    }
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buscarPorRegex = async (evento) => {
    try {
      if (evento.target.value === "") {
        setPins(totalPins)
      } else {
        const res = await axios.post("/api/publicitarios/getBusquedaEvento", [evento.target.value]);
        setPins(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    handleMarkerClick(pins[index]._id,pins[index].latitude,pins[index].long);
  };

  const defaultValueForCurrentPlace = () => {
    setCurrentPlaceId(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ paddingBlock: "0", marginBlock: "0" }}
                aria-label="full width tabs example">
                <Tab label="Eventos" {...a11yProps(0)} />
                <Tab label="Filtros" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
                        <ListItemButton
                          selected={selectedIndex === index}
                          onClick={() => handleListItemClick(index)}
                        >
                          <ListItem sx={{ bgcolor: evento.category === "Mascotas" ? 'rgba(0, 106, 149, 0.05)' : evento.category === "Arte y cultura" ? 'rgba(151, 15, 242, 0.05)' : evento.category === "Deportes" ? 'rgba(3, 145, 69, 0.05)' : 'rgba(255, 20, 0, 0.05)'}}>
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
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                  </List>
                </Paper>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Button onClick={limpiarFiltros}> Limpiar filtros</Button>
              {filtros.map((tier, index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    mr={5}
                  >
                    <Card sx={{
                      maxWidth: 400,
                      maxHeight: 150,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      backgroundColor: '#FBFBFB'
                    }} variant="outlined">
                      <CardActionArea component={Button} onClick={tier.onClick}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}>
                          <Avatar style={{ alignSelf: 'center' }} sx={{ mt: 1, bgcolor: `${tier.color}`, width: 40, height: 40, }}>
                            {tier.icon}
                          </Avatar>
                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {tier.titulo}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </React.Fragment>
              ))}
            </TabPanel>
          </Box>
        </Grid>
        <Grid item xs={6} md={8}>
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: 890, height: 570 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          >
            {pins.map((evento, index) => ( //Es un for-each
              <div key={index}>
                <Marker longitude={evento.long} latitude={evento.latitude}//Pone el puntero en la latitud y longitud
                  offsetLeft={viewState.zoom * 2} offsetTop={viewState.zoom * 2} anchor="bottom">
                  <Room
                    style={{ fontSize: viewState.zoom * 4, color: evento.category === "Mascotas" ? 'rgba(0, 106, 149, 1)' : evento.category === "Arte y cultura" ? 'rgba(151, 15, 242, 1)' : evento.category === "Deportes" ? 'rgba(3, 145, 69, 1)' : 'rgba(255, 20, 0, 1)', cursor: "pointer" }}
                    onClick={() => { handleMarkerClick(evento._id, evento.latitude, evento.long); }}//Cuando se le de click sale el pop up
                  />
                </Marker>
                {evento._id === currentPlaceId?( //si se le dio click a alguno sale el popup
                  <Popup
                    longitude={evento.long}
                    latitude={evento.latitude}
                    anchor="bottom"
                    closeOnClick={true}
                    closeButton={true}
                    maxWidth={345}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#2692E1" }} aria-label="recipe">
                            {evento.publicitario}
                          </Avatar>
                        }
                        title={evento.publicitario}
                        subheader={`De ${evento.fechaInicio.substring(0, 10)} a ${evento.fechaFinalizacion.substring(0, 10)}`}
                      />
                      <CardHeader
                        title={evento.title}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {evento.description}
                        </Typography>
                      </CardContent>
                      <CardActions spacing={4}>
                        <Link href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&amp" src="sdkpreparse" target="_blank" rel="noreferrer" color="inherit">
                          <ShareIcon sx={{ fontSize: 20 }} />
                        </Link>
                        {evento.link ?
                          <Link href={evento.link} target="_blank" rel="noreferrer" color="inherit">
                            Ver más
                          </Link> : null}
                      </CardActions>
                    </Card>
                  </Popup>
                ):defaultValueForCurrentPlace}
              </div>
            ))}
          </Map>
        </Grid>
      </Grid>
    </Box >
  );
}
export default ReactMap;