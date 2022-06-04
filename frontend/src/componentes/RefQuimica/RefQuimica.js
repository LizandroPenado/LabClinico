import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

function RefQuimica() {
  const { http } = AuthUser();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [refQuimicas, setRefQuimicas] = useState([]);
  const [refQuimica, setRefQuimica] = useState({
    id_refquimica: '',
    glucosa_min: '',
    glucosa_max: '',
    colesterol_normal: '',
    trigliceridos_min: '',
    trigliceridos_max: '',
    acido_id: '', 
  })

  const columns = [
    {
      name: "id_refquimica",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: "glucosa_min",
      label: "Glucosa minimo",
      options: {
        filter: false,
      },
    },
    {
      name: "glucosa_max",
      label: "Glucosa maximo",
      options: {
        filter: false,
      },
    },
    {
      name: "colesterol_normal",
      label: "Colestrerol Normal",
      options: {
        filter: false,
      },
    },    
    {
      name: "trigliceridos_min",
      label: "Trigliceridos Minimo",
      options: {
        filter: false,
      },
    },     
    {
      name: "trigliceridos_max",
      label: "Trigliceridos Maximo",
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
              //eliminar={() => { showDelete(tableMeta.rowData) }}
            />
          );
        },
      },
    },
  ];

  useEffect(() => {
    getRefQuimica();
    //getClinica();
  }, [])

  const getRefQuimica = () => {
    http
      .get("http://127.0.0.1:8000/api/refquimica")
      .then((response) => {
        setRefQuimicas(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const closeInsert = () => { setModalInsert(false); clearData(); }
  const closeDelete = () => { setModalDelete(false); clearData(); }
  const closeUpdate = () => { setModalUpdate(false); clearData(); }
  const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
  const showUpdate = (refQuimica) => {
    setRefQuimica({
      id_refquimica: refQuimica[0],
      glucosa_min: refQuimica[1],
      glucosa_max: refQuimica[2],
      colesterol_normal: refQuimica[3],
      trigliceridos_min: refQuimica[4],
      trigliceridos_max: refQuimica[5],
      acido_id: refQuimica[6],
    })
    setModalUpdate(true);
    setTipoModal("Actualizar");
  }

/*    const showDelete = (refUrianalisi) => {
    setRefUrianalisi({
      id_refurianalisis: refUrianalisi[0],
      ph_max: refUrianalisi[1],
    })
    setModalDelete(true);
    setTipoModal("");
  } */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRefQuimica({ ...refQuimica, [name]: value })
  }

/*   const handlePost = async (e) => {
    e.preventDefault();
    await http
      .post("http://127.0.0.1:8000/api/user/register", refUrianalisi)
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Se ha realizado el registro'
        })
        closeInsert();
        getRefUrianalisi();
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Datos invalidos',
          html: 'Verifique que los datos ingresados cumplen con lo requerido'
        })
      });
  } */

  const handleUpdate = async (e) => {
    e.preventDefault();
    await http
      .put("http://127.0.0.1:8000/api/refquimica/" + refQuimica.id_refquimica, refQuimica)
      .then((response) => {
        Toast.fire({
          icon: 'info',
          title: 'Se han actualizado los parametros de referencia: '
        })
        closeUpdate();
        getRefQuimica();
      }).catch((error) => {
        console.log(error);
      });
  }

/*    const handleDelete = async (e) => {
    e.preventDefault();
    await http
      .delete("http://127.0.0.1:8000/api/user/" + refUrianalisi.id_refurianalisis)
      .then((response) => {
        Toast.fire({
          icon: 'error',
          title: 'Se ha eliminado el usuario: ' + refUrianalisi.name
        })
        closeDelete();
        getRefUrianalisi();
      }).catch((error) => {
        console.log(error);
      });
  }  */

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
    setRefQuimica({
        id_refquimica: '',
        glucosa_min: '',
        glucosa_max: '',
        colesterol_normal: '',
        trigliceridos_min: '',
        trigliceridos_max: '',
        acido_id: '',        
    })
  }

  const { id_refquimica, glucosa_min, glucosa_max, colesterol_normal,
          trigliceridos_min, trigliceridos_max, acido_id } = refQuimica;

  return (
    <>
      <div className='pt-3 container'>
        <DataTable
          titulo="Referencias de Quimica"
          noRegistro="No hay registro de referencias"
          columnas={columns}
          datos={refQuimicas}
        />
        {/* Modales */}
        <ModalCrud
          abrirInsertar={modalInsert}
          cerrarInsertar={closeInsert}
          titulo="Prueba"
          formulario={
            tipoModal === "Insertar" ? (
              <Form validated={true}>
                <div className="obligatorio">
                  <span>Datos requeridos (*)</span>
                </div>
              </Form>
            ) : (
              <Form validated={true}>

              <Form.Group>
                  <Form.Label>Glucosa Minima*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="glucosa_min"
                      name="glucosa_min"
                      required={true}
                      value={glucosa_min}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Glucosa Maximo*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="glucosa_max"
                      name="glucosa_max"
                      required={true}
                      value={glucosa_max}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Colesterol Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="colesterol_normal"
                      name="colesterol_normal"
                      required={true}
                      value={colesterol_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Trigliceridos Minimo*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="trigliceridos_min"
                      name="trigliceridos_min"
                      required={true}
                      value={trigliceridos_min}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Trigliceridos Maximo*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="trigliceridos_max"
                      name="trigliceridos_max"
                      required={true}
                      value={trigliceridos_max}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                
                <div className="obligatorio">
                  <span>Datos requeridos *</span>
                </div>
              </Form>
            )}

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
        />
      </div>
    </>
  );
}

export default RefQuimica;