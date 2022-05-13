import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const GuestSidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Inicio sesión',
        path: '/login',
        icon: <PersonIcon />,
        cName: 'nav-text'
    },
];