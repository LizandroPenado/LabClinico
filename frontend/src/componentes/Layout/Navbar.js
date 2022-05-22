import React, { useState, useEffect } from 'react';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import Logo from './Logo';
import { Button, NavbarBrand } from 'react-bootstrap';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import AuthUser from '../Login/AuthUser';

export default function NavbarBase() {
  const { token, logout } = AuthUser();
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
  const [fecha, setFecha] = useState();

  useEffect(() => {
    fetchUserDetail();
    var hoy = new Date();
    //var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    setFecha(hoy.toLocaleDateString());
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
                  <Link to={"/inicio"} className="opciones">{<HomeIcon />} {' '} {"Inicio"}</Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    userdetail.rol_id === item.rol ? (
                      < li key={index} className="lista-opciones" >
                        <Link to={item.path} className="opciones">{item.icon} {' '} {item.title}</Link>
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