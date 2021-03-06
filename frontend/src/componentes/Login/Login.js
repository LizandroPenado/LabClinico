import React, { useState } from 'react';
import { Card, Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import './InicioSesion.css';
import LoginIcon from '@mui/icons-material/Login';
import Swal from 'sweetalert2';
import axios from 'axios';
import AuthUser from './AuthUser';
import PersonIcon from '@mui/icons-material/Person';

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { http, setToken } = AuthUser();

  const verficarEstado = async (e) => {
    e.preventDefault();
    if (name === "" || password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        html: 'Ingrese los campos solicitados en el formulario.',
      })
      return;
    }
    axios
      .get("http://127.0.0.1:8000/api/user/estado", {
        params: {
          name: name,
        },
      })
      .then((response) => {
        const estado = response.data;
        if (estado === "Activo") {
          ingresar();
          return;
        }
        Swal.fire({
          icon: 'warning',
          title: 'Bloqueado',
          html: 'Su usuario se encuentra bloqueado.',
        })
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña no valido',
          html: 'Verifique los datos ingresados e intente nuevamente.',
        })
        errorDatos();
      });
  }

  const ingresar = () => {
    http.post('/login', { name: name, password: password }).then((response) => {
      setToken(response.data.user, response.data.access_token, response.data.rol);
      Toast.fire({
        icon: 'success',
        title: name + ', has iniciado sesión'
      })
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña no valido',
        html: 'Verifique los datos ingresados e intente nuevamente.',
      })
      errorDatos();
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const errorDatos = () => {
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
    setPassword("");
    setName("");
  }

  return (
    <>
      <Container className="pt-5 form-container">
        <Card className="login-form">
          <Card.Body className='fondo'>
            <Card.Title className="text-center titulo">
              <PersonIcon className='icono-titulo' />{' '}
              Inicio sesión
            </Card.Title>
            <Card.Text>
              <Form className="formulario" noValidate>
                <Form.Group>
                  <FloatingLabel label="Usuario" className="mb-4">
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Kaleb"
                      maxLength={30}
                      required
                      onChange={e => setName(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel label="Contraseña">
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="*******"
                      autoComplete="nope"
                      required
                      minLength={8}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                className="boton d-flex justify-content-center"
                onClick={verficarEstado}>
                <LoginIcon />
                <span className="texto-boton">Ingresar</span>
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}
