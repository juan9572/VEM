import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveAppBar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './components/Paginas/Inicio';
import EventosFinalizados from './components/Paginas/EventosFinalizados';
import Mapa from './components/Paginas/Mapa';
import LoginPublicitario from './components/AccesoUsuarios/Publicitario/loginPublicitario';
import LoginCliente from './components/AccesoUsuarios/Cliente/loginCliente';
import RegisterPublicitario from './components/AccesoUsuarios/Publicitario/registerPublicitario';
import RegisterCliente from './components/AccesoUsuarios/Cliente/registerCliente';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/EventosFinalizados" element={<EventosFinalizados />} />
        <Route path="/Mapa" element={<LoginPublicitario />} />
        <Route path="/Login-Publicitario" element={<LoginPublicitario />} />
        <Route path="/Login-Cliente" element={<LoginCliente />} />
        <Route path="/Register-Publicitario" element={<RegisterPublicitario />} />
        <Route path="/Register-Cliente" element={<RegisterCliente />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);