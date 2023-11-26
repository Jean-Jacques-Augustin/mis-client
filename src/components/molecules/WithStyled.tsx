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
}));

export const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
}));

export const StyledLink = styled(Link)(({theme}) => ({
    color: "inherit",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.2rem",

    "&:hover": {
        textDecoration: "underline",
    }
}));
