import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import InicioSesion from './componentes/Login/Login';
import AuthUser from './componentes/Login/AuthUser';
import Navbar from './componentes/Layout/Navbar';
import Rutas from './componentes/Router/Rutas';

function App() {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <InicioSesion />
  }
  return (
    <>
      <Navbar />
      <main className='pt-5'>
        <Rutas />
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