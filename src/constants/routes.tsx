import * as React from 'react';
import { Inbox as InboxIcon, Mail as MailIcon, Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, AccountCircle as AccountCircleIcon, Home as HomeIcon, Settings as SettingsIcon, ShoppingCart as ShoppingCartIcon, Favorite as FavoriteIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';

const routes = [
    {
        path: '/',
        icon: <InboxIcon />,
        text: 'Dashboard',
    },
    {
        path: '/dashboard/category',
        icon: <CategoryIcon />,
        text: 'Category',
    },
    {
        path: '/addCategory',
        icon: <AddIcon />,
        text: 'Add',
    },
    {
        path: '/delete',
        icon: <DeleteIcon />,
        text: 'Delete',
    },
    {
        path: '/edit',
        icon: <EditIcon />,
        text: 'Edit',
    },
    {
        path: '/account',
        icon: <AccountCircleIcon />,
        text: 'Account',
    },
    {
        path: '/home',
        icon: <HomeIcon />,
        text: 'Home',
    },
    {
        path: '/settings',
        icon: <SettingsIcon />,
        text: 'Settings',
    },
    {
        path: '/cart',
        icon: <ShoppingCartIcon />,
        text: 'Cart',
    },
    {
        path: '/favorite',
        icon: <FavoriteIcon />,
        text: 'Favorite',
    },
    {
        path: '/notifications',
        icon: <NotificationsIcon />,
        text: 'Notifications',
    },
];

export default routes;
