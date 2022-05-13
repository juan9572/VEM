import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './components/Paginas/Inicio';
import EventosFinalizados from './components/Paginas/EventosFinalizados';
import Mapa from './components/Paginas/Mapa';
import EventoIndividual from './components/Paginas/EventoIndividual';
import LoginPublicitario from './components/AccesoUsuarios/Publicitario/loginPublicitario';
import LoginCliente from './components/AccesoUsuarios/Cliente/loginCliente';
import RegisterPublicitario from './components/AccesoUsuarios/Publicitario/registerPublicitario';
import RegisterCliente from './components/AccesoUsuarios/Cliente/registerCliente';
import Plantilla from './components/Paginas/PlantillaEvento';
import ProfielCliente from './components/Paginas/ProfielCliente';
import Page404 from './components/Paginas/404';
import AuthProvider from './components/Auth/AuthProvider';
import PublicRoute from './components/Paginas/PublicRoute';
import PrivateRouteC from './components/Paginas/PrivateRouteC';
import WithNav from './components/Paginas/WithNavAndFooter';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/" element={<Inicio />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/EventosFinalizados/:_id" element={<EventoIndividual />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/EventosFinalGeneral" element={<EventosFinalizados />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/Mapa" element={<Mapa />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/ListaPublicitarios" element={null} />  {/*Hacer esta página*/}
          </Route>
          <Route element={<WithNav />}>
            <Route path="/Profile/:username" element={<PrivateRouteC />}>
              <Route path="/Profile/:username" element={<ProfielCliente />} />
            </Route>
          </Route>
          {/* Lista de eventos finalizados de cada uno de los publicitarios*/}
          {/*Rutas publicas accesibles por todos los usuarios*/}
          <Route path="/Login-Publicitario" element={<PublicRoute />}>
            <Route path="/Login-Publicitario" element={<LoginPublicitario />} />
          </Route>
          <Route path="/Login-Cliente" element={<PublicRoute />}>
            <Route path="/Login-Cliente" element={<LoginCliente />} />
          </Route>
          <Route path="/Register-Publicitario" element={<PublicRoute />}>
            <Route path="/Register-Publicitario" element={<RegisterPublicitario />} />
          </Route>
          <Route path="/Register-Cliente" element={<PublicRoute />}>
            <Route path="/Register-Cliente" element={<RegisterCliente />} />
          </Route>
          {/* Pefiles de publicitarios todos los que hayan */}

          {/* Fin de rutas publicas */}
          {/* Rutas accesibles por usuario con rol de cliente */}
          {/* Rutas publicas + las siguientes */}
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
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;