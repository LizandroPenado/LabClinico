import React, { useState, useEffect } from 'react';
import DataTable from '../Datatable/DataTable';
import { Button } from 'react-bootstrap';
import AuthUser from '../Login/AuthUser';
import './Expediente.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

function Expediente() {
  const { http } = AuthUser();
  const [expedientes, setExpedientes] = useState([]);

  const columns = [
    {
      name: "id_expediente",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false,
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
      name: "apellido_paciente",
      label: "Apellidos",
      options: {
        filter: false,
      },
    },
    {
      name: "clinica_id",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: "nombre_clinica",
      label: "Nombre Clinica",
      options: {
        filter: false,
      },
    },
    /* {
      name: "fecha_creacion_exp",
      label: "Fecha Creacion",
      options: {
        filter: false,
      },
    }, */
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
              <Link to={"/paciente/agendar?expediente=" + tableMeta.rowData[0]}><VisibilityIcon /></Link>
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getExpediente();
  }, [])

  const getExpediente = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    await http.get("http://127.0.0.1:8000/api/expediente/", {
      params: {
        id: user.id,
      }
    })
      .then((response) => {
        setExpedientes(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className='pt-3 container'>
        <DataTable
          titulo={"Pacientes"}
          noRegistro="No hay registro de pacientes"
          columnas={columns}
          datos={expedientes}
        />
      </div>
    </>
  );
}

export default Expediente;