import React, { useState, useEffect } from 'react';
import ButtonTable from '../Datatable/ButtonTable';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../Datatable/DataTable';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalCrud from '../Modal/ModalCrud';
import Swal from 'sweetalert2';
import AuthUser from '../Login/AuthUser';

function RefUrianalisi() {
  const { http } = AuthUser();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [refUrianalisis, setRefUrianalisis] = useState([]);
  const [refUrianalisi, setRefUrianalisi] = useState({
    id_refurianalisis: '',
    ph_min: '',
    ph_max: '',
    densidad_min: '',
    densidad_max: '',
    leucocitos_normal: '',
    nitrito_normal: '',
    proteina_normal: '',
    glucosa_normal: '',
    cuerpos_centonicos_normal: '',
    urobilogeno_normal: '',
    bilirrubina_normal: '',
    sangre_normal: '',
    celulas_escamosas_normal: '',
    celulas_redondas_normal: '',
    cilindros_normal: '',
    cristales_normal: '',
    parasitos_normal: '',
    mucoides_normal: '',
    bacterias_normal: '',
    globulos_rojos_normal: '',
    levadura_normal: '',    

  })

  const columns = [
    {
      name: "id_refurianalisis",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: "ph_min",
      label: "Ph minimo",
      options: {
        filter: false,
      },
    },
    {
      name: "ph_max",
      label: "Ph maximo",
      options: {
        filter: false,
      },
    },
    {
      name: "densidad_min",
      label: "Densidad Minima",
      options: {
        filter: false,
      },
    },    
    {
      name: "densidad_max",
      label: "Densidad Maxima",
      options: {
        filter: false,
      },
    },     
    {
      name: "leucocitos_normal",
      label: "Leucocitos Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "nitrito_normal",
      label: "Nitrito Normal",
      options: {
        filter: false,
      },
    }, 
    {
      name: "proteina_normal",
      label: "Proteina Normal",
      options: {
        filter: false,
      },
    },       
    {
      name: "glucosa_normal",
      label: "Glucosa Normal",
      options: {
        filter: false,
      },
    },     
    {
      name: "cuerpos_centonicos_normal",
      label: "Cuerpos Centonicos Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "urobilogeno_normal",
      label: "Urobilogeno Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "bilirrubina_normal",
      label: "Bilirrubina Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "sangre_normal",
      label: "Sangre Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "celulas_escamosas_normal",
      label: "Celulas Escamosas Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "celulas_redondas_normal",
      label: "Celulas Redondas Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "cilindros_normal",
      label: "Cilindros Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "cristales_normal",
      label: "Cristales Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "parasitos_normal",
      label: "Parasitos Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "mucoides_normal",
      label: "Mucoides Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "bacterias_normal",
      label: "Bacterias Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "globulos_rojos_normal",
      label: "Globos Rojos Normal",
      options: {
        filter: false,
      },
    },
    {
      name: "levadura_normal",
      label: "Levadura Normal",
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
    getRefUrianalisi();
    //getClinica();
  }, [])

  const getRefUrianalisi = () => {
    http
      .get("http://127.0.0.1:8000/api/refurianalisis")
      .then((response) => {
        setRefUrianalisis(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const closeInsert = () => { setModalInsert(false); clearData(); }
  const closeDelete = () => { setModalDelete(false); clearData(); }
  const closeUpdate = () => { setModalUpdate(false); clearData(); }
  const showInsert = () => { setModalInsert(true); setTipoModal("Insertar"); }
  const showUpdate = (refUrianalisi) => {
    setRefUrianalisi({
      id_refurianalisis: refUrianalisi[0],
      ph_min: refUrianalisi[1],
      ph_max: refUrianalisi[2],
      densidad_min: refUrianalisi[3],
      densidad_max: refUrianalisi[4],
      leucocitos_normal: refUrianalisi[5],
      nitrito_normal: refUrianalisi[6],
      proteina_normal: refUrianalisi[7],
      glucosa_normal: refUrianalisi[8],
      cuerpos_centonicos_normal: refUrianalisi[9],
      urobilogeno_normal: refUrianalisi[10],
      bilirrubina_normal: refUrianalisi[11],
      sangre_normal: refUrianalisi[12],
      celulas_escamosas_normal: refUrianalisi[13],
      celulas_redondas_normal: refUrianalisi[14],
      cilindros_normal: refUrianalisi[15],
      cristales_normal: refUrianalisi[16],
      parasitos_normal: refUrianalisi[17],
      mucoides_normal: refUrianalisi[18],
      bacterias_normal: refUrianalisi[19],
      globulos_rojos_normal: refUrianalisi[20],
      levadura_normal: refUrianalisi[21],
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
    setRefUrianalisi({ ...refUrianalisi, [name]: value })
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
      .put("http://127.0.0.1:8000/api/refurianalisis/" + refUrianalisi.id_refurianalisis, refUrianalisi)
      .then((response) => {
        Toast.fire({
          icon: 'info',
          title: 'Se han actualizado los parametros de referencia: '
        })
        closeUpdate();
        getRefUrianalisi();
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
    setRefUrianalisi({
        id_refurianalisis: '',
        ph_min: '',
        ph_max: '',
        ph_min: '',
        densidad_min: '',
        densidad_max: '',
        leucocitos_normal: '',
        nitrito_normal: '',
        proteina_normal: '',
        glucosa_normal: '',
        cuerpos_centonicos_normal: '',
        urobilogeno_normal: '',
        bilirrubina_normal: '',
        sangre_normal: '',
        celulas_escamosas_normal: '',
        celulas_redondas_normal: '',
        cilindros_normal: '',
        cristales_normal: '',
        parasitos_normal: '',
        mucoides_normal: '',
        bacterias_normal: '',
        globulos_rojos_normal: '',
        levadura_normal: '',
    })
  }

  const { id_refurianalisis, ph_min, ph_max, densidad_min, densidad_max, leucocitos_normal, nitrito_normal, proteina_normal, 
  glucosa_normal, cuerpos_centonicos_normal, urobilogeno_normal, bilirrubina_normal, sangre_normal, celulas_escamosas_normal,
  celulas_redondas_normal, cilindros_normal, cristales_normal, parasitos_normal, mucoides_normal, bacterias_normal, 
  globulos_rojos_normal, levadura_normal } = refUrianalisi;

  return (
    <>
      <div className='pt-3 container'>
        <DataTable
          titulo="Referencias de Urianalisis"
          noRegistro="No hay registro de referencias"
          columnas={columns}
          datos={refUrianalisis}
        />
        {/* Modales */}
        <ModalCrud
          abrirInsertar={modalInsert}
          cerrarInsertar={closeInsert}
          titulo="usuario"
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
                  <Form.Label>PH Minimo*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="ph_min"
                      name="ph_min"
                      required={true}
                      value={ph_min}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>PH Maximo*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="ph_max"
                      name="ph_max"
                      required={true}
                      value={ph_max}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Densidad Minima*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="densidad_min"
                      name="densidad_min"
                      required={true}
                      value={densidad_min}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Densidad Maxima*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="densidad_max"
                      name="densidad_max"
                      required={true}
                      value={densidad_max}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Leucocitos Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="leucocitos_normal"
                      name="leucocitos_normal"
                      required={true}
                      value={leucocitos_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nitrito Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="nitrito_normal"
                      name="nitrito_normal"
                      required={true}
                      value={nitrito_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>      
                <Form.Group>
                  <Form.Label>Proteina Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="proteina_normal"
                      name="proteina_normal"
                      required={true}
                      value={proteina_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>    
                <Form.Group>
                  <Form.Label>Glucosa Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="glucosa_normal"
                      name="glucosa_normal"
                      required={true}
                      value={glucosa_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>     
                <Form.Group>
                  <Form.Label>Cuerpos Centonicos Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="cuerpos_centonicos_normal"
                      name="cuerpos_centonicos_normal"
                      required={true}
                      value={cuerpos_centonicos_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>      
                <Form.Group>
                  <Form.Label>Cuerpos Centonicos Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="urobilogeno_normal"
                      name="urobilogeno_normal"
                      required={true}
                      value={urobilogeno_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>  
                <Form.Group>
                  <Form.Label>Bilirrubina Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="bilirrubina_normal"
                      name="bilirrubina_normal"
                      required={true}
                      value={bilirrubina_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>  
                <Form.Group>
                  <Form.Label>Sangre Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="sangre_normal"
                      name="sangre_normal"
                      required={true}
                      value={sangre_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Celulas Escamosas Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="celulas_escamosas_normal"
                      name="celulas_escamosas_normal"
                      required={true}
                      value={celulas_escamosas_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>     
                <Form.Group>
                  <Form.Label>Celulas Redondas Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="celulas_redondas_normal"
                      name="celulas_redondas_normal"
                      required={true}
                      value={celulas_redondas_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>  
                <Form.Group>
                  <Form.Label>Cilindros Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="cilindros_normal"
                      name="cilindros_normal"
                      required={true}
                      value={cilindros_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>       
                <Form.Group>
                  <Form.Label>Cristales Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="cristales_normal"
                      name="cristales_normal"
                      required={true}
                      value={cristales_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>  
                <Form.Group>
                  <Form.Label>Parasitos Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="parasitos_normal"
                      name="parasitos_normal"
                      required={true}
                      value={parasitos_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>    
                <Form.Group>
                  <Form.Label>Mucoides Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="mucoides_normal"
                      name="mucoides_normal"
                      required={true}
                      value={mucoides_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>   
                <Form.Group>
                  <Form.Label>Mucoides Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="bacterias_normal"
                      name="bacterias_normal"
                      required={true}
                      value={bacterias_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Globulos Rojos Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="globulos_rojos_normal"
                      name="globulos_rojos_normal"
                      required={true}
                      value={globulos_rojos_normal}
                      onChange={handleChange}
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Levadura Normal*</Form.Label>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Valor de Referencia
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="num"
                      id="levadura_normal"
                      name="levadura_normal"
                      required={true}
                      value={levadura_normal}
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

export default RefUrianalisi;