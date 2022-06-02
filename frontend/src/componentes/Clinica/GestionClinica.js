import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, Col } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function GestionClinica() {
    const { http } = AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [clinicas, setClinicas] = useState([]);
    const [departament, setDepartament] = useState([]);
    const [munici, setMunici] = useState([]);
    const [clinica, setClinica] = useState({
        codigo_clinica: '',
        departamento: '',
        nombre_clinica: '',
        direccion_clinica: '',
        id_municipio: 0,
    })

    const columns = [
        {
            name: "id_clinica",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "codigo_clinica",
            label: "Codigo",
            options: {
                filter: false,
            }
        },
        {
            name: "nombre_clinica",
            label: "Nombre",
            options: {
                filter: false,
            }
        },
        {
            name: "direccion_clinica",
            label: "Dirección",
            options: {
                filter: false,
            },
        },
        {
            name: "id_departamento",
            label: "Id_depar",
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
        getClinica();
    }, [])

    const getClinica = () => {
        http.get("http://127.0.0.1:8000/api/clinica")
            .then((response) => {
                setClinicas(response.data);
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

    const closeInsert = () => { setModalInsert(false); clearData(); }
    const closeDelete = () => { setModalDelete(false); clearData(); }
    const closeUpdate = () => { setModalUpdate(false); clearData(); }
    const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); getDepartament();}
    const showUpdate = (clinica) => {
        getDepartament();
        setClinica({
            id_clinica: clinica[0],
            codigo_clinica: clinica[1],
            nombre_clinica: clinica[2],
            direccion_clinica: clinica[3],
            departamento: clinica[4],
            id_municipio: clinica[6],
        })
        getMunicipio(clinica[4]);
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (tipo) => {
        setClinica({
            id_clinica: tipo[0],
            nombre_clinica: tipo[2],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinica({ ...clinica, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if (clinica.nombre_clinica === "" || clinica.codigo_clinica === "" || clinica.direccion_clinica === "" || clinica.id_municipio === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.post("http://127.0.0.1:8000/api/clinica", clinica)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                closeInsert();
                getClinica();
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos invalidos',
                    html: 'Verifique que los datos ingresados cumplen con lo requerido'
                })
            });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (clinica.nombre_clinica === "" || clinica.codigo_clinica === "" || clinica.direccion_clinica === "" || clinica.id_municipio === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.put("http://127.0.0.1:8000/api/clinica/" + clinica.id_clinica, clinica)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado la clinica: ' + clinica.nombre_clinica
                })
                closeUpdate();
                getClinica();
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
        await http.delete("http://127.0.0.1:8000/api/clinica/" + clinica.id_clinica)
            .then((response) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Se ha eliminado la clinica: ' + clinica.nombre_clinica
                })
                closeDelete();
                getClinica();
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleMunicipio = (e) => {
        const { name, value } = e.target;
        setClinica({ ...clinica, [name]: value });
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
        setClinica({
            id_clinica: '',
            codigo_clinica: '',
            nombre_clinica: '',
            direccion_clinica: '',
            departamento: '',
            id_municipio: 0,
        })
        setMunici([]);
    }

    const { codigo_clinica, nombre_clinica, direccion_clinica, id_municipio, departamento } = clinica;

    return (
        <>
            <div className='pt-3 container'>
                <DataTable
                    agregar={
                        <Button
                            variant="success"
                            className="boton d-flex justify-content-center"
                            onClick={showInsert}
                        >
                            <AddIcon />
                            <span className="pl-8">Agregar</span>
                        </Button>
                    }
                    titulo="Clinicas"
                    noRegistro="No hay registro de tipo de clinicas"
                    columnas={columns}
                    datos={clinicas}
                />
                {/* Modales */}
                <ModalCrud
                    abrirInsertar={modalInsert}
                    cerrarInsertar={closeInsert}
                    titulo="Clinica"
                    formulario={
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Código*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="codigo_clinica"
                                    name="codigo_clinica"
                                    placeholder="CL01"
                                    maxLength={5}
                                    autoComplete="nope"
                                    required={true}
                                    value={codigo_clinica}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre_clinica"
                                    name="nombre_clinica"
                                    placeholder="Clinica Monte Rosa"
                                    autoComplete="nope"
                                    maxLength={25}
                                    required={true}
                                    value={nombre_clinica}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripción*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="direccion_clinica"
                                    name="direccion_clinica"
                                    placeholder="Av. Prusia"
                                    autoComplete="nope"
                                    maxLength={250}
                                    required={true}
                                    value={direccion_clinica}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group >
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
                            <Form.Group >
                                <Form.Label>Municipio*</Form.Label>
                                <Form.Select
                                    id='id_municipio'
                                    name='id_municipio'
                                    value={id_municipio}
                                    onChange={handleChange}
                                    required>
                                    <option value=''>Seleccione...</option>
                                    {munici.map((muni) => {
                                        return (
                                            <option key={muni.id_municipio} value={muni.id_municipio}>{muni.nombre_mun}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <div className="obligatorio">
                                <span>Datos requeridos (*)</span>
                            </div>
                        </Form>
                    }
                    pieModalCrear={
                        <>
                            <Button variant="primary" onClick={handlePost}>
                                Guardar
                            </Button>
                            <Button variant="secondary" onClick={closeInsert}>
                                Cancelar
                            </Button>
                        </>
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
                    registro={nombre_clinica}
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