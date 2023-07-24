import React from "react";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import de l'icône de panier

export default function Navigation() {
    return (
        <AppBar color="default" elevation={0} variant="outlined" position={"sticky"}>
            <Container>
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        overflowX: "auto",
                    }}
                >
                    <Typography variant="h6" component="div">
                        Home
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                        <Typography variant="h6">Login</Typography>
                        <IconButton color="inherit" aria-label="Panier">
                            <ShoppingCartIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}