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
    const [expediente, setExpediente] = useState({
        /* fecha_creacion: '',
        id_clinica: '', */
        id_paciente: '',
    });

    useEffect(() => {
        getDepartament();
        getClinica();
        /* var hoy = new Date();
        setExpediente({fecha_creacion: hoy.toLocaleDateString()}); */
    }, []);

    const getClinica = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        await http.get("http://127.0.0.1:8000/api/empleado/clinica", {
            params: {
                id: user.id,
            },
        })
            .then((response) => {
                setExpediente({ id_clinica: response.data[0].id_clinica});
            }).catch((error) => {
                console.log(error);
            });
    }

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

    const handleChangeResponsable = (e) => {
        const { name, value } = e.target
        setResponsable({ ...responsable, [name]: value })
    }

    const handleChangeTelefono = (e) => {
        const { name, value } = e.target
        setTelefonos({ ...telefonos, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (nombre === "" || apellido === "" || tipo_identificacion === "" || identificacion === "" || departamento === "" || municipio === "" || direccion === "" ||
            telefono1 === "" || anio === "" || dia === "" || mes === "" || correo === "" || sexo === "" || estado_civil === "" || nacionalidad === "") {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos del paciente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        if (nombre_res === "" || apellido_res === "" || tipo_identificacion_res === "" || identificacion_res === "" || telefono_res === "" || anio_res === "" ||
            dia_res === "" || mes_res === "" || correo_res === "") {
            Swal.fire({
                icon: 'error',
                title: 'Debe ingresar todos los datos requeridos del resposable',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
            })
            return;
        }
        //Registrar al responsable
        await http
            .post("http://127.0.0.1:8000/api/responsable/", responsable)
            .then((response) => {
                registroDemografico(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const registroDemografico = async (id_res) => {
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
    }

    const registroPaciente = async (id_res, id_demo) => {
        //Registrar paciente
        await http
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
                registroTelefonos(response.data);
                registroExpediente(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const registroTelefonos = async (id_pac) => {
        //Registrar los datos del telefonos paciente
        let tel2;
        let tel3;
        if (telefono2 === '') {
            tel2 = "123456789";
        } else {
            tel2 = telefono2;
        }
        if (telefono3 === '') {
            tel3 = "123456789";
        } else {
            tel3 = telefono3;
        }
        await http
            .post("http://127.0.0.1:8000/api/telefono/", {
                telefono1: telefono1,
                telefono2: tel2,
                telefono3: tel3,
                paciente_id: id_pac.id_paciente
            })
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

    const registroExpediente = async (id_pac) => {
        var hoy = new Date();
        await http
            .post("http://127.0.0.1:8000/api/expediente/", {
                fecha_creacion: hoy.toISOString().split('T')[0],
                id_paciente: id_pac.id_paciente,
                id_clinica: expediente.id_clinica,
            })
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
        setPaciente({ ...paciente, [name]: value });
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
        setPaciente({
            nombre: '', apellido: '', identificacion: '', tipo_identificacion: '', departamento: '', municipio: '',
            correo: '', direccion: '', fecha_nacimiento: '', dia: '', mes: '', anio: '', sexo: '', estado_civil: '',
            nacionalidad: '', responsable: 0,
        });
        setResponsable({
            nombre_res: '', apellido_res: '', identificacion_res: '', tipo_identificacion_res: '', correo_res: '',
            fecha_nacimiento_res: '', dia_res: '', mes_res: '', anio_res: '', telefono_res: '',
        });
        setTelefonos({
            telefono1: '', telefono2: '', telefono3: '',
        })
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

    const { nombre, apellido, identificacion, tipo_identificacion, departamento, municipio, correo, direccion, dia, mes, anio, sexo, estado_civil, nacionalidad } = paciente;
    const { nombre_res, apellido_res, identificacion_res, tipo_identificacion_res, correo_res, dia_res, mes_res, anio_res, telefono_res } = responsable;
    const { telefono1, telefono2, telefono3 } = telefonos;

    return (
        <>
            {/* <Navbar /> */}
            <div className='pt-5 container'>
                <Form validated={validated} id="registro" noValidate onSubmit={handlePost}>
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
                                                    9 digitos obligatorios minimos
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
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Télefono #1*</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    8 digitos obligratorios iniciando con 7,2 o 6
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='telefono1'
                                                name='telefono1'
                                                value={telefono1}
                                                onChange={handleChangeTelefono}
                                                required
                                                autoComplete='true'
                                                maxLength={8}
                                                pattern="([267]{1})([0-9]{7})"
                                                type="text"
                                                placeholder="77767475"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Télefono #2</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    8 digitos obligratorios iniciando con 7,2 o 6
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='telefono2'
                                                name='telefono2'
                                                value={telefono2}
                                                onChange={handleChangeTelefono}
                                                autoComplete='true'
                                                maxLength={8}
                                                pattern="([267]{1})([0-9]{7})"
                                                type="text"
                                                placeholder="77767475"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Télefono #3</Form.Label>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    8 digitos obligratorios iniciando con 7,2 o 6
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                id='telefono3'
                                                name='telefono3'
                                                value={telefono3}
                                                onChange={handleChangeTelefono}
                                                autoComplete='true'
                                                maxLength={8}
                                                pattern="([267]{1})([0-9]{7})"
                                                type="text"
                                                placeholder="77767475"
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
                                                Digitos entre 1910 hasta el año actual
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
                                                maxLength={4}
                                                min={1910}
                                                placeholder='año'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                </Row>
                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Correo</Form.Label>
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
                                                    9 digitos obligatorios minimos
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
                                                placeholder="10205822"
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
                                                Digitos entre 1950 hasta el anio actual
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
                                                maxLength={4}
                                                min={1950}
                                                placeholder='año'
                                            />
                                        </Form.Group>
                                    </OverlayTrigger>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Correo</Form.Label>
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
                                                maxLength={50}
                                                pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                                                type="email"
                                                placeholder="example@dominio.com"
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
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
                                                id='telefono_res'
                                                name='telefono_res'
                                                value={telefono_res}
                                                onChange={handleChangeResponsable}
                                                required
                                                autoComplete='true'
                                                maxLength={8}
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
