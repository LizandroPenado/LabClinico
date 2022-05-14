import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import { Routes, Route } from "react-router-dom";
import InicioSesion from './componentes/Login/Login';
import Inicio from './componentes/Home/Inicio';
import Usuario from './componentes/Usuario/Usuario';
import Rol from './componentes/Rol/Rol';
import AuthUser from './componentes/Login/AuthUser';
import Navbar from './componentes/Layout/Navbar';
import RegistrarPaciente from './componentes/Paciente/RegistrarPaciente';

function App() {
  const { getToken } = AuthUser();

 /*  if (!getToken()) {
    return <InicioSesion />
  } */
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/rol" element={<Rol />} />
          <Route path="/registrarPaciente" element={<RegistrarPaciente />} />
        </Routes>
        <footer className='fixed-bottom pie'>
          <Typography variant='body2' color='textSecondary' align='center'>
            {"Copyrigth © "}
            SILAC
            {" " + new Date().getFullYear()}
            {"."}
          </Typography>
        </footer>
      </main>
    </>
  );
}

export default App;