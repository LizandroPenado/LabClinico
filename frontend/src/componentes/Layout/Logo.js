import React from 'react';
import Logo from './img/Logo.png';
import { Image } from 'react-bootstrap';

export default function logo() {
    return (
        <div className="pr-3">
            <Image src={Logo}  height="45" alt="Logo SILAC" />
        </div>
    );
}