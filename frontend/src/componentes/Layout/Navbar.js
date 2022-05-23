import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from './Logo';
import { Button, NavbarBrand } from 'react-bootstrap';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import AuthUser from '../Login/AuthUser';

export default function NavbarBase() {
  const { token, logout } = AuthUser();
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
  const [fecha, setFecha] = useState();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchUserDetail();
    var hoy = new Date();
    //var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    setFecha(hoy.toLocaleDateString());
    getMenus();
  }, []);

  const fetchUserDetail = () => {
    http.post('/me').then((res) => {
      setUserdetail(res.data);
    });
  }
  const logoutUSer = () => {
    if (token !== undefined) {
      logout();
    }
  }
  const getMenus = () => {
      http.get('/menu').then((res) => {
        setMenu(res.data);
      });
  }
  return (
    <>
      <Navbar className='navbar' expand={false}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="despliegue" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="menu"
          >
            <Offcanvas.Header closeButton className='informacion'>
              <Logo />
              <Offcanvas.Title id="offcanvasNavbarLabel">SILAC</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                < li key={"inicio"} className="lista-opciones" >
                  <Link to={"/inicio"} className="opciones"> Inicio </Link>
                </li>
                {menu.map((item) => {
                  return (
                    userdetail.rol_id === item.rol_id ? (
                      < li key={item.url} className="lista-opciones" >
                        <Link to={item.url} className="opciones">{item.titulo}</Link>
                      </li>
                    ) : (
                      <span></span>
                    )
                    /*  < li key = { index } className = "lista-opciones" >
                       <Link to={item.path} className="opciones">{item.icon} {' '} {item.title}</Link>
                     </li> */
                  );
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <NavbarBrand>
            <span className='hora'>{fecha}</span> {' '}
            <span className='usuario'>{userdetail.name}</span> {' '}
            <Button variant='danger' size='sm' onClick={logoutUSer}>
              <LogoutIcon />
            </Button>
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
}