import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveAppBar from './components/Navbar/Navbar.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Inicio from './components/Paginas/Inicio';
import EventosFinalizados from './components/Paginas/EventosFinalizados';
import Mapa from './components/Paginas/Mapa';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/EventosFinalizados" element={<EventosFinalizados />} />
        <Route path="/Mapa" element={<Mapa />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);