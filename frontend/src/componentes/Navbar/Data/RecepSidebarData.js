import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const RecepSidebarData = [
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Registrar paciente',
        path: '/registrarPaciente',
        icon: <PersonIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Consultar paciente',
        path: '/consultarPaciente',
        icon: <GroupIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Consultar examenes',
        path: '/recepExamenes',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
];