import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Imagen from '../../FondoProfile.jpg';
import ImagenProfile from './vsco5c3ca40baab64.jpg';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import useAuth from '../Auth/useAuth';

export default function ProfielCliente() {
    const navigate = useNavigate();
    const auth = useAuth();
    const { username } = useParams();
    const [publi,setPubli] = useState({});
    const [alreadyFoll, setAlreadyFoll] = useState(false);
    useEffect(() => { //Toma todos los eventos que hay
        const getData = async () =>{ 
          try{
            const name = {"username": username};
            const res = await axios.post("/api/publicitarios/getPublicitarioIndividual",name);
            const aaa = await axios.post("/api/clientes/preguntaSeguido", [username, auth.user.username]);
            setAlreadyFoll(aaa.data)
            setPubli({
                "name":res.data.username,
                "email":res.data.email,
                "createdAt":res.data.createdAt.substring(0,10),
                "cantidad":res.data.eventosCreados.length
            });
            
          }catch(err){
            console.log(err);
          }
        }
        getData();
      });

    const follow = async (e) => {
        if (auth.user.rol != "C") {
            return navigate("/")
        }
        try {
            const aaaa = await axios.post("/api/clientes/seguir", [username, auth.user.username]); //Se llama a la Api para que los guarde
            setAlreadyFoll(aaaa.data)
          } catch (err) {
            console.log(err);
          }
    };
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
                                            <Typography fontWeight="600" sx={{ "&:hover": { color: "#347aeb" }, cursor: "pointer" }} variant="h6">{publi.cantidad}</Typography>
                                            <Typography sx={{ "&:hover": { color: "#347aeb" }, cursor: "pointer" }}>Eventos Creados</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Avatar
                                            src={ImagenProfile}
                                            sx={{ width: 140, height: 140, transform: 'translateY(-30%)', position: 'absolute' }}
                                        />
                                    </Grid>
                                    <Grid item mt={2} mr={14}>
                                        {alreadyFoll ? 
                                        <Button variant="contained" onClick={follow}>Unfollow</Button>
                                        :
                                        <Button variant="contained" onClick={follow}>Follow</Button>
                                        }
                                        
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
                                    <Typography mt={1} fontWeight="600" variant="h5">{publi.name}</Typography>
                                </Grid>
                                <Grid item xs={2} textAlign="center">
                                    <Typography mt={6} fontWeight="0" variant="h6">Se unio el día</Typography>
                                    <Typography mt={1} fontWeight="600" variant="h6">{publi.createdAt}</Typography>
                                    <Typography fontWeight="600" variant="subtitle2">YYYY-MM-DD</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography mt={6} fontWeight="0" variant="h6">{publi.email}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}