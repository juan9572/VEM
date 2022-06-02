import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import Logo from '../../Logo.svg';
import useAuth from '../Auth/useAuth';
import Imagen from '../Paginas/vsco5c3ca40baab64.jpg';
import { useNavigate } from 'react-router-dom';

const pages = [{ 'Nav': 'Inicio', 'Router': '' }, { 'Nav': 'Mapa', 'Router': 'Mapa' }, { 'Nav': 'Eventos Finalizados', 'Router': 'EventosFinalGeneral' }];
const settings = [];

const ResponsiveAppBar = () => {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isLogged() && auth.isPublicitario()) {
      let l = settings.length;
      for(let i = 0; i < l;i++){
        settings.pop();
      }
      settings.push("Profile");
      settings.push("Dashboard");
      settings.push("Logout");
    }else{
      let l = settings.length;
      for(let i = 0; i < l;i++){
        settings.pop();
      }
      settings.push("Profile");
      settings.push("Logout");
    }
  }, []);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOptionsMenu = (event) => {
    if (event === "Profile") {
      navigate(`/Profile/${auth.user.username}`);
    } else if (event === "Dashboard") {
      navigate(`/Dashboard`);
    } else {
      auth.logout();
      navigate("/");
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#ffffff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={'/'}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img src={Logo} style={{ width: 150 }} alt="logo" />
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ "color": "#909090" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/${page.Router}`}>
                    <Typography textAlign="center">
                      {page.Nav}
                    </Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={Logo} style={{ width: 100 }} alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/${page.Router}`}>
                  <Typography textAlign="center">
                    {page.Nav}
                  </Typography>
                </NavLink>
              </Button>
            ))}
          </Box>
          {auth.isLogged() ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={process.env.PUBLIC_URL + `/img/${auth.user.image}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={() => handleOptionsMenu(setting)}>
                    <Typography textAlign="center">{setting} </Typography>
                  </MenuItem>
                ))}

              </Menu>
            </Box> :
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={"/Login-Cliente"}>
              <Typography textAlign="center">
                Login
              </Typography>
            </NavLink>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;