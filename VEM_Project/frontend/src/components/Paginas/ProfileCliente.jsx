import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Imagen from '../../FondoProfile.jpg';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../Auth/useAuth';

export default function ProfielCliente() {
    const ImagenProfile = "../../frontend/src/img"
    const navigate = useNavigate();
    const auth = useAuth();
    const { username } = useParams();
    const [usuario, setUsuario] = useState({});
    const [cantidadSeguidos, setCantidad] = useState(0)
    useEffect(() => { //Toma todos los eventos que hay
        if (username !== auth.user.username) {
            navigate("*");
        }
        const getData = async () => {
            try {
                const name = { "username": username };
                const res = await axios.post("/api/clientes/getCliente", name);
                setUsuario({
                    "name": res.data.username,
                    "email": res.data.email,
                    "createdAt": res.data.createdAt.substring(0, 10),
                    "age": res.data.age,
                    "seguidos": res.data.seguidos,
                    "imagePerfil": res.data.imagePerfil
                });
                setCantidad(usuario.seguidos.length);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    });
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
                                <Grid container>
                                    <Grid item xs mt={2}>
                                        <Stack textAlign="center">
                                            <Typography fontWeight="600" sx={{ "&:hover": { color: "#347aeb" }, cursor: "pointer" }} variant="h6">{cantidadSeguidos}</Typography>
                                            <Typography sx={{ "&:hover": { color: "#347aeb" }, cursor: "pointer" }}>Seguidos</Typography>
                                        </Stack>
                                    </Grid>
                                    {usuario.imagePerfil ? (
                                        <Grid item xs={4}>
                                            <Avatar
                                                src={process.env.PUBLIC_URL + `/img/${auth.user.image}`}
                                                sx={{ width: 140, height: 140, transform: 'translateY(-30%)', position: 'absolute' }}
                                            />
                                        </Grid>
                                    ) : null}
                                    <Grid item mt={2} mr={14}>
                                        <Button variant="contained" onClick={() => { navigate(`/Profile/${auth.user.username}/editProfile`) }}>Editar perfil</Button>
                                    </Grid>
                                </Grid>
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
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                                    <Typography mt={1} fontWeight="600" variant="h5">{usuario.name}</Typography>
                                    {usuario.age !== -1 ? <Typography mt={1} fontWeight="0" variant="h5">, {usuario.age} años</Typography> : null}
                                </Grid>
                                <Grid item xs={2} textAlign="center">
                                    <Typography mt={6} fontWeight="0" variant="h6">Te uniste el día</Typography>
                                    <Typography mt={1} fontWeight="600" variant="h6">{usuario.createdAt}</Typography>
                                    <Typography fontWeight="600" variant="subtitle2">YYYY-MM-DD</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography mt={6} fontWeight="0" variant="h6">{usuario.email}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}
