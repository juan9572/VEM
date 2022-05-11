import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const MainCarousel = (banners) => {
    const settings = {
        autoPlay: true,
        animation: "fade",
        duration: 1000,
        indicators: false,
        interval: 6000
    };
    return (
        <div>
            <Carousel
                className="MainCarousel"
                {...settings}
            >
                {
                    banners.banners.map((item, index) => {
                        return <Project item={item} key={index} />
                    })
                }
            </Carousel>
            <br />
        </div>
    )
}
function Project({ item }) {
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#ffffff',
                mb: 2,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${item.image})`,
                height: 350
            }}
        >
            {<img style={{ display: 'none' }} src={item.image} alt={"Error"} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 2, md: 5 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
                            {item.titulo}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Typography variant="h6" color="inherit" paragraph>
                                    {item.fecha}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" paragraph>
                                    {item.lugar}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h8" color="inherit" paragraph>
                            {item.descripcion}
                        </Typography>
                        <Button variant="outlined" href={item.linkEvento} color="inherit" style={{ borderRadius: 28 }}>Ver evento</Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default MainCarousel;