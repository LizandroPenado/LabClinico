import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function GestionPaciente() {
    const { http } = AuthUser();
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        departamento: '',
        municipio: '',
        correo: '',
        direccion: '',
    })

    const columns = [
        {
            name: "id_paciente",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_paciente",
            label: "Nombres",
            options: {
                filter: false,
            }
        },
        {
            name: "apellido_paciente",
            label: "Apellidos",
            options: {
                filter: false,
            },
        },
        {
            name: "id_departamento",
            label: "Id_depa",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_dep",
            label: "Departamento",
        },
        {
            name: "id_municipio",
            label: "Id_muni",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_mun",
            label: "Municipio",
        },
        {
            name: "direccion_paciente",
            label: "Dirección",
            options: {
                filter: false,
            },
        },
        {
            name: "correo_paciente",
            label: "Correo",
            options: {
                filter: false,
            },
        },
        {
            name: "acciones",
            label: "Acciónes",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <ButtonTable
                            editar={() => { showUpdate(tableMeta.rowData) }}
                            eliminar={() => { showDelete(tableMeta.rowData) }}
                        />
                    );
                },
            },
        },
    ];

    useEffect(() => {
        getPaciente();
    }, [])

    const getDepartament = () => {
        http.get("http://127.0.0.1:8000/api/departamento/")
            .then((response) => {
                setDepartament(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getPaciente = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        http.get("http://127.0.0.1:8000/api/paciente", {
            params: {
                id: user.id,
            }
        })
            .then((response) => {
                console.log(response.data);
                setPacientes(response.data);
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

    const getMunicipio = (depart) => {
        http.get("http://127.0.0.1:8000/api/municipio/departamentos/", {
                params: {
                    departamento: depart,
                },
            })
            .then((response) => {
                setMunici(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const closeDelete = () => { setModalDelete(false); clearData(); }
    const closeUpdate = () => { setModalUpdate(false); clearData(); }
    const showUpdate = (paciente) => {
        getDepartament();
        setPaciente({
            id_paciente: paciente[0],
            nombre: paciente[1],
            apellido: paciente[2],
            departamento: paciente[3],
            municipio: paciente[5],
            direccion: paciente[7],
            correo: paciente[8],
        })
        getMunicipio(paciente[5]);
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (paciente) => {
        setPaciente({
            id_paciente: paciente[0],
            nombre_paciente: paciente[1],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (nombre === "" || apellido === "" || departamento === "" || municipio === "" || correo === "" || direccion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.put("http://127.0.0.1:8000/api/paciente/" + paciente.id_paciente, paciente)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el paciente: ' + paciente.nombre
                })
                closeUpdate();
                getPaciente();
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos invalidos',
                    html: 'Verifique que los datos ingresados cumplen con lo requerido'
                })
            });
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await http.delete("http://127.0.0.1:8000/api/paciente/" + paciente.id_paciente)
            .then((response) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Se ha eliminado el paciente: ' + paciente.paciente
                })
                closeDelete();
                getPaciente();
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

    const clearData = () => {
        setPaciente({
            nombre: '',
            apellido: '',
            departamento: '',
            municipio: '',
            correo: '',
            direccion: '',
            estado_civil: '',
            id_demografico: 0,
        })
    }

    const { nombre, apellido, departamento, municipio, correo, direccion } = paciente;

    return (
        <>
            <div className='pt-3 container'>
                <DataTable
                    titulo="Gestionar pacientes"
                    noRegistro="No hay registro de paciente"
                    columnas={columns}
                    datos={pacientes}
                />
                {/* Modales */}
                <ModalCrud
                    titulo="paciente"
                    formulario={
                        <Form validated={true}>
                            <Form.Group>
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
                            <Form.Group>
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
                            <Form.Group>
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
                            <Form.Group>
                                <Form.Label>Municipio*</Form.Label>
                                <Form.Select
                                    id='municipio'
                                    name='municipio'
                                    value={municipio}
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
                            <Form.Group>
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
                            <Form.Group >
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
                                        onChange={handleChange}
                                        maxLength={50}
                                        pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                                        type="email"
                                        placeholder="example@dominio.com"
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                            <div className="obligatorio">
                                <span>Datos requeridos (*)</span>
                            </div>
                        </Form>
                    }
                    abrirAct={modalUpdate}
                    cerrarAct={closeUpdate}
                    pieModalAct={
                        <>
                            <Button variant="primary" onClick={handleUpdate}>
                                Actualizar
                            </Button>
                            <Button variant="secondary" onClick={closeUpdate}>
                                Cancelar
                            </Button>
                        </>
                    }
                    abrirEliminar={modalDelete}
                    cerrarEliminar={closeDelete}
                    registro={nombre}
                    pieModalEliminar={
                        <>
                            <Button variant="danger" onClick={handleDelete}>
                                Aceptar
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={closeDelete}
                            >
                                Cancelar
                            </Button>
                        </>
                    }
                />
            </div>
        </>
    );
}