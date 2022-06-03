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
import AgendarOrden from '../Paciente/AgendarOrden';


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
                                <Route path="/rol" element={<Rol />} />
                                <Route path="/menu" element={<GestionMenu />} />
                                <Route path="/privilegio" element={<Privilegios />} />
                            </>
                        )
                    case "SEC":
                        return (
                            <>
                                <Route path="/registrar" element={<RegistrarPaciente />} />
                                <Route path="/agenda" element={<AgendarOrden />} />
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