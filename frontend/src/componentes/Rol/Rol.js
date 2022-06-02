import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function Rol() {
    const { http } = AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [roles, setRoles] = useState([]);
    const [rol, setRol] = useState({
        codigo_rol: '',
        nombre_rol: '',
    })

    const columns = [
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
            name: "codigo_rol",
            label: "Codigo",
            options: {
                filter: false,
            }
        },
        {
            name: "nombre_rol",
            label: "Nombre",
            options: {
                filter: false,
            }
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
        getRol();
    }, [])

    const getRol = () => {
        http.get("http://127.0.0.1:8000/api/rol")
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
    const showUpdate = (rol) => {
        setRol({
            id_rol: rol[0],
            codigo_rol: rol[1],
            nombre_rol: rol[2],
        })
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (rol) => {
        setRol({
            id_rol: rol[0],
            nombre_rol: rol[2],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRol({ ...rol, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if (rol.codigo_rol === "" || rol.nombre_rol === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.post("http://127.0.0.1:8000/api/rol", rol)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                closeInsert();
                getRol();
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
        if (rol.codigo_rol === "" || rol.nombre_rol === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.put("http://127.0.0.1:8000/api/rol/" + rol.id_rol, rol)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el rol: ' + rol.nombre_rol
                })
                closeUpdate();
                getRol();
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
        await http.delete("http://127.0.0.1:8000/api/rol/" + rol.id_rol)
             .then((response) => {
                 Toast.fire({
                     icon: 'error',
                     title: 'Se ha eliminado el rol: ' + rol.nombre_rol
                 })
                 closeDelete();
                 getRol();
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
        setRol({
            id_rol: '',
            codigo_rol: '',
            nombre_rol: '',
        })
    }

    const { codigo_rol, nombre_rol } = rol;

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
                    titulo="Roles"
                    noRegistro="No hay registro de roles"
                    columnas={columns}
                    datos={roles}
                />
                {/* Modales */}
                <ModalCrud
                    abrirInsertar={modalInsert}
                    cerrarInsertar={closeInsert}
                    titulo="Tipo muestra"
                    formulario={
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Código*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="codigo_rol"
                                    name="codigo_rol"
                                    placeholder="ADM"
                                    maxLength={5}
                                    autoComplete="nope"
                                    required={true}
                                    value={codigo_rol}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre_rol"
                                    name="nombre_rol"
                                    placeholder="Administrador"
                                    autoComplete="nope"
                                    maxLength={25}
                                    required={true}
                                    value={nombre_rol}
                                    onChange={handleChange}
                                />
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
                    registro={nombre_rol}
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