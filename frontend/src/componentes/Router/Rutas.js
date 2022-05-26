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

function Rutas() {
    const [dataUser, setDataUser] = useState([]);
    const { token } = AuthUser();

    useEffect(() => {
        setDataUser(JSON.parse(sessionStorage.getItem('rol')))
    }, [])
    return (
        <Routes>
            { !token ? (
                 <Route path="/" element={<InicioSesion />} />
            ):(
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
                            </>
                        )
                    case "SEC":
                        return (
                            <>
                                <Route path="/registrar" element={<RegistrarPaciente />} />
                            </>
                        )
                    case "LAB":
                        return (
                            <>
                            <Route path="/orden" element={<ConsultarExamen />} />
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