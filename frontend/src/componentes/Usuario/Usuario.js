import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';
/* import Navbar from '../Layout/Navbar'; */

function Usuario() {
  const { http } = AuthUser();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    estado: 'Activo',
    rol_id: 0,
  })

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: "name",
      label: "Nombre",
      options: {
        filter: false,
      },
    },
    {
      name: "email",
      label: "Email",
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
      name: "estado",
      label: "Estado",
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
    getUser();
    getRoles();
  }, [])

  const getUser = () => {
    http
      .get("http://127.0.0.1:8000/api/user/")
      .then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const getRoles = () => {
    http
      .get("http://127.0.0.1:8000/api/rol/")
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
  const showUpdate = (usuario) => {
    setUser({
      id: usuario[0],
      name: usuario[1],
      rol_id: usuario[3],
      estado: usuario[4],
    })
    setModalUpdate(true);
    setTipoModal("Actualizar");
  }

  const showDelete = (usuario) => {
    setUser({
      id: usuario[0],
      name: usuario[1],
    })
    setModalDelete(true);
    setTipoModal("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handlePost = (e) => {
    e.preventDefault();
    http
      .post("http://127.0.0.1:8000/api/user/register", user)
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Se ha realizado el registro'
        })
        closeInsert();
        getUser();
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
    http
      .put("http://127.0.0.1:8000/api/user/" + user.id, user)
      .then((response) => {
        Toast.fire({
          icon: 'info',
          title: 'Se ha actualizado el usuario: ' + user.name
        })
        closeUpdate();
        getUser();
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    http
      .delete("http://127.0.0.1:8000/api/user/" + user.id)
      .then((response) => {
        Toast.fire({
          icon: 'error',
          title: 'Se ha eliminado el usuario: ' + user.name
        })
        closeDelete();
        getUser();
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
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
      estado: 'Activo',
      rol_id: 0,
    })
  }

  const { name, email, password, estado, rol_id } = user;

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
          titulo="Usuarios"
          noRegistro="No hay registro de usuarios"
          columnas={columns}
          datos={users}
        />
        {/* Modales */}
        <ModalCrud
          abrirInsertar={modalInsert}
          cerrarInsertar={closeInsert}
          titulo="usuario"
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
                      value={name}
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
                      value={email}
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
                      value={password}
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
            ) : (
              <Form validated={true}>
                <Form.Group>
                  <Form.Select
                    id="estado"
                    name="estado"
                    required={true}
                    value={estado}
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
                    value={rol_id}
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
          registro={name}
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

export default Usuario;