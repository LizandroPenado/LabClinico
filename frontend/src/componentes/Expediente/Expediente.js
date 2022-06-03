import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
import './Expediente.css';
import ButtonConsult from '../Datatable/ButtonConsult';



function Expediente() {
  const { http } = AuthUser();
  const [modalInsert, setModalInsert] = useState(false);
  //const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [roles, setRoles] = useState([]);
  const [expedientes, setExpedientes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [expediente, setExpediente] = useState({
    id_expediente: '',
    nombre_paciente: '',
    apellido_paciente: '',
    clinica_id: 0,
    fecha_creacion_exp: '',
  })

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
    },
    {
        name: "apellido_paciente",
        label: "Apellidos",
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
    },
    {
        name: "fecha_creacion_exp",
        label: "Fecha Creacion",
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
            <ButtonConsult
              consultar={"/expediente/consultar/" + tableMeta.rowData[0]}
              eliminar={() => { showDelete(tableMeta.rowData) }}
            />
          );
        },
      },
    },
  ];

  useEffect(() => {
    getExpediente();
    //getClinica();
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

/*   const getClinica = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    await http.get("http://127.0.0.1:8000/api/expediente/clinica", {
        params: {
            id: user.id,
        },
    })
        .then((response) => {
            setExpediente({ id_clinica: response.data[0].id_clinica, clinica: response.data[0].nombre_clinica });
        }).catch((error) => {
            console.log(error);
        });
  } */

  const closeInsert = () => { setModalInsert(false); clearData(); }
  const closeDelete = () => { setModalDelete(false); clearData(); }
  //const closeUpdate = () => { setModalUpdate(false); clearData(); }
  const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
/*   const showUpdate = (expediente) => {//Datos a mandar para editar expediente
    setExpediente({
      id_expediente: expediente[0],
      nombre_paciente: expediente[1],
      apellido_paciente: expediente[3],
    })
    setModalUpdate(true);
    setTipoModal("Actualizar");
  } */

  const showDelete = (expediente) => {
    setExpediente({
      id_expediente: expediente[0],
      nombre_paciente: expediente[1],
    })
    setModalDelete(true);
    setTipoModal("");
  }

  const handleChange = (e) => {
    const { nombre_paciente, value } = e.target;
    setExpediente({ ...expediente, [nombre_paciente]: value })
  }

  const handlePost = async (e) => {
    e.preventDefault();
    await http
      .post("http://127.0.0.1:8000/api/user/register", expediente)
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Se ha realizado el registro'
        })
        closeInsert();
        getExpediente();
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Datos invalidos',
          html: 'Verifique que los datos ingresados cumplen con lo requerido'
        })
      });
  }

/*   const handleUpdate = async (e) => {
    e.preventDefault();
    await http
      .put("http://127.0.0.1:8000/api/expediente/" + expediente.id_expediente, expediente)
      .then((response) => {
        Toast.fire({
          icon: 'info',
          title: 'Se ha actualizado el expediente de: ' + expediente.name
        })
        closeUpdate();
        getExpediente();
      }).catch((error) => {
        console.log(error);
      });
  } */

  const handleDelete = async (e) => {
    e.preventDefault();
    await http
      .delete("http://127.0.0.1:8000/api/expediente/" + expediente.id_expediente)
      .then((response) => {
        Toast.fire({
          icon: 'error',
          title: 'Se ha eliminado el expediente de: ' + expediente.nombre_paciente
        })
        closeDelete();
        getExpediente();
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
/*     setExpediente({
      id_expediente: '',
      nombre_paciente: '',
      apellido_paciente: '',
      clinica_id: 0,
      fecha_creacion_exp: '',
    }) */
  }

  const { id_expediente, nombre_paciente, apellido_paciente, clinica_id, fecha_creacion_exp } = expediente;

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
          titulo="Expedientes"
          noRegistro="No hay registro de expedientes"
          columnas={columns}
          datos={expedientes}
        />
        {/* Modales */}
        <ModalCrud
          abrirInsertar={modalInsert}
          cerrarInsertar={closeInsert}
          titulo="expediente"
          formulario={
            tipoModal === "Insertar" ? (
              <Form validated={true}>
                <Form.Group>
                  <Form.Label>Nombre*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        4 letras minimos obligratorios
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Bessy Dayana"
                      maxLength={30}
                      minLength={4}
                      autoComplete="nope"
                      required={true}
                      value={nombre_paciente}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Debe contener una @ y al menos un .
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@dominio.com"
                      maxLength={50}
                      minLength={8}
                      pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                      required={true}
                      value={apellido_paciente}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        8 letras minimos obligratorios
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="******"
                      maxLength={30}
                      minLength={8}
                      autoComplete="nope"
                      required={true}
                      value={nombre_paciente}
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
                    value={nombre_paciente}
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
            ) : (
              <Form validated={true}>
                <Form.Group>
                  <Form.Select
                    id="estado"
                    name="estado"
                    required={true}
                    value={apellido_paciente}
                    onChange={handleChange}
                  >
                    <option value='' disabled={true}>Seleccione...</option>
                    <option value="Activado">Activado</option>
                    <option value="Bloqueado">Bloqueado</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Rol*</Form.Label>
                  <Form.Select
                    id="rol_id"
                    name="rol_id"
                    required={true}
                    value={apellido_paciente}
                    onChange={handleChange}
                  >
                    <option value='' disabled={true}>Seleccione...</option>
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
            )}
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
          //abrirAct={modalUpdate}
          //cerrarAct={closeUpdate}
/*           pieModalAct={
            <>
              <Button variant="secondary" onClick={closeUpdate}>
                Cancelar
              </Button>
            </>
          } */
          abrirEliminar={modalDelete}
          cerrarEliminar={closeDelete}
          registro={nombre_paciente}
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

export default Expediente;