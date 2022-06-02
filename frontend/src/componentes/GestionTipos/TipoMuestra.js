import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function TipoMuestra() {
    const { http } = AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [tipos, setTipos] = useState([]);
    const [tipoMuestra, setTipoMuestra] = useState({
        codigo_tipo_muestra: '',
        nombre_tipo_mues: '',
        descripcion_tipo_mues: '',
    })

    const columns = [
        {
            name: "id_tipomuestra",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "codigo_tipo_muestra",
            label: "Codigo",
            options: {
                filter: false,
            }
        },
        {
            name: "nombre_tipo_mues",
            label: "Nombre",
            options: {
                filter: false,
            }
        },
        {
            name: "descripcion_tipo_mues",
            label: "Descripción",
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
        getTipo();
    }, [])

    const getTipo = () => {
        http.get("http://127.0.0.1:8000/api/tipomuestra")
            .then((response) => {
                setTipos(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const closeInsert = () => { setModalInsert(false); clearData(); }
    const closeDelete = () => { setModalDelete(false); clearData(); }
    const closeUpdate = () => { setModalUpdate(false); clearData(); }
    const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
    const showUpdate = (tipo) => {
        setTipoMuestra({
            id_tipomuestra: tipo[0],
            codigo_tipo_muestra: tipo[1],
            nombre_tipo_mues: tipo[2],
            descripcion_tipo_mues: tipo[3],
        })
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (tipo) => {
        setTipoMuestra({
            id_tipomuestra: tipo[0],
            nombre_tipo_mues: tipo[2],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipoMuestra({ ...tipoMuestra, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if (tipoMuestra.codigo_tipo_muestra === "" || tipoMuestra.nombre_tipo_mues === "" || tipoMuestra.descripcion_tipo_mues === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.post("http://127.0.0.1:8000/api/tipomuestra", tipoMuestra)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se ha realizado el registro'
                })
                closeInsert();
                getTipo();
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
        if (tipoMuestra.codigo_tipo_muestra === "" || tipoMuestra.nombre_tipo_mues === "" || tipoMuestra.descripcion_tipo_mues === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.put("http://127.0.0.1:8000/api/tipomuestra/" + tipoMuestra.id_tipomuestra, tipoMuestra)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el tipo muestra: ' + tipoMuestra.nombre_tipo_mues
                })
                closeUpdate();
                getTipo();
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
        await http.delete("http://127.0.0.1:8000/api/tipomuestra/" + tipoMuestra.id_tipomuestra)
             .then((response) => {
                 Toast.fire({
                     icon: 'error',
                     title: 'Se ha eliminado el tipo muestra: ' + tipoMuestra.nombre_tipo_mues
                 })
                 closeDelete();
                 getTipo();
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
        setTipoMuestra({
            id_tipomuestra: '',
            codigo_tipo_muestra: '',
            nombre_tipo_mues: '',
            descripcion_tipo_mues: '',
        })
    }

    const { codigo_tipo_muestra, nombre_tipo_mues, descripcion_tipo_mues } = tipoMuestra;

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
                    titulo="Tipo de muestras"
                    noRegistro="No hay registro de tipo de muestras"
                    columnas={columns}
                    datos={tipos}
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
                                    id="codigo_tipo_muestra"
                                    name="codigo_tipo_muestra"
                                    placeholder="TMORI"
                                    maxLength={5}
                                    autoComplete="nope"
                                    required={true}
                                    value={codigo_tipo_muestra}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre_tipo_mues"
                                    name="nombre_tipo_mues"
                                    placeholder="Muestra de orina"
                                    autoComplete="nope"
                                    maxLength={25}
                                    required={true}
                                    value={nombre_tipo_mues}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripción*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="descripcion_tipo_mues"
                                    name="descripcion_tipo_mues"
                                    placeholder="Muestra que se utiliza ..."
                                    autoComplete="nope"
                                    maxLength={250}
                                    required={true}
                                    value={descripcion_tipo_mues}
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
                    registro={nombre_tipo_mues}
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