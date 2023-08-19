import React from "react";
import {AppBar, Container, Toolbar, Typography, IconButton} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {StyledAppBar, StyledLink, StyledToolbar} from "./WithStyled";




export default function Navigation() {
    return (
        <StyledAppBar color="default" elevation={0} variant="outlined" position={"sticky"}>
            <Container>
                <StyledToolbar>
                    <StyledLink to={"/"}>
                        Home
                    </StyledLink>

                    <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                        <StyledLink to={""}>
                            Catalogue
                        </StyledLink>
                        <StyledLink to={"/catalogue"}>
                            Promotion
                        </StyledLink>
                        <StyledLink to={"/catalogue"}>
                            Contact
                        </StyledLink>
                    </div>

                    <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                        <StyledLink
                            to="/login"
                        >
                            Login
                        </StyledLink>
                        <IconButton color="inherit" aria-label="Panier">
                            <ShoppingCartIcon/>
                        </IconButton>
                    </div>
                </StyledToolbar>
            </Container>
        </StyledAppBar>
    );
}
