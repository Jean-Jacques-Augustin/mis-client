import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import {AppBar, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";


export const StyledTypography = styled(Typography)(({theme}) => ({
    color: "inherit",
    textDecoration: "none",
}));


export const StyledAppBar = styled(AppBar)(({theme}) => ({
    backgroundColor: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(5px)",
    boxShadow: "none", // Remove default box shadow
}));

export const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
}));

export const StyledLink = styled(Link)(({theme}) => ({
    color: "inherit",
    textDecoration: "none",
}));
