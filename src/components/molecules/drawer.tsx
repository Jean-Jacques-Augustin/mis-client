import {Avatar, Card, Box, Grid, Typography, Button} from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {FormattedMessage} from "react-intl";
import React from "react";

interface DrawerContentProps {
    isConnect: boolean;
    isAdmin: boolean;
    name?: string;
}

const list = [
    {
        name: "Catalogue",
        path: "/catalogue",
        icon: <ViewListIcon/>
    },
    {
        name: "Promotion",
        path: "/promotion",
        icon: <LoyaltyIcon/>
    },
    {
        name: "Contact",
        path: "/contact",
        icon: <AlternateEmailIcon/>
    }
];

const DrawerContent = ({isConnect, isAdmin, name}: DrawerContentProps) => {
    return (
        <Box sx={{width: 250}} role="presentation">
            <List>
                <ListItemButton component="a" href="/dashboard" key="Dashboard">
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemButton>
                {list.map((item) => (
                    <ListItemButton component="a" href={item.path} key={item.name}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

export default DrawerContent;
