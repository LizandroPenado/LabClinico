import React, { useState, useEffect } from 'react';
import DataTable from '../Datatable/DataTable';
import { Button } from 'react-bootstrap';
import AuthUser from '../Login/AuthUser';
import './ConsultarExamen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

export default function ExamenesSecretaria() {
    const { http } = AuthUser();
    const [ordenExamen, setOrdenExamen] = useState([]);

    const columns = [
        {
            name: "id_ordenexamen",
            label: "Id",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "identificacion_pac",
            label: "Paciente",
            options: {
                filter: false,
            },
        },
        {
            name: "nombre_paciente",
            label: "Nombres",
            options: {
                filter: false,
            },
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
            label: "Horario",
            options: {
                filter: false,
            },
        },
        {
            name: "tipoexamen_id",
            label: "id_tipo",
            options: {
                display: false,
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
        {
            name: "nombre_tipo_exam",
            label: "Tipo examen",
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
                        <Button size="sm" variant="light">
                            <Link to={"/ordenPaciente/muestra?orden=" + tableMeta.rowData[0]+"&identificacion="+tableMeta.rowData[1]}><VisibilityIcon /></Link>
                        </Button>
                    );
                },
            },
        },
    ];

    useEffect(() => {
        getOrden();
    }, [])

    const getOrden = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        await http.get("http://127.0.0.1:8000/api/orden/", {
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

    return (
        <>
            <div className='pt-3 container'>
                <DataTable
                    titulo={"Ordenes de examen"}
                    noRegistro="No hay registro de orden examen"
                    columnas={columns}
                    datos={ordenExamen}
                />
            </div>
        </>
    );
}