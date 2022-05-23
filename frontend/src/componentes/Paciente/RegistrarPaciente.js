import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Form, Col, Row, Button, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Swal from 'sweetalert2';
/* import Navbar from '../Layout/Navbar'; */

export default function RegistrarPaciente() {
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    const [validated, setValidated] = useState(false);
    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        identificacion: '',
        tipo_identificacion: '',
        departamento: '',
        municipio: '',
        correo: '',
        direccion: '',
        dia: '',
        mes: '',
        anio: '',
        sexo: '',
        estado_civil: '',
        nacionalidad: '',
        responsable: 0,
        id_demografico: 0,
    })
    const [responsable, setResponsable] = useState({
        nombre_res: '',
        apellido_res: '',
        identificacion_res: '',
        tipo_identificacion_res: '',
        correo_res: '',
        dia_res: '',
        mes_res: '',
        anio_res: '',
        telefono_res: '',
    })

    useEffect(() => {
        getDepartament();
    }, []);

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

    const handlePost = async (e) => {
        e.preventDefault();
        setValidated(true);
        //Registrar al responsable
        await axios
            .post("http://127.0.0.1:8000/api/responsable/", responsable)
            .then((response) => {
                registroDemografico(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const registroDemografico = async (id_res) => {
        await axios
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
    }

    const registroPaciente = async (id_res, id_demo) => {
        //Registrar paciente
        await axios
            .post("http://127.0.0.1:8000/api/paciente/",
                {
                    nombre: paciente.nombre,
                    apellido: paciente.apellido,
                    dia: paciente.dia,
                    mes: paciente.mes,
                    anio: paciente.anio,
                    sexo: paciente.sexo,
                    direccion: paciente.direccion,
                    correo: paciente.correo,
                    estado_civil: paciente.estado_civil,
                    identificacion: paciente.identificacion,
                    tipo_identificacion: paciente.tipo_identificacion,
                    nacionalidad: paciente.nacionalidad,
                    municipio: paciente.municipio,
                    id: id_res.id_responsable,
                    id_demografico: id_demo.id_demografico
                }
            )
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Si',
                })
                handleReset();
                setValidated(false);
            }).catch((error) => {
                console.log(error);
            });
    }

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

    const handleReset = () => {
        setPaciente({
            nombre: '', apellido: '', identificacion: '', tipo_identificacion: '', departamento: '', municipio: '',
            correo: '', direccion: '', fecha_nacimiento: '', dia: '', mes: '', anio: '', sexo: '', estado_civil: '',
            nacionalidad: '', responsable: 0,
        });
        setResponsable({
            nombre_res: '', apellido_res: '', identificacion_res: '', tipo_identificacion_res: '', correo_res: '',
            fecha_nacimiento_res: '', dia_res: '', mes_res: '', anio_res: '', telefono_res: '',
        });
    }

    const { nombre, apellido, identificacion, tipo_identificacion, departamento, municipio, correo, direccion, dia, mes, anio, sexo, estado_civil, nacionalidad } = paciente;
    const { nombre_res, apellido_res, identificacion_res, tipo_identificacion_res, correo_res, dia_res, mes_res, anio_res, telefono_res } = responsable;

    return (
        <>
            {/* <Navbar /> */}
            <div className='pt-3 container'>
                <Form validated={validated} id="registro" noValidate>
                    <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Datos paciente</Accordion.Header>
                            <Accordion.Body>
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
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
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
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Identificación*</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    9 digitos obligatorios
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='identificacion'
                                                name='identificacion'
                                                value={identificacion}
                                                onChange={handleChangePaciente}
                                                required
                                                autoComplete='true'
                                                minLength={9}
                                                maxLength={20}
                                                pattern="[0-9]+"
                                                type="text"
                                                placeholder="123456789"
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
                                                id='direccion'
                                                name='direccion'
                                                value={direccion}
                                                onChange={handleChangePaciente}
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
                                    <Form.Label>Fecha nacimiento*</Form.Label>
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
                                                Digitos entre 1915 al 2022
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
                                                id='correo'
                                                name='correo'
                                                value={correo}
                                                onChange={handleChangePaciente}
                                                required
                                                maxLength={50}
                                                pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                                                type="email"
                                                placeholder="example@dominio.com"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label as={Col}>Sexo*</Form.Label>
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
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Maximo de 15 letras
                                                </Tooltip>
                                            }
                                        >
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
                                        </OverlayTrigger>
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
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Minimo de 4 letras y maximo de 25
                                                </Tooltip>
                                            }
                                        >
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
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Apellidos*</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Minimo de 4 letras y maximo de 25
                                                </Tooltip>
                                            }
                                        >
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
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
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
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Identificación*</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    9 digitos obligatorios
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='identificacion_res'
                                                name='identificacion_res'
                                                value={identificacion_res}
                                                onChange={handleChangeResponsable}
                                                required
                                                autoComplete='true'
                                                minLength={9}
                                                maxLength={20}
                                                pattern="[0-9]+"
                                                type="text"
                                                placeholder="1020582-2"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label>Fecha nacimiento*</Form.Label>
                                    <Form.Group as={Col}>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    Digitos entre 1 al 31
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                type='number'
                                                id='dia_res'
                                                name='dia_res'
                                                value={dia_res}
                                                onChange={handleChangeResponsable}
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
                                        <Form.Group as={Col}>
                                            <Form.Control
                                                type='number'
                                                id='mes_res'
                                                name='mes_res'
                                                value={mes_res}
                                                onChange={handleChangeResponsable}
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
                                                Digitos entre 1915 al 2022
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Group as={Col}>
                                            <Form.Control
                                                type='number'
                                                id='anio_res'
                                                name='anio_res'
                                                value={anio_res}
                                                onChange={handleChangeResponsable}
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
                                                id='correo_res'
                                                name='correo_res'
                                                value={correo_res}
                                                onChange={handleChangeResponsable}
                                                required
                                                maxLength={50}
                                                pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                                                type="email"
                                                placeholder="example@dominio.com"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label as={Col}>Télefono*</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    8 digitos obligratorios
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='telefono_res'
                                                name='telefono_res'
                                                value={telefono_res}
                                                onChange={handleChangeResponsable}
                                                required
                                                autoComplete='true'
                                                maxLength={9}
                                                pattern="([267]{1})([0-9]{7})"
                                                type="text"
                                                placeholder="77767475"
                                            />
                                        </OverlayTrigger>
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
        </>
    );
}
