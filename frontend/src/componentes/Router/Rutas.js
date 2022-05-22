import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import InicioSesion from '../Login/Login';
import Inicio from '../Home/Inicio';
import Usuario from '../Usuario/Usuario';
import Rol from '../Rol/Rol';
import RegistrarPaciente from '../Paciente/RegistrarPaciente';

function Rutas() {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        setDataUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])
    return (
        <Routes>
            <Route path="/" element={<InicioSesion />} />
            <Route path="/inicio" element={<Inicio />} />
            {(() => {
                switch (dataUser.rol_id) {
                    case "1":
                        return (
                            <>
                                <Route path="/usuario" element={<Usuario />} />
                                <Route path="/rol" element={<Rol />} />
                            </>
                        )
                    case "2":
                        return (
                            <>
                                <Route path="/registrarPaciente" element={<RegistrarPaciente />} />
                            </>
                        )
                    case "3":
                        return (
                            <>
                            </>
                        )
                    case "4":
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