import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const SidebarData = [
    /* {
        title: 'Login',
        path: '/',
        icon: <HomeIcon />,
        cName: 'nav-text'
    }, */
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <HomeIcon />,
        cName: 'nav-text',
    },
    {
        title: 'Registrar',
        path: '/registrarPaciente',
        icon: <PersonIcon />,
        cName: 'nav-text',
        rol: '2'
    },
    {
        title: 'Usuarios',
        path: '/usuario',
        icon: <GroupIcon />,
        cName: 'nav-text',
        rol: '1'
    },
    {
        title: 'Rol',
        path: '/rol',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text',
        rol: '1'
    },
];