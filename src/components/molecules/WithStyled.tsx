import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import {AppBar, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

export const StyledTypography = styled(Typography)(({theme}) => ({
    color: "inherit",
    textDecoration: "none",
}));

export const StyledAppBar = styled(AppBar)(({theme}) => ({
    // inhertite avec opacity de 0.8
    backgroundColor: "primary",
    backdropFilter: "blur(5px)",
    boxShadow: "none",
    border: "2px solid red",
}));

export const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
}));

export const StyledLink = styled(Link)(({theme}) => ({
    color: "inherit",
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily: "Salsa",
    fontSize: "1.2rem",

    "&:hover": {
        textDecoration: "underline",
        color: "#FBD636",
    },
}));
