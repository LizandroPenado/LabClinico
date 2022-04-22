import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InicioSesion from './componentes/Login/InicioSesion';
import Inicio from './componentes/Home/Inicio';
import Usuario from './componentes/Usuario/Usuario';
import Rol from './componentes/Rol/Rol';

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" exact component={InicioSesion} />
          <Route path="/inicio" component={Inicio} />
          <Route path="/usuario" component={Usuario} />
          <Route path="/rol" component={Rol} />
        </Switch>
      </Router>
      <footer className='fixed-bottom pie'>
        <Typography variant='body2' color='textSecondary' align='center'>
          {"Copyrigth © "}
          SILAC
          {" " + new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </main>
  );
}



export default App;
