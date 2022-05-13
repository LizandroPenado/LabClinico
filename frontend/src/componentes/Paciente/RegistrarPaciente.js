import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, InputGroup, Accordion } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function RegistrarPaciente() {
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    /* const [idResponsable, setIdResponsable] = useState(); */
    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        identificacion: '',
        tipo_identificacion: '',
        departamento: '',
        municipio: '',
        correo: '',
        direccion: '',
        fecha_nacimiento: '',
        sexo: '',
        estado_civil: '',
        nacionalidad: '',
        responsable: 0,
    })
    const [responsable, setResponsable] = useState({
        nombre_res: '',
        apellido_res: '',
        identificacion_res: '',
        tipo_identificacion_res: '',
        correo_res: '',
        fecha_nacimiento_res: '',
        telefono_res: '',
    })

    useEffect(() => {
        getDepartament();
    }, [paciente]);

    const getDepartament = () => {
        axios
            .get("http://127.0.0.1:8000/api/departamento/")
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

    const handleChangeResponsable = (e) => {
        const { name, value } = e.target
        setResponsable({ ...responsable, [name]: value })
    }

    const handlePost = (e) => {
        e.preventDefault();
        //Registrar al responsable
        axios
            .post("http://127.0.0.1:8000/api/responsable/", responsable)
            .then((response) => {
                const { id_responsable, nombre_res } = response.data;
                console.log(id_responsable);
                console.log(paciente);
                setPaciente({ ...paciente, responsable: id_responsable });
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Si',
                }).then((result) => {
                    if (result.value) {
                        console.log("Entro aqui");
                        axios
                            .post("http://127.0.0.1:8000/api/paciente/", paciente)
                            .then((response) => {
                                console.log(response.data);
                            }).catch((error) => {
                                console.log(error);
                                console.log(paciente);
                            });
                    }
                })
                /* setPaciente({ ...paciente, responsable: id_responsable }); */
                /* setPaciente(paciente => ({...paciente, responsable: id_responsable})); */
                /*  setPaciente(prevState => {
                     return {
                         ...prevState,
                         responsable: id_responsable
                     }
                 }) */
                console.log(paciente);
                //Registrar paciente
                /* axios
                    .post("http://127.0.0.1:8000/api/paciente/", paciente)
                    .then((response) => {
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                        console.log(paciente);
                    }); */
            }).catch((error) => {
                console.log(error);
            });
    }

    /* const registroPaciente = (id_responsable) => {
        setPaciente({ ...paciente, responsable: id_responsable });
        axios
            .post("http://127.0.0.1:8000/api/paciente/", paciente)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(paciente);
            });
    } */

    const handleMunicipio = (e) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: value });
        axios
            .get("http://127.0.0.1:8000/api/municipio/departamentos/", {
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

    const { nombre, apellido, identificacion, tipo_identificacion, departamento, municipio, correo, direccion, fecha_nacimiento, sexo, estado_civil, nacionalidad } = paciente;
    const { nombre_res, apellido_res, identificacion_res, tipo_identificacion_res, correo_res, fecha_nacimiento_res, telefono_res } = responsable;

    return (
        <div className='pt-3 container'>
            <Form validated={true}>
                <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Datos paciente</Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nombres*</Form.Label>
                                    <Form.Control
                                        id='nombre'
                                        name='nombre'
                                        value={nombre}
                                        onChange={handleChangePaciente}
                                        required
                                        autoComplete='true'
                                        minLength={4}
                                        maxLength={25}
                                        type="text"
                                        placeholder="Juan Antonio"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Apellidos*</Form.Label>
                                    <Form.Control
                                        id='apellido'
                                        name='apellido'
                                        value={apellido}
                                        onChange={handleChangePaciente}
                                        required
                                        autoComplete='true'
                                        minLength={4}
                                        maxLength={25}
                                        type="text"
                                        placeholder="Quito Merino"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Identificación*</Form.Label>
                                    <Form.Control
                                        id='identificacion'
                                        name='identificacion'
                                        value={identificacion}
                                        onChange={handleChangePaciente}
                                        required
                                        autoComplete='true'
                                        minLength={8}
                                        maxLength={20}
                                        type="text"
                                        placeholder="1020582-2"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Tipo identificacion*</Form.Label>
                                    <Form.Select
                                        id='tipo_identificacion'
                                        name='tipo_identificacion'
                                        value={tipo_identificacion}
                                        onChange={handleChangePaciente}
                                        required >
                                        <option value='' disabled={true}>Seleccione...</option>
                                        <option value="Dui">Dui</option>
                                        <option value="Pasaporte">Pasaporte</option>
                                    </Form.Select>
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
                                        id='municipio'
                                        name='municipio'
                                        value={municipio}
                                        onChange={handleChangePaciente}
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
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Direccion*</Form.Label>
                                    <Form.Control
                                        id='direccion'
                                        name='direccion'
                                        value={direccion}
                                        onChange={handleChangePaciente}
                                        required
                                        autoComplete='true'
                                        minLength={4}
                                        maxLength={100}
                                        type="text"
                                        placeholder="Avenida los olivos #3"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Correo*</Form.Label>
                                    <Form.Control
                                        id='correo'
                                        name='correo'
                                        value={correo}
                                        onChange={handleChangePaciente}
                                        required
                                        maxLength={50}
                                        type="email"
                                        placeholder="example@dominio.com"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Fecha nacimiento*</Form.Label>
                                    <Form.Control
                                        id='fecha_nacimiento'
                                        name='fecha_nacimiento'
                                        value={fecha_nacimiento}
                                        onChange={handleChangePaciente}
                                        type="date"
                                        required />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Sexo*</Form.Label>
                                    <Form.Select
                                        id='sexo'
                                        name='sexo'
                                        value={sexo}
                                        onChange={handleChangePaciente}
                                        required>
                                        <option value='' disabled={true}>Seleccione...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Estado civil*</Form.Label>
                                    <Form.Select
                                        id='estado_civil'
                                        name='estado_civil'
                                        value={estado_civil}
                                        onChange={handleChangePaciente}
                                        required>
                                        <option value='' disabled={true}>Seleccione...</option>
                                        {sexo === 'Masculino' ? (
                                            <>
                                                <option value="Soltero">Soltero</option>
                                                <option value="Casado">Casado</option>
                                                <option value="Divorciado">Divorciado</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Soltera">Soltera</option>
                                                <option value="Casada">Casada</option>
                                                <option value="Divorciada">Divorciada</option>
                                            </>
                                        )}

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nacionalidad*</Form.Label>
                                    <Form.Control
                                        id='nacionalidad'
                                        name='nacionalidad'
                                        value={nacionalidad}
                                        onChange={handleChangePaciente}
                                        required
                                        autoComplete='true'
                                        maxLength={15}
                                        type="text"
                                        placeholder="Salvadoreña"
                                    />
                                </Form.Group>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Datos responsable</Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nombres*</Form.Label>
                                    <Form.Control
                                        id='nombre_res'
                                        name='nombre_res'
                                        value={nombre_res}
                                        onChange={handleChangeResponsable}
                                        required
                                        autoComplete='true'
                                        minLength={4}
                                        maxLength={25}
                                        type="text"
                                        placeholder="Juan Antonio"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Apellidos*</Form.Label>
                                    <Form.Control
                                        id='apellido_res'
                                        name='apellido_res'
                                        value={apellido_res}
                                        onChange={handleChangeResponsable}
                                        required
                                        autoComplete='true'
                                        minLength={4}
                                        maxLength={25}
                                        type="text"
                                        placeholder="Quito Merino"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Identificación*</Form.Label>
                                    <Form.Control
                                        id='identificacion_res'
                                        name='identificacion_res'
                                        value={identificacion_res}
                                        onChange={handleChangeResponsable}
                                        required
                                        autoComplete='true'
                                        minLength={8}
                                        maxLength={20}
                                        type="text"
                                        placeholder="1020582-2"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Tipo identificacion*</Form.Label>
                                    <Form.Select
                                        id='tipo_identificacion_res'
                                        name='tipo_identificacion_res'
                                        value={tipo_identificacion_res}
                                        onChange={handleChangeResponsable}
                                        required >
                                        <option value='' disabled={true}>Seleccione...</option>
                                        <option value="Dui">Dui</option>
                                        <option value="Pasaporte">Pasaporte</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Correo*</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            id='correo_res'
                                            name='correo_res'
                                            value={correo_res}
                                            onChange={handleChangeResponsable}
                                            required
                                            maxLength={50}
                                            type="email"
                                            placeholder="example@dominio.com"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" >
                                    <Form.Label>Fecha nacimiento*</Form.Label>
                                    <Form.Control
                                        id='fecha_nacimiento_res'
                                        name='fecha_nacimiento_res'
                                        value={fecha_nacimiento_res}
                                        onChange={handleChangeResponsable}
                                        type="date"
                                        required />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Télefono*</Form.Label>
                                    <Form.Control
                                        id='telefono_res'
                                        name='telefono_res'
                                        value={telefono_res}
                                        onChange={handleChangeResponsable}
                                        required
                                        autoComplete='true'
                                        maxLength={9}
                                        type="text"
                                        placeholder="77767475"
                                    />
                                </Form.Group>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Row className='mb-3 pt-5 '>
                    <Col className="text-end">
                        <Button type="submit" variant='success' onClick={handlePost}>Registrar</Button>
                    </Col>
                    <Col>
                        <span className='text-danger'>Campos obligatorios *</span>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
