import React, { useState, useEffect } from 'react';
import DataTable from '../Datatable/DataTable';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './ConsultarExamen.css'
import AuthUser from '../Login/AuthUser';

export default function GestionMenu() {
    const { http } = AuthUser();
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
            name: "identificacion_pac",
            label: "Paciente",
            options: {
                filter: false,
            }
        },
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
            name: "id_muestra",
            label: "Id_mues",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "codigo_muestra",
            label: "Codigo muestra",
            options: {
                filter: false,
            },
        },
        {
            name: "tipo_muestra",
            label: "Tipo muestra",
        },
        {
            name: "nombre_tipo_exam",
            label: "Tipo examen",
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
                        <Button size="sm" variant="outline-success" /* onClick={showRegister(tableMeta.rowData)} */>
                            Registrar
                        </Button>
                    );
                },
            },
        },
    ];
    
    useEffect(() => {
        getOrden();
    }, [])

    const getOrden = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        http.get("http://127.0.0.1:8000/api/muestra", {
            params: {
                id: user.id,
            }
        })
            .then((response) => {
                console.log(response.data);
                setOrdenExamen(response.data);
            }).catch((error) => {
                console.log(error);
            });
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
            {/* <div className='pt-5'></div>
            <Container className="menu-busqueda ">
                <Row className="pt-4 pb-4">
                    <Col sm={10} className="pt-2">
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
                                value={form.busqueda}
                                 onChange={this.handleChange}
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col sm={2} className="pt-2">
                        <Button variant="secondary" onClick={() => this.handleBusqueda()}>
                            <SearchIcon />
                            <span className="texto-boton">Buscar</span>
                        </Button>
                    </Col>
                </Row>
            </Container> */}
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