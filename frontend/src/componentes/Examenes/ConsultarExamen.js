import React, { useState } from 'react';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import './ConsultarExamen.css'

export default function GestionMenu() {
    const [ordenExamen, setOrdenExamen] = useState([]);
    const [paciente, setPaciente] = useState('');
    const [orden, setOrden] = useState({
        id_orden: '',
        id_expediente: '',
        id_tipo_examen: '',
        fecha_orden: '',
        hora_orden: '',
    })

    const columns = [
        {
            name: "id_orden",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "id_expediente",
            label: "Expediente",
            options: {
                filter: false,
            }
        },
        {
            name: "fecha_orden",
            label: "Fecha",
            options: {
                filter: false,
            },
        },
        {
            name: "hora_orden",
            label: "Hora",
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
                        <Button size="sm" variant="outline-success" onClick={showRegister(tableMeta.rowData)}>
                            Registrar
                        </Button>
                    );
                },
            },
        },
    ];

    const getBusqueda = () => {
        /*  http.get("http://127.0.0.1:8000/api/menu/rol")
             .then((response) => {
                 setOrdenExamen(response.data);
             }).catch((error) => {
                 console.log(error);
             }); */
        console.log("busqueda");
    }

    const showRegister = (orden) => {
        setOrden({
            id_orden: orden[0],
            id_expediente: orden[1],
            id_tipo_examen: orden[2],
            fecha_orden: orden[3],
            hora_orden: orden[4],

        })
        console.log("Enviar a otra interfaz con los datos")
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setPaciente(value);
    }

    const handleGet = (e) => {
        e.preventDefault();
        if (paciente === "") {
            Swal.fire({
                icon: 'error',
                title: 'Datos invalidos',
                html: 'Ingrese la identificacion del paciente'
            });
            return;
        }
        /* http.get("http://127.0.0.1:8000/api/menu/rol")
            .then((response) => {
                setOrdenExamen(response.data);
            }).catch((error) => {
                console.log(error);
            }); */
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
        setPaciente('');
    }

    return (
        <>
            {/* <Navbar/> */}
            <Container className="menu-busqueda mt-4">
                <Row className="pt-4">
                    <Col sm={10} className="pt-3">
                        <Form.Group>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Ingrese la identificación del paciente, escrita en la muestra
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    type="text"
                                    id="busqueda"
                                    name="busqueda"
                                    placeholder='Identificación paciente'
                                /*  value={form.busqueda}
                                 onChange={this.handleChange} */
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col sm={2} className="pt-3">
                        <Button variant="secondary" /* onClick={() => this.handleBusqueda()} */>
                            <SearchIcon />
                            <span className="texto-boton">Buscar</span>
                        </Button>
                    </Col>
                </Row>
                <Row className="pt-3 pb-3"></Row>
            </Container>
            <div className='container'>
                <DataTable
                    titulo="Ordenes de examenes"
                    noRegistro="No hay registro de ordenes de examen"
                    columnas={columns}
                    datos={ordenExamen}
                />
            </div>
        </>
    );
}