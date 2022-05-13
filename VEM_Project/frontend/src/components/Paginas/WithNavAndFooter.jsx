import React from 'react';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

export default function withNav () {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer/>
    </>
  );
};