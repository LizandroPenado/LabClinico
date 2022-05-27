import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function Privilegios() {
    const {http}=AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [privilegios, setPrivilegios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [privilegio, setPrivilegio] = useState({
        nombre: '',
        descripcion: '',
        rol_id: 0,
    })

    const columns = [
        {
            name: "id_privilegio",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre",
            label: "Nombre",
            options: {
                filter: false,
            }
        },
        {
            name: "descripcion",
            label: "Descripcion",
            options: {
                filter: false,
            },
        },
        {
            name: "id_rol",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_rol",
            label: "Rol",
        },
        {
            name: "acciones",
            label: "Acciones",
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
        getPrivilegios();
        getRoles();
    }, [])

    const getPrivilegios = () => {
        http
            .get("http://127.0.0.1:8000/api/privilegios")
            .then((response) => {
                setPrivilegios(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getRoles = () => {
        http
            .get("http://127.0.0.1:8000/api/rol/")
            .then((response) => {
                setRoles(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const closeInsert = () => { setModalInsert(false); clearData(); }
    const closeDelete = () => { setModalDelete(false); clearData(); }
    const closeUpdate = () => { setModalUpdate(false); clearData(); }
    const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
    const showUpdate = (privilegio) => {
        setPrivilegio({
            id_privilegio: privilegio[0],
            nombre: privilegio[1],
            descripcion: privilegio[2],
            rol_id: privilegio[3],
        })
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (privilegio) => {
        setPrivilegio({
            id_privilegio: privilegio[0],
            nombre: privilegio[1],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrivilegio({ ...privilegio, [name]: value })
    }

     const handlePost = (e) => {
        e.preventDefault();
        if (privilegio.nombre === "" || privilegio.descripcion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        
        http
            .post("http://127.0.0.1:8000/api/privilegios", privilegio)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                closeInsert();
                getPrivilegios();
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos invalidos',
                    html: 'Verifique que los datos ingresados cumplen con lo requerido'
                })
            });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (privilegio.nombre === "" || privilegio.descripcion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        http
            .put("http://127.0.0.1:8000/api/privilegios/" + privilegio.id_privilegio, privilegio)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el privilegio: ' + privilegio.nombre
                })
                closeUpdate();
                getPrivilegios();
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos invalidos',
                    html: 'Verifique que los datos ingresados cumplen con lo requerido'
                })
            });
    }

     const handleDelete = (e) => {
        e.preventDefault();
        http
            .delete("http://127.0.0.1:8000/api/privilegios/" + privilegio.id_privilegio)
            .then((response) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Se ha eliminado el privilegio: ' + privilegio.nombre
                })
                closeDelete();
                getPrivilegios();
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
        setPrivilegio({
            id_privilegio: '',
            nombre: '',
            descripcion: '',
            rol_id: 0,
        })
    }

    const { nombre, descripcion, rol_id } = privilegio;

    return (
        <>
            {/* <Navbar/> */}
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
                    titulo="Privilegios"
                    noRegistro="No hay registro de privilegios"
                    columnas={columns}
                    datos={privilegios}
                />
                {/* Modales */}
                <ModalCrud
                    abrirInsertar={modalInsert}
                    cerrarInsertar={closeInsert}
                    titulo="privilegio"
                    formulario={
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Privilegios"
                                    maxLength={20}
                                    autoComplete="nope"
                                    required={true}
                                    value={nombre}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripcion*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Breve descripcion del privilegio"
                                        maxLength={50}
                                        required={true}
                                        value={descripcion}
                                        onChange={handleChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rol*</Form.Label>
                                <Form.Select
                                    id="rol_id"
                                    name="rol_id"
                                    required={true}
                                    value={rol_id}
                                    onChange={handleChange}
                                >
                                    <option value=''>
                                        Seleccione..
                                    </option>
                                    {roles.map((elemento) => (
                                        <option key={elemento.id_rol} value={elemento.id_rol}>
                                            {elemento.nombre_rol}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <div className="obligatorio">
                                <span>Datos requeridos (*)</span>
                            </div>
                        </Form>
                    }
                    pieModalCrear={
                        <>
                            <Button variant="primary"  onClick={handlePost}>
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
                            <Button variant="primary"  onClick={handleUpdate}>
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
                            <Button variant="danger"  onClick={handleDelete}>
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