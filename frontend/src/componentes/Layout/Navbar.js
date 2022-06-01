import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from './Logo';
import { Button } from 'react-bootstrap';
import { Container, Navbar, Nav, Offcanvas, Row, Col } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router-dom";
import AuthUser from '../Login/AuthUser';
import Swal from 'sweetalert2';

export default function NavbarBase() {
  const { token, logout } = AuthUser();
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [menu, setMenu] = useState([]);
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    fetchUserDetail();
    var hoy = new Date();
    //var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    setFecha(hoy.toLocaleDateString());
    getMenus();
  }, []);

  useEffect(() => {
    var hoy = new Date();
    /* var hora = hoy.getHours() + ':' + hoy.getMinutes(0,0)+ ':' + hoy.getSeconds() ; */
    //var hora = hoy.setHours(0, 0, 0, 0);
    var hora = hoy.toLocaleTimeString();
    setHora(hora);
    setUrl(location.pathname);
  }, [location]);

  const fetchUserDetail = () => {
    http.post('/me').then((res) => {
      setUserdetail(res.data);
    });
  }
  const logoutUSer = () => {
    if (token !== undefined) {
      logout();
      Toast.fire({
        icon: 'info',
        title: 'Ha cerrado sesión, hasta pronto'
      })
    }
  }
  const getMenus = () => {
    http.get('/menu').then((res) => {
      setMenu(res.data);
    });
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  return (
    <>
      <Navbar className='navbar' expand={false} fixed='top' collapseOnSelect>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="despliegue"/>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="menu"
          >
            <Offcanvas.Header closeButton className='informacion' closeLabel='Close'>
              <Logo />
              <Offcanvas.Title id="offcanvasNavbarLabel">SILAC</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link eventKey={"inicio"} className="lista-opciones">
                    <Link to={"/inicio"} className={"opciones" + (url === "/inicio" ?" active" : "")}> Inicio </Link>
                  </Nav.Link >
                  {menu.map((item) => {
                    return (
                      userdetail.rol_id === item.rol_id ? (
                        < Nav.Link  eventKey={item.url} className="lista-opciones" >
                          <Link to={item.url} className={"opciones" + (url === item.url ?" active" : "")}>{item.titulo}</Link>
                        </Nav.Link >
                      ) : (
                        <span></span>
                      )
                      /*  < li key = { index } className = "lista-opciones" >
                         <Link to={item.path} className="opciones">{item.icon} {' '} {item.title}</Link>
                       </li> */
                    );
                  })}
                </Nav>
              </Navbar.Collapse>
            </Offcanvas.Body>
            <Button variant='danger' onClick={logoutUSer}><LogoutIcon /> Cerrar Sesión</Button>
          </Navbar.Offcanvas>
          {/* <NavbarBrand> */}
          <Row className='text-center'>
            <Col>
              <span className='info'>Fecha:</span><br />
              <span className='hora'>{fecha}</span>
            </Col>
            {/* <Col>
              <span className='hora'>Hora: <br/>{hora}</span> {' '}
              </Col> */}
            <Col>
              <span className='info'>Usuario:</span><br />
              <span className='usuario'>{userdetail.name}</span>
            </Col>
          </Row>
          {/* <Button variant='danger' size='sm' onClick={logoutUSer}>
              <LogoutIcon />
            </Button> */}
          {/* </NavbarBrand> */}
        </Container>
      </Navbar>
    </>
  );
}