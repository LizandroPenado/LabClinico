import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
/* import Navbar from '../Layout/Navbar'; */

export default function RegistrarPaciente() {
    const { http } = AuthUser();
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    const [validated, setValidated] = useState(false);
    const [telefonos, setTelefonos] = useState({
        telefono1: '',
        telefono2: '',
        telefono3: '',
    });
    const [paciente, setPaciente] = useState({
        
        hora: '',
        minutos: '',
        horario: '',
        dia: '',
        mes: '',
        anio: '',
        sexo: '',
        estado_civil: '',
        nacionalidad: '',
        responsable: 0,
        id_demografico: 0,
    })
    

    /* Uso de hook metodo useEffect*/
    useEffect(() => { 
        getDepartament();
    }, []);
    //ingresar hora
    const getDepartament = () => {
        http.get("http://127.0.0.1:8000/api/departamento/")
            .then((response) => {
                setDepartament(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleChangePaciente = (e) => {
        const { name, value } = e.target
        setPaciente({ ...paciente, [name]: value })
    }


    /* Este metodo me interesa para la fecha*/ 
    const handlePost = async (e) => {  
        e.preventDefault();
        setValidated(true);
        if (anio === "" || dia === "" || mes === "" || hora === "" || minutos === "" || estado_civil === "" ||horario === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos del paciente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
            return;
        }
        //Registrar al responsable
     

    /*const registroDemografico = async (id_res) => {
        //Registrar los datos demograficos
        await http
            .post("http://127.0.0.1:8000/api/demografico/",
                {
                    anio: paciente.anio,
                    sexo: paciente.sexo,
                    estado_civil: paciente.estado_civil
                }
            )
            .then((response) => {
                registroPaciente(id_res, response.data);
            }).catch((error) => {
                console.log(error);
            });
    }*/

    const registroPaciente = async (id_res, id_demo) => {
        //Registrar paciente
        await http
            .post("http://127.0.0.1:8000/api/paciente/",
                {
                    hora: paciente.hora,
                    minutos: paciente.minutos,
                    horario: paciente.horario,
                    dia: paciente.dia,
                    mes: paciente.mes,
                    anio: paciente.anio,
                    sexo: paciente.sexo,
                    estado_civil: paciente.estado_civil,
                    identificacion: paciente.identificacion,
                    tipo_identificacion: paciente.tipo_identificacion
                }
            )
    }

    

    
    const handleReset = () => {
        setPaciente({
            dia: '', mes: '', anio: '', estado_civil: '', hora: '', minutos: '', horario: '',
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

    const { dia, mes, anio, estado_civil, hora, minutos, horario } = paciente;
    //const { nombre_res, apellido_res, identificacion_res, tipo_identificacion_res, correo_res, dia_res, mes_res, anio_res, telefono_res } = responsable;
    //const { telefono1, telefono2, telefono3 } = telefonos;

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
                                            id='estado_civil'
                                            name='estado_civil'
                                            value={estado_civil}
                                            onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
                                                onChange={handleChangePaciente}
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
