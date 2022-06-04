import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
import './Agendar.css';

export default function RegistrarOrden() {
    const { http } = AuthUser();
    const navigation = useNavigate();
    const [validated, setValidated] = useState(false);
    const [tipoExamen, setTipoExamen] = useState([]);
    const [orden, setOrden] = useState({
        hora: '',
        minutos: '',
        horario: '',
        dia: '',
        mes: '',
        anio: '',
        id_tipoexamen: 0,
        id_expediente: 0,
    })

    useEffect(() => {
        getTipoExamen();
    }, [])

    const handleChangeOrden = (e) => {
        const { name, value } = e.target
        setOrden({ ...orden, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        const id = window.location.search[12];
        setValidated(true);
        if (anio === "" || dia === "" || mes === "" || hora === "" || minutos === "" || id_tipoexamen === "" || horario === "" || id_expediente === "") {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos para la orden examen',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        const horario_orden = hora + ":" + minutos + " " + horario;
        await http
            .post("http://127.0.0.1:8000/api/orden/", {
                anio: anio,
                mes: mes,
                dia: dia,
                hora_orden: horario_orden,
                expediente_id: id,
                id_tipoexamen: id_tipoexamen,
            })
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                handleReset();
                navigation('/paciente');
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleReset = () => {
        setOrden({
            dia: '', mes: '', anio: '', id_tipoexamen: '', hora: '', minutos: '', horario: '',
        });
    }

    const getTipoExamen = async () => {
        await http
            .get("http://127.0.0.1:8000/api/tipoexamen/")
            .then((response) => {
                setTipoExamen(response.data);
            }).catch((error) => {
                console.log(error);
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
    })

    const { dia, mes, anio, id_tipoexamen, hora, minutos, horario, id_expediente } = orden;

    return (
        <>
            <div className='pt-5'></div>
            <div className=' container form-agenda'>
                    <Button variant='secondary'>
                        <Link to={'/paciente'} className="agregar"> Regresar </Link>
                    </Button>
                <div className='titulo-agendar'>
                    <span>Agendar Exámen</span>
                </div>
                <Form validated={validated} id="registro" noValidate onSubmit={handlePost}>
                    <Row className="mb-3 text-center" >
                        <Col md='3'></Col>
                        <Col md='3'>
                            <Form.Label>Tipo de examen*</Form.Label>
                        </Col>
                        <Form.Group as={Col} md='3'>
                            <Form.Select
                                id='id_tipoexamen'
                                name='id_tipoexamen'
                                value={id_tipoexamen}
                                onChange={handleChangeOrden}
                                required>
                                <option value='' >Seleccione...</option>
                                {tipoExamen.map((tipo) => {
                                    return (
                                        <option key={tipo.id_tipoexamen} value={tipo.id_tipoexamen}>{tipo.nombre_tipo_exam}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Col md='3'></Col>
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
                                    Desde el año actual
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
                                    maxLength={4}
                                    min={1915}
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