import React from 'react';
import './app.css';
import {Navbar} from './components';
import {Footer,Header,Map} from './containers';

const App = () => {
  return (
    <div className="App">
      <div className="navbar-content">
        <Navbar/>
      </div>
      <Header/>
      <Map/>
      <Footer/>
    </div>
  )
}

export default App