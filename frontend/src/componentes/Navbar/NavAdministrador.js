import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarBase from '../Layout/Navbar';
import { AdminSidebarData } from './Data/AdminSidebarData';

export default function NavAdministrador() {
    return (
        <>
            <NavbarBase
                data={
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        {AdminSidebarData.map((item, index) => {
                            return (
                                <li key={index} className="lista-opciones">
                                    <Link to={item.path} className="opciones">{item.icon} {' '} {item.title}</Link>
                                </li>
                            );
                        })}
                    </Nav>
                }>
            </NavbarBase>
        </>
    );
}