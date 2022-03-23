import React from 'react';
import ReactDOM from 'react-dom';
import ReactMap from './components/Map/ReactMap.jsx';
import ResponsiveAppBar from './components/Navbar/Navbar.jsx';

ReactDOM.render(
  <React.StrictMode>
    <ResponsiveAppBar />
    <ReactMap />
  </React.StrictMode>,
  document.getElementById('root')
);