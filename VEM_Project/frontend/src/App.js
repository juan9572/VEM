import React from 'react';
import ResponsiveAppBar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './components/Paginas/Inicio';
import EventosFinalizados from './components/Paginas/EventosFinalizados';
import Mapa from './components/Paginas/Mapa';
import EventoIndividual from './components/Paginas/EventoIndividual';
import LoginPublicitario from './components/AccesoUsuarios/Publicitario/loginPublicitario';
import LoginCliente from './components/AccesoUsuarios/Cliente/loginCliente';
import RegisterPublicitario from './components/AccesoUsuarios/Publicitario/registerPublicitario';
import RegisterCliente from './components/AccesoUsuarios/Cliente/registerCliente';
import Footer from './components/Footer';
import Plantilla from './components/Paginas/PlantillaEvento';
import ProfielCliente from './components/Paginas/ProfielCliente';
import Page404 from './components/Paginas/404';
import { AuthProvider } from './components/Auth/AuthProvider';
import PrivateRoute from './components/Paginas/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/*<ResponsiveAppBar />*/}
        <Routes>
          {/*Rutas publicas accesibles por todos los usuarios*/}
          <Route path="/" element={<Inicio />} />
          <Route path="/EventosFinalizados" element={<EventoIndividual />} />
          <Route path="/EventosFinalGeneral" element={<EventosFinalizados />} />
          {/* Lista de eventos finalizados de cada uno de los publicitarios*/}
          <Route path="/Mapa" element={<Mapa />} />
          <Route path="/ListaPublicitarios" element={null} />  {/*Hacer esta página*/}
          {/* Pefiles de publicitarios todos los que hayan */}
          <Route path="/Login-Publicitario" element={<LoginPublicitario />} />
          <Route path="/Login-Cliente" element={<LoginCliente />} />
          <Route path="/Register-Publicitario" element={<RegisterPublicitario />} />
          <Route path="/Register-Cliente" element={<RegisterCliente />} />
          {/* Fin de rutas publicas */}
          {/* Rutas accesibles por usuario con rol de cliente */}
          {/* Rutas publicas + las siguientes */}
          <Route path="/Profile/:username" element={<ProfielCliente />} />
          {/* Fin de rutas accesibles por usuario con rol de cliente  */}
          {/* Rutas accesibles por usuario con rol de publicitario */}
          {/* Rutas publicas + las siguientes */}
          <Route path="/PlantillaEvento" element={<Plantilla />} />
          {/*<Route path="/Dashboard-Estadisticas" element={null} />
          <Route path="/CrearEventos" element={null} />
          <Route path="/EditarEventos" element={null} />
          <Route path="/BorrarEventos" element={null} />
          <Route path="/CrearBannerEvento" element={null} />
          <Route path="/EditarBannerEvento" element={null} />
          <Route path="/EditarPerfil" element={null} />*/}
          {/* Perfiles de publicitarios*/}
          {/* Fin de rutas accesibles por usuario con rol de publicitario  */}
          {/* Error 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
        {/*<Footer />*/}
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;