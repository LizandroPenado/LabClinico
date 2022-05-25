import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function GestionMenu() {
    const { http } = AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [menus, setMenus] = useState([]);
    const [roles, setRoles] = useState([]);
    const [menu, setMenu] = useState({
        titulo: '',
        url: '',
        rol_id: 0,
    })

    const columns = [
        {
            name: "id_menu",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "titulo",
            label: "Titulo",
            options: {
                filter: false,
            }
        },
        {
            name: "url",
            label: "Url",
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
        getMenu();
        getRoles();
    }, [])

    const getMenu = () => {
        http.get("http://127.0.0.1:8000/api/menu/rol")
            .then((response) => {
                setMenus(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getRoles = () => {
        http.get("http://127.0.0.1:8000/api/rol/")
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
    const showUpdate = (menu) => {
        setMenu({
            id_menu: menu[0],
            titulo: menu[1],
            url: menu[2],
            rol_id: menu[3],
        })
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (menu) => {
        setMenu({
            id_menu: menu[0],
            titulo: menu[1],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value })
    }

    const handlePost = (e) => {
        e.preventDefault();
        if (menu.titulo === "" || menu.url === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        if (menu.url.charAt(0) !== "/") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'La url debe iniciar con /'
            });
            return;
        }
        http.post("http://127.0.0.1:8000/api/menu", menu)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                closeInsert();
                getMenu();
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
        if (menu.url.charAt(0) !== "/") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'La url debe iniciar con /'
            });
            return;
        }
        http.put("http://127.0.0.1:8000/api/menu/" + menu.id_menu, menu)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el usuario: ' + menu.titulo
                })
                closeUpdate();
                getMenu();
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
        http.delete("http://127.0.0.1:8000/api/menu/" + menu.id_menu)
            .then((response) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Se ha eliminado el usuario: ' + menu.titulo
                })
                closeDelete();
                getMenu();
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
        setMenu({
            id_menu: '',
            titulo: '',
            url: '',
            rol_id: 0,
        })
    }

    const { titulo, url, rol_id } = menu;

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
                    titulo="Menu"
                    noRegistro="No hay registro de menu"
                    columnas={columns}
                    datos={menus}
                />
                {/* Modales */}
                <ModalCrud
                    abrirInsertar={modalInsert}
                    cerrarInsertar={closeInsert}
                    titulo="menu"
                    formulario={
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Titulo*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    placeholder="Usuarios"
                                    maxLength={20}
                                    autoComplete="nope"
                                    required={true}
                                    value={titulo}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Url*</Form.Label>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip>
                                            Debe iniciar con /
                                        </Tooltip>
                                    }
                                >
                                    <Form.Control
                                        type="text"
                                        id="url"
                                        name="url"
                                        placeholder="/usuario"
                                        pattern="([/])([A-z]+)"
                                        maxLength={50}
                                        required={true}
                                        value={url}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
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
                    registro={titulo}
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