import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const JefeSidebarData = [
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Urianalisis',
        path: '/reporteUrianalisis',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Quimica clinica',
        path: '/reporteQuimica',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Hematologia',
        path: '/reporteHematologia',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Cropologia',
        path: '/reporteCropologia',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
];