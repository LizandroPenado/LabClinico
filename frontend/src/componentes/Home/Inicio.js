import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Inicio.css'
import { Typography } from '@mui/material';
/* import Navbar from '../Layout/Navbar'; */
import AuthUser from '../Login/AuthUser';

function Inicio() {
    const [userdetail, setUserdetail] = useState('');
    const { http } = AuthUser();
    
    useEffect(() => {
        fetchUserDetail();
      }, []);
    
      const fetchUserDetail = () => {
        http.post('/me').then((res) => {
          setUserdetail(res.data);
        });
      }
    return (
        <>
        {/* <Navbar/> */}
            <Container fluid className='pt-5 contenedor-inicio'>
                <Row className='informacion-inicio'>
                    <Col sm={4}>
                        <Typography variant='h3' className='mensaje-bienvenida'>Bienvenid@ </Typography>
                        <Typography variant='h4' className='mensaje-bienvenida text-danger'>{ userdetail.name }</Typography>
                    </Col>
                    <Col sm={8}>
                        <Card className='tarjeta-inicio'>
                            <Card.Header className='card-header text-success font-weight-bold'>SILAC (Sistema Informático de Laboratorio Clínico) </Card.Header>
                            <Card.Body className='card-body'>Sistema informático para el manejo y gestión
                                de examenes clinicos de pacientes del Ministerio
                                de Salud Pública.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Inicio;