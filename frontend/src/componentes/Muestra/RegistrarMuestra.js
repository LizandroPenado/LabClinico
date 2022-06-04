import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
import './Muestra.css';

export default function RegistrarMuestra() {
    const { http } = AuthUser();
    const navigation = useNavigate();
    const [validated, setValidated] = useState(false);
    const [tipoMuestra, setTipoMuestra] = useState([]);
    const [muestra, setMuestra] = useState({
        codigo_muestra: '',
        identificacion_paciente: '',
        id_ordenexamen: 0,
        codigo_tipo_muestra: '',
    })

    useEffect(() => {
        getTipoMuestra();
        const id = window.location.search[7];
        const identificacion_pac = window.location.search;
        const paciente = identificacion_pac.substring(24, 33);
        setMuestra({id_ordenexamen: id, identificacion_paciente: paciente});
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setMuestra({ ...muestra, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (codigo_muestra === "" || identificacion_paciente === "" || codigo_tipo_muestra === "" || id_ordenexamen === "") {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos para el registro de muestra',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        await http
            .post("http://127.0.0.1:8000/api/muestra/", muestra)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                handleReset();
                navigation('/ordenPaciente');
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleReset = () => {
        setMuestra({
            codigo_muestra: '', identificacion_paciente: '', tipo_muestra: '', id_ordenexamen: ''
        });
    }

    const getTipoMuestra = async () => {
        await http
            .get("http://127.0.0.1:8000/api/tipomuestra/")
            .then((response) => {
                setTipoMuestra(response.data);
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

    const { codigo_muestra, identificacion_paciente, codigo_tipo_muestra, id_ordenexamen } = muestra;

    return (
        <>
            <div className='pt-5'></div>
            <div className=' container form-agenda'>
                <Button variant='secondary'>
                    <Link to={'/ordenPaciente'} className="agregar"> Regresar </Link>
                </Button>
                <div className='titulo-agendar'>
                    <span>Registrar muestra</span>
                </div>
                <Form validated={validated} id="registro" noValidate onSubmit={handlePost}>
                    <Row className="mb-3 text-center" >
                        <Form.Group>
                            <Form.Label>Codigo*</Form.Label>
                            <Form.Control
                                id='codigo_muestra'
                                name='codigo_muestra'
                                value={codigo_muestra}
                                onChange={handleChange}
                                required
                                autoComplete='none'
                                maxLength={5}
                                type="text"
                                placeholder="AC1215"
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label>Tipo de muestra*</Form.Label>
                        <Form.Select
                            id='codigo_tipo_muestra'
                            name='codigo_tipo_muestra'
                            value={codigo_tipo_muestra}
                            onChange={handleChange}
                            required>
                            <option value='' >Seleccione...</option>
                            {tipoMuestra.map((tipo) => {
                                return (
                                    <option key={tipo.codigo_tipo_muestra} value={tipo.codigo_tipo_muestra}>{tipo.nombre_tipo_mues}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Identificacion paciente*</Form.Label>
                            <Form.Control
                                id='identificacion_paciente'
                                name='identificacion_paciente'
                                value={identificacion_paciente}
                                onChange={handleChange}
                                required
                                readOnly
                                type="text"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Orden Examen*</Form.Label>
                            <Form.Control
                                id='id_ordenexamen'
                                name='id_ordenexamen'
                                value={id_ordenexamen}
                                onChange={handleChange}
                                required
                                readOnly
                                type="text"
                            />
                        </Form.Group>
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