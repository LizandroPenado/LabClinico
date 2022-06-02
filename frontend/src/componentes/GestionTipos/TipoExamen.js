import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

export default function TipoExamen() {
    const { http } = AuthUser();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [tipos, setTipos] = useState([]);
    const [tipoMuestras, setTipoMuestras] = useState([]);
    const [tipoExamen, setTipoExamen] = useState({
        codigo_tipo_examen: '',
        nombre_tipo_exam: '',
        descripcion_tipo_exam: '',
        id_tipomuestra: 0,
    })

    const columns = [
        {
            name: "id_tipoexamen",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "codigo_tipo_examen",
            label: "Codigo",
            options: {
                filter: false,
            }
        },
        {
            name: "nombre_tipo_exam",
            label: "Nombre",
            options: {
                filter: false,
            }
        },
        {
            name: "descripcion_tipo_exam",
            label: "Descripción",
            options: {
                filter: false,
            },
        },
        {
            name: "id_tipomuestra",
            label: "Id_muestra",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_tipo_mues",
            label: "Tipo muestra",
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
        getTipoMuestra();
    }, [])

    const getTipo = () => {
        http.get("http://127.0.0.1:8000/api/tipoexamen")
            .then((response) => {
                setTipos(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }
    const getTipoMuestra = () => {
        http.get("http://127.0.0.1:8000/api/tipomuestra")
            .then((response) => {
                setTipoMuestras(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const closeInsert = () => { setModalInsert(false); clearData(); }
    const closeDelete = () => { setModalDelete(false); clearData(); }
    const closeUpdate = () => { setModalUpdate(false); clearData(); }
    const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
    const showUpdate = (tipo) => {
        setTipoExamen({
            id_tipoexamen: tipo[0],
            codigo_tipo_examen: tipo[1],
            nombre_tipo_exam: tipo[2],
            descripcion_tipo_exam: tipo[3],
            id_tipomuestra: tipo[4],
        })
        setModalUpdate(true);
        setTipoModal("Actualizar");
    }

    const showDelete = (tipo) => {
        setTipoExamen({
            id_tipoexamen: tipo[0],
            nombre_tipo_exam: tipo[2],
        })
        setModalDelete(true);
        setTipoModal("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipoExamen({ ...tipoExamen, [name]: value })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if (tipoExamen.codigo_tipo_examen === "" || tipoExamen.nombre_tipo_exam === "" || tipoExamen.descripcion_tipo_exam === "" || tipoExamen.id_tipomuestra === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.post("http://127.0.0.1:8000/api/tipoexamen", tipoExamen)
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
        if (tipoExamen.codigo_tipo_examen === "" || tipoExamen.nombre_tipo_exam === "" || tipoExamen.descripcion_tipo_exam === "" || tipoExamen.id_tipomuestra === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese los campos requeridos'
            });
            return;
        }
        await http.put("http://127.0.0.1:8000/api/tipoexamen/" + tipoExamen.id_tipoexamen, tipoExamen)
            .then((response) => {
                Toast.fire({
                    icon: 'info',
                    title: 'Se ha actualizado el tipo examen: ' + tipoExamen.nombre_tipo_exam
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
        await http.delete("http://127.0.0.1:8000/api/tipoexamen/" + tipoExamen.id_tipoexamen)
             .then((response) => {
                 Toast.fire({
                     icon: 'error',
                     title: 'Se ha eliminado el tipo examen: ' + tipoExamen.nombre_tipo_exam
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
        setTipoExamen({
            id_tipoexamen: '',
            codigo_tipo_examen: '',
            nombre_tipo_exam: '',
            descripcion_tipo_exam: '',
            id_tipomuestra: 0,
        })
    }

    const { codigo_tipo_examen, nombre_tipo_exam, descripcion_tipo_exam, id_tipomuestra } = tipoExamen;

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
                    titulo="Tipo de examenes"
                    noRegistro="No hay registro de tipo de examenes"
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
                                    id="codigo_tipo_examen"
                                    name="codigo_tipo_examen"
                                    placeholder="EXURI"
                                    maxLength={5}
                                    autoComplete="nope"
                                    required={true}
                                    value={codigo_tipo_examen}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre_tipo_exam"
                                    name="nombre_tipo_exam"
                                    placeholder="Examen urianalisis"
                                    autoComplete="nope"
                                    maxLength={25}
                                    required={true}
                                    value={nombre_tipo_exam}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripción*</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="descripcion_tipo_exam"
                                    name="descripcion_tipo_exam"
                                    placeholder="Examen que se utiliza ..."
                                    autoComplete="nope"
                                    maxLength={250}
                                    required={true}
                                    value={descripcion_tipo_exam}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tipo de muestra*</Form.Label>
                                <Form.Select
                                    id="id_tipomuestra"
                                    name="id_tipomuestra"
                                    required={true}
                                    value={id_tipomuestra}
                                    onChange={handleChange}
                                >
                                    <option value=''>
                                        Seleccione..
                                    </option>
                                    {tipoMuestras.map((elemento) => (
                                        <option key={elemento.id_tipomuestra} value={elemento.id_tipomuestra}>
                                            {elemento.nombre_tipo_mues}
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
                    registro={nombre_tipo_exam}
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