import React, { useState } from 'react';
import { Card, Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import './InicioSesion.css';
import LoginIcon from '@mui/icons-material/Login';
import Swal from 'sweetalert2';
/*  import { sha256 } from 'js-sha256';
import axios from 'axios'; */
import AuthUser from './AuthUser';
import PersonIcon from '@mui/icons-material/Person';


export default function Login() {
  /* const [respuesta, setRespuesta] = useState("");
  const [errorContra, setErrorContra] = useState(0);*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { http, setToken } = AuthUser();

  /* const handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  }; */

  /* const validarCredenciales = async (e) => {
    var contra = sha256(this.state.form.password);
    Swal.fire({
      icon: 'info',
      title: 'Credenciales',
      html: 'usuario: ' + this.state.form.usuario + '<br/><br/> contraseña: ' + contra,
    }) */
  /* axios.get("URL", {
    params: {
      usuario: this.state.form.usuario,
      password: contra
    }
  }).then((response) => {
    console.log(response.data);
    //INICIO DE SESION

  }).catch((error) => {
    console.log(error.request.status);
    //LIMPIAR FORMULARIO

    //CONTAR ERRORES DE CONTRASEÑA

    //BLOQUEAR USUARIO A LOS 3 INTENTOS FALLIDOS DE CONTRASEÑA, MANDAR MENSAJE AL 3 FALLO

    Swal.fire({
      icon: 'error',
      title: 'Usuario o contraseña no valido',
      html: 'Verifique los datos ingresados e intente nuevamente.',
    })
  }) 
}*/

  const ingresar = () => {
    http.post('/login', { email: email, password: password }).then((response) => {
      setToken(response.data.user, response.data.access_token);
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña no valido',
        html: 'Verifique los datos ingresados e intente nuevamente.',
      })
      errorDatos();
    })
  }

  const errorDatos = () => {
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    setEmail("");
    setPassword("");
  }

  return (
    <>
      {/* <Navbar/> */}
      <Container className="pt-5 form-container">
        <Card className="login-form">
          <Card.Body className='fondo'>
            <Card.Title className="text-center titulo">
              <PersonIcon className='icono-titulo' />{' '}
              Inicio sesión
            </Card.Title>
            <Card.Text>
              <Form className="formulario" validated={true}>
                <Form.Group>
                  <FloatingLabel label="Usuario" className="mb-4">
                    <Form.Control
                      type="email"
                      id="usuario"
                      name="usuario"
                      placeholder="Kaleb"
                      /* minLength="4"
                      maxLength="15" */
                      required={true}
                      /* value={form.usuario}
                      onChange={this.handleChange} */
                      onChange={e => setEmail(e.target.value)}
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
                      required={true}
                      /*  value={form.password}
                       onChange={this.handleChange} */
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
                className="boton d-flex justify-content-center"
                onClick={ingresar}
              /* onClick={() => this.validarCredenciales()} */>
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
