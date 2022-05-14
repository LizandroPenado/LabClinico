import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';

function Usuario() {
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
    estado: 0,
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
    },
    {
      name: "email",
      label: "Email",
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
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            value === "0" ? (
              <span>Activo</span>
            ) : (
              <span>Bloqueado</span>
            )
          );
        },
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
        viewColumns: false,
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
    axios
      .get("http://127.0.0.1:8000/api/user/")
      .then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const getRoles = () => {
    axios
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
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", user)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado el registro',
        })
        closeInsert();
        getUser();
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/api/user/" + user.id, user)
      .then((response) => {
        Swal.fire({
          icon: 'info',
          title: 'Se ha actualizado el usuario: ' + user.name,
        })
        closeUpdate();
        getUser();
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://127.0.0.1:8000/api/user/" + user.id)
      .then((response) => {
        Swal.fire({
          icon: 'info',
          title: 'Se ha eliminado el usuario: ' + user.name,
        })
        closeDelete();
        getUser();
      }).catch((error) => {
        console.log(error);
      });
  }

  const clearData = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
      rol_id: 0,
    })
  }

  const { name, email, password, estado, rol_id } = user;

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
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Bessy Dayana"
                    maxLength={30}
                    autoComplete="nope"
                    required={true}
                    value={name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@dominio.com"
                    maxLength={50}
                    minLength={8}
                    required={true}
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña*</Form.Label>
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
                    <option value="" disabled={true}>
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
                  <Form.Label>Estado*</Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="estado"
                    name="estado"
                    label="Estado"
                    required={true}
                    value={estado}
                    onChange={handleChange}
                  />
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
          usuario={name}
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