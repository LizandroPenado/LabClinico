import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
/* import Navbar from '../Layout/Navbar'; */

export default function RegistrarOrden() {
    const { http } = AuthUser();
    const [validated, setValidated] = useState(false);
    const [orden, setOrden] = useState({
        hora: '',
        minutos: '',
        horario: '',
        dia: '',
        mes: '',
        anio: '',
        id_tipoexamen: 0 ,
    })

    const handleChangeOrden = (e) => {
        const { name, value } = e.target
        setOrden({ ...orden, [name]: value })
    }
    
    const handlePost = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (anio === "" || dia === "" || mes === "" || hora === "" || minutos === "" || id_tipoexamen === "" ||horario === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos del paciente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        await http
            .post("http://127.0.0.1:8000/api/orden/", orden)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                handleReset();
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleReset = () => {
        setOrden({
            dia: '', mes: '', anio: '', id_tipoexamen: '', hora: '', minutos: '', horario: '',
        });
    }

    const tipoExamen = async (id_tipo) => {
        //Registrar los datos demograficos
        await http
            .post("http://127.0.0.1:8000/api/tipoexamen/",
                {
                    id_tipoexamen: orden.id_tipoexamen,
                }
            )
            .then((response) => {
                registroOrden(id_tipo, response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const registroOrden = async (id_tipo) => {
        await http
            .post("http://127.0.0.1:8000/api/orden/",
                {
                    dia: orden.dia,
                    mes: orden.mes,
                    anio: orden.anio,
                    hora: orden.hora,
                    minutos: orden.minutos,
                    horario: orden.horario,
                    id_tipoexamen: id_tipo.id_tipoexamen,
                    
                }
            );
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
    })

    const { dia, mes, anio, id_tipoexamen, hora, minutos, horario } = orden;

    return (
        <>
            {/* <Navbar /> */}
            <div className='pt-5 container'>
                <Form validated={validated} id="registro" noValidate onSubmit={handlePost}>
                    <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Agendar Examen </Accordion.Header>
                            <Accordion.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Tipo de examen*</Form.Label>
                                        <Form.Select
                                            id='id_tipoexamen'
                                            name='id_tipoexamen'
                                            value={id_tipoexamen}
                                            onChange={handleChangeOrden}
                                            required>
                                            <option value='' disabled={true}>Seleccione...</option>
                                            {(
                                                <>
                                                    <option value="Soltera">Cropologia</option>
                                                    <option value="Casada">QuimicaClinica</option>
                                                    <option value="Divorciada">Hermatología</option>
                                                    <option value="Soltera">Urianalisis</option>
                                                </>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label>Fecha de realización del examen*</Form.Label>
                                    <Form.Group as={Col} >
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Digitos entre 1 al 31
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                type='number'
                                                id='dia'
                                                name='dia'
                                                value={dia}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                min={1}
                                                max={31}
                                                placeholder='dia'
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Digitos entre 1 al 12
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type='number'
                                                id='mes'
                                                name='mes'
                                                value={mes}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                min={1}
                                                max={12}
                                                placeholder='mes'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Digitos entre 00 a 99
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type='number'
                                                id='anio'
                                                name='anio'
                                                value={anio}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                min={0}
                                                max={99}
                                                placeholder='año'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                </Row>
                                <Row className="mb-3">
                                <Form.Label>Hora de ralización del examen*</Form.Label>
                                    <Form.Group as={Col} >
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Digitos entre 1 al 12
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                type='number'
                                                id='hora'
                                                name='hora'
                                                value={hora}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                min={1}
                                                max={12}
                                                placeholder='hora'
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Digitos entre 1 al 60
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type='number'
                                                id='minutos'
                                                name='minutos'
                                                value={minutos}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                min={1}
                                                max={60}
                                                placeholder='minutos'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Estado AM o PM
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type='string'
                                                id='horario'
                                                name='horario'
                                                value={horario}
                                                onChange={handleChangeOrden}
                                                required
                                                maxLength={2}
                                                
                                                placeholder='AM o PM'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                </Row>
                                <Row className="mb-3">
                                    
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>   
                    </Accordion>
                    <Row className='mb-3 pt-5 '>
                        <Col className="text-end">
                            <Button type="submit" variant='success' /* onClick={handlePost} */>Registrar</Button>
                        </Col>
                        <Col>
                            <span className='text-danger'>Campos obligatorios *</span>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}  