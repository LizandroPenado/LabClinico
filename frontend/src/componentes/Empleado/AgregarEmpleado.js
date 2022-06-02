import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
import { Link } from "react-router-dom";

export default function AgregarEmpleado() {
    const { http } = AuthUser();
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [validated, setValidated] = useState(false);
    const [empleado, setEmpleado] = useState({
        nombre_empleado: '',
        apellido_empleado: '',
        profesion: '',
        numero_junta: '',
        correo_empleado: '',
        telefono_empleado: '',
        sexo_empleado: '',
        codigo_empleado: '',
        direccion_empleado: '',
        departamento: '',
        id_clinica: 0,
        id_usuario: 0,
        id_municipio: 0,
        clinica: '',
    })

    useEffect(() => {
        getDepartament();
        getClinica();
        getUsuario();
    }, []);

    const getDepartament = () => {
        http.get("http://127.0.0.1:8000/api/departamento/")
            .then((response) => {
                setDepartament(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getUsuario = () => {
        http.get("http://127.0.0.1:8000/api/user/")
            .then((response) => {
                setUsuario(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getClinica = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        await http.get("http://127.0.0.1:8000/api/empleado/clinica", {
            params: {
                id: user.id,
            },
        })
            .then((response) => {
                setEmpleado({ id_clinica: response.data[0].id_clinica, clinica: response.data[0].nombre_clinica });
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmpleado({ ...empleado, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (nombre_empleado === "" || apellido_empleado === "" || profesion === "" || direccion_empleado === "" || departamento === "" || id_municipio === "" || codigo_empleado === "" ||
            correo_empleado === "" || telefono_empleado === "" || sexo_empleado === "" || clinica === "" || id_usuario === "") {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos del paciente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        await http
            .post("http://127.0.0.1:8000/api/empleado/", empleado)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                handleReset();
                setValidated(false);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleMunicipio = (e) => {
        const { name, value } = e.target;
        setEmpleado({ ...empleado, [name]: value });
        http.get("http://127.0.0.1:8000/api/municipio/departamentos/", {
            params: {
                departamento: value,
            },
        })
            .then((response) => {
                setMunici(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleReset = () => {
        setEmpleado({
            nombre_empleado: '',
            apellido_empleado: '',
            profesion: '',
            numero_junta: '',
            correo_empleado: '',
            telefono_empleado: '',
            sexo_empleado: '',
            codigo_empleado: '',
            direccion_empleado: '',
            id_clinica: 0,
            id_usuario: 0,
            id_municipio: 0,
            departamento: '',
        });
        setMunici([]);
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

    const { nombre_empleado, apellido_empleado, profesion, numero_junta, correo_empleado, telefono_empleado, sexo_empleado, codigo_empleado, direccion_empleado, id_clinica, id_usuario, id_municipio, departamento, clinica } = empleado;

    return (
        <>
            <div className='pt-5'></div>
            <div className='container form'>
                <Form validated={validated} id="registro" noValidate onSubmit={handlePost} >
                    <Row className="mb-3 pt-3">
                        <Col className="text-start">
                            <Button variant='secondary'>
                                <Link to={'/empleado'} className="agregar"> Regresar </Link>
                            </Button>

                        </Col>
                        <Col className="text-end">
                            <span className='text-danger'>Campos obligatorios *</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nombres*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Minimo 4 letras y maximo de 25
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='nombre_empleado'
                                    name='nombre_empleado'
                                    value={nombre_empleado}
                                    onChange={handleChange}
                                    required
                                    autoComplete='true'
                                    minLength={4}
                                    maxLength={25}
                                    type="text"
                                    placeholder="Juan Antonio"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Apellidos*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Minimo 4 letras y maximo de 25
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='apellido_empleado'
                                    name='apellido_empleado'
                                    value={apellido_empleado}
                                    onChange={handleChange}
                                    required
                                    autoComplete='true'
                                    minLength={4}
                                    maxLength={25}
                                    type="text"
                                    placeholder="Quito Merino"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Profesión*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Área que desempeña
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='profesion'
                                    name='profesion'
                                    value={profesion}
                                    onChange={handleChange}
                                    required
                                    autoComplete='true'
                                    minLength={4}
                                    maxLength={25}
                                    type="text"
                                    placeholder="Ingeniero informatico"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>JVM</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Numero de junta
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='numero_junta'
                                    name='numero_junta'
                                    value={numero_junta}
                                    onChange={handleChange}
                                    autoComplete='true'
                                    minLength={4}
                                    maxLength={25}
                                    type="text"
                                    placeholder="1020450"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Departamento*</Form.Label>
                            <Form.Select
                                id='departamento'
                                name='departamento'
                                value={departamento}
                                onChange={handleMunicipio}
                                required>
                                <option value='' disabled={true}>Seleccione...</option>
                                {departament.map((dept) => {
                                    return (
                                        <option key={dept.id_departamento} value={dept.id_departamento}>{dept.nombre_dep}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Municipio*</Form.Label>
                            <Form.Select
                                id='id_municipio'
                                name='id_municipio'
                                value={id_municipio}
                                onChange={handleChange}
                                required>
                                <option value='' disabled={true}>Seleccione...</option>
                                {munici.map((muni) => {
                                    return (
                                        <option key={muni.id_municipio} value={muni.id_municipio}>{muni.nombre_mun}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Direccion*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Minimo 8 letras y maximo de 100
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='direccion_empleado'
                                    name='direccion_empleado'
                                    value={direccion_empleado}
                                    onChange={handleChange}
                                    required
                                    autoComplete='true'
                                    minLength={8}
                                    maxLength={100}
                                    type="text"
                                    placeholder="Avenida los olivos #3"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Código*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Maximo de 15 digitos
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='codigo_empleado'
                                    name='codigo_empleado'
                                    value={codigo_empleado}
                                    onChange={handleChange}
                                    required
                                    autoComplete='true'
                                    maxLength={15}
                                    type="text"
                                    placeholder="FEL01"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Correo*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Debe contener una @ y al menos un .
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='correo_empleado'
                                    name='correo_empleado'
                                    value={correo_empleado}
                                    onChange={handleChange}
                                    required
                                    maxLength={50}
                                    pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                                    type="email"
                                    placeholder="example@dominio.com"
                                    autoComplete='true'

                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Télefono*</Form.Label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        8 digitos obligratorios iniciando con 7,2 o 6
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id='telefono_empleado'
                                    name='telefono_empleado'
                                    value={telefono_empleado}
                                    onChange={handleChange}
                                    required
                                    maxLength={8}
                                    pattern="([267]{1})([0-9]{7})"
                                    type="text"
                                    placeholder="77767475"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label as={Col}>Sexo*</Form.Label>
                            <Form.Select
                                id='sexo_empleado'
                                name='sexo_empleado'
                                value={sexo_empleado}
                                onChange={handleChange}
                                required>
                                <option value='' disabled={true}>Seleccione...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Clinica*</Form.Label>
                            <Form.Control
                                id='clinica'
                                name='clinica'
                                value={clinica}
                                required
                                disabled={true}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Usuario*</Form.Label>
                            <Form.Select
                                id='id_usuario'
                                name='id_usuario'
                                value={id_usuario}
                                onChange={handleChange}
                                required>
                                <option value=''>Seleccione...</option>
                                {usuario.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3 pt-5'>
                        <Col className='text-center'>
                            <Button type="submit" variant='success' /* onClick={handlePost} */>Registrar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}
