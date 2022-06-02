import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
import { Link } from "react-router-dom";
import './Empleado.css';
import ButtonConsult from '../Datatable/ButtonConsult';
/* import Navbar from '../Layout/Navbar'; */

export default function GestionEmpleado() {
    const { http } = AuthUser();
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [empleados, setEmpleados] = useState([]);
    const [empleado, setEmpleado] = useState({
        id_empleado: '',
        nombre_empleado: '',
    })

    const columns = [
        {
            name: "id_empleado",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_empleado",
            label: "Nombres",
            options: {
                filter: false,
            },
        },
        {
            name: "apellido_empleado",
            label: "Apellidos",
            options: {
                filter: false,
            },
        },
        {
            name: "profesion",
            label: "Profesión",
            options: {
                filter: false,
            },
        },
        {
            name: "correo_empleado",
            label: "Correo",
            options: {
                filter: false,
            },
        },
        {
            name: "id_clinica",
            label: "Id_clini",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_clinica",
            label: "Clinica",
        },
        {
            name: "id",
            label: "Id_user",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "name",
            label: "Usuario",
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
                        <ButtonConsult
                            consultar={"/empleado/consultar/"+tableMeta.rowData[0]}
                            eliminar={() => { showDelete(tableMeta.rowData) }}
                        />
                    );
                },
            },
        },
    ];

    useEffect(() => {
        getEmpleado();
    }, [])

    const getEmpleado = () => {
        http
            .get("http://127.0.0.1:8000/api/empleado/")
            .then((response) => {
                setEmpleados(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const closeDelete = () => { setModalDelete(false); clearData(); }
    const showDelete = (usuario) => {
        setEmpleado({
            id_empleado: usuario[0],
            nombre_empleado: usuario[1],
        })
        setModalDelete(true);
        setTipoModal("");
    }


    const handleDelete = async (e) => {
        e.preventDefault();
        await http
          .delete("http://127.0.0.1:8000/api/empleado/" + empleado.id_empleado)
          .then((response) => {
            Toast.fire({
              icon: 'error',
              title: 'Se ha eliminado el empleado: ' + empleado.nombre_empleado
            })
            closeDelete();
            getEmpleado();
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
        /* setUser({
          id: '',
          name: '',
          email: '',
          password: '',
          estado: 'Activo',
          rol_id: 0,
        }) */
    }

    const { id_empleado, nombre_empleado} = empleado;

    return (
        <>
            {/* <Navbar/> */}
            <div className='pt-3 container'>
                <DataTable
                    agregar={
                        <Button
                            variant="success"
                            className="boton d-flex justify-content-center">
                            <Link to={"/empleado/agregar"} className="agregar pl-8"> <AddIcon /> Agregar </Link>
                        </Button>
                    }
                    titulo="Empleados"
                    noRegistro="No hay registro de empleados"
                    columnas={columns}
                    datos={empleados}
                />
                {/* Modales */}
                <ModalCrud
                    titulo="empleado"
                    abrirEliminar={modalDelete}
                    cerrarEliminar={closeDelete}
                    registro={nombre_empleado}
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