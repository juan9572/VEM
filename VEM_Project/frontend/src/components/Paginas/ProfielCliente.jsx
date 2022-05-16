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


export default function ProfielCliente() {
    const { username } = useParams();
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
                                            <Typography fontWeight="600" sx={{"&:hover":{color:"#347aeb"},cursor:"pointer"}} variant="h6">22</Typography>
                                            <Typography sx={{"&:hover":{color:"#347aeb"},cursor:"pointer"}}>Seguidos</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={ImagenProfile}
                                            sx={{ width: 140, height: 140, transform: 'translateY(-30%)', position: 'absolute' }}
                                        />
                                    </Grid>
                                    <Grid item mt={2} mr={14}>
                                        <Button variant="contained">Editar perfil</Button>
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
                            paddingBottom:5,
                            marginBottom:5
                        }} elevation={3} >
                            <Typography mt={1} fontWeight="600" variant="h5">{username}</Typography>
                            <Stack>
                                <Typography mt={1} fontWeight="0" variant="h5">, 19 años</Typography>
                                <Typography mt={23} fontWeight="0" variant="h6">Te uniste el día</Typography>
                            </Stack>
                            <Typography mt={1} fontWeight="600" variant="h6">2020-02-20</Typography>
                                Esta distribución esta lo más de fea tengo que arreglarla :,(
                            <Typography mt={23} fontWeight="0" variant="h6">jrinconusma@gmail.com</Typography>

                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}
