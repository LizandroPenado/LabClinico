import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Inicio.css'
import { Typography } from '@mui/material';

function Inicio() {

    return (
        <>
            <Container fluid className='pt-5 contenedor-inicio'>
                <Row className='informacion-inicio'>
                    <Col sm={4}>
                        <Typography variant='h3' className='mensaje-bienvenida'>Bienvenido</Typography>
                    </Col>
                    <Col sm={8}>
                        <Card className='tarjeta-inicio'>
                            <Card.Header className='card-header'>SILAC</Card.Header>
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