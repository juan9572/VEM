import React from 'react'
import Box from '@mui/material/Box';
import SVG404 from '../../Pagina404.svg'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function Page404() {
    let navigate = useNavigate();
    const handleOnClick = () => {
      return navigate("/");
    };
    return (
        <Box container component="main"
            sx={{
                height: "100vh",
                backgroundImage: `url(${SVG404})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                color: '#ffffff'
            }}
        >
            <Typography color="inherit" variant="h3" pt={4}>
                - Error 404 -
            </Typography>
            <Typography color="inherit" variant="h5">
                Parece que esta página ya no esta disponible.
            </Typography>
            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                color="inherit"
                size="large"
                onClick={handleOnClick}
              >
                Volver al inicio
              </Button>
        </Box>
    )
}
export default Page404;