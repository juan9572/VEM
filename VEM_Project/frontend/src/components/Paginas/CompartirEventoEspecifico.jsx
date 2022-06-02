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
import CampaignIcon from '@mui/icons-material/Campaign';
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const drawerWidth = 300;

export default function PlantillaEvento() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();
    const [errorServidor, setErrorServidor] = React.useState(false);
    const { nombreEvento } = useParams();
    const [file, setFile] = React.useState();
    const [image,setImage] = React.useState();
    const form = new FormData();

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    };

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

    const subirBanner = async (data) => {
        try {
            form.append("username",auth.user.username);
            form.append("id",nombreEvento);
            form.append("sitio",data.sitio);
            form.append("image",image);
            const resEvento = await axios.post("/api/publicitarios/upload", form, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`
                }}); //Se llama a la Api para que los guarde
            navigate("/Dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const { handleSubmit, control, setError } = useForm({
        mode: 'all',
        reValidateMode: 'onSumbit',
        shouldFocusError: false,
        defaultValues: { sitio: "" }
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
                <Typography variant="h3">Promociona tu evento con un banner</Typography>
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
                <Box component="form" noValidate onSubmit={handleSubmit((data) => subirBanner(data))}
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
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ border: '1px solid #D9F1FF', backgroundColor: "#F7FCFF" }}
                        >
                            <Grid item xs={4}>
                                <Controller
                                    control={control}
                                    name="sitio"
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
                                            label="Lugar del evento"
                                            name="sitio"
                                            error={Boolean(error)}
                                            helperText={error ? formState.errors.sitio.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div className="App">
                                    <h2>Banner:</h2>
                                    <input type="file" onChange={imageHandler} />
                                    <img src={file} />
                                </div>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 5 }}
                                >
                                    Editar evento
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
