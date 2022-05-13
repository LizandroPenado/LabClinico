import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const LabSidebarData = [
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Consultar examenes',
        path: '/labExamenes',
        icon: <PersonIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Gestionar parametros',
        path: '/parametros',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
];