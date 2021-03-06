import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import InicioSesion from '../Login/Login';
import Inicio from '../Home/Inicio';
import Usuario from '../Usuario/Usuario';
import Rol from '../Rol/Rol';
import RegistrarPaciente from '../Paciente/RegistrarPaciente';
import GestionMenu from '../Menu/GestionMenu';
import AuthUser from '../Login/AuthUser';
import ConsultarExamen from '../Examenes/ConsultarExamen';
import Privilegios from '../Privilegios/Privilegios';
import TipoMuestra from '../GestionTipos/TipoMuestra';
import TipoExamen from '../GestionTipos/TipoExamen';
import GestionClinica from '../Clinica/GestionClinica';
import GestionEmpleado from '../Empleado/GestionEmpleado';
import AgregarEmpleado from '../Empleado/AgregarEmpleado';
import ConsultarEmpleado from '../Empleado/ConsultarEmpleado';
import Expediente from '../Expediente/Expediente';
import GestionPaciente from '../Paciente/GestionPaciente';
import AgendarOrden from '../Paciente/AgendarOrden';
import ExamenesSecretaria from '../Examenes/ExamenesSecretaria';
import RegistrarMuestra from '../Muestra/RegistrarMuestra';
import RefUrianalisi from '../RefUrianalisi/RefUrianalisi';
import RefQuimica from '../RefQuimica/RefQuimica';

function Rutas() {
    const [dataUser, setDataUser] = useState([]);
    const { token } = AuthUser();

    useEffect(() => {
        setDataUser(JSON.parse(sessionStorage.getItem('rol')))
    }, [])
    return (
        <Routes>
            {!token ? (
                <Route path="/" element={<InicioSesion />} />
            ) : (
                <></>
            )}
            <Route path="/inicio" element={<Inicio />} />
            {(() => {
                switch (dataUser.codigo_rol) {
                    case "ADM":
                        return (
                            <>
                                <Route path="/usuario" element={<Usuario />} />
                                <Route path="/empleado" element={<GestionEmpleado />} />
                                <Route path="/empleado/agregar" element={<AgregarEmpleado />} />
                                <Route path="/empleado/consultar/" element={<ConsultarEmpleado />} />
                            </>
                        )
                    case "SEC":
                        return (
                            <>
                                <Route path="/registrar" element={<RegistrarPaciente />} />
                                <Route path="/paciente" element={<Expediente />} />
                                <Route path="/gestionPac" element={<GestionPaciente />} />
                                <Route path="/paciente/agendar" element={<AgendarOrden />} />
                                <Route path="/ordenPaciente" element={<ExamenesSecretaria />} />
                                <Route path="/ordenPaciente/muestra" element={<RegistrarMuestra />} />
                            </>
                        )
                    case "LAB":
                        return (
                            <>
                                <Route path="/orden" element={<ConsultarExamen />} />
                                <Route path="/tipoMuestra" element={<TipoMuestra />} />
                                <Route path="/tipoExamen" element={<TipoExamen />} />
                            </>
                        )
                    case "JLA":
                        return (
                            <>
                            </>
                        )
                    case "ADG":
                        return (
                            <>
                                <Route path="/rol" element={<Rol />} />
                                <Route path="/menu" element={<GestionMenu />} />
                                <Route path="/privilegio" element={<Privilegios />} />
                                <Route path="/clinica" element={<GestionClinica />} />
                                <Route path="/refurianalisis" element={<RefUrianalisi />} />
                                <Route path="/refquimica" element={<RefQuimica />} />
                            </>
                        )
                    default:
                        return (
                            <>
                            </>
                        )
                }
            })()}
        </Routes>
    );
}

export default Rutas;