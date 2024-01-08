import React, {useEffect, useState} from "react";
import {AppBar, Container, IconButton, Hidden, Badge} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {StyledLink, StyledToolbar} from "./WithStyled";
import MenuIcon from "@mui/icons-material/Menu";
import {Form, Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {FormattedMessage} from "react-intl";
import logo from "./../../img/logo.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export default function Navigation() {
    const cart = useSelector((state: RootState) => state.cart);
    console.log(cart);

    return (
        <AppBar
            color="inherit"
            elevation={0}
            variant="elevation"
            position={"fixed"}
            sx={{
                opacity: 0.9,
                backdropFilter: "blur(8px)",
            }}>
            <Container>
                <StyledToolbar>
                    <StyledLink to={"/"}>
                        <img src={logo} alt="logo" style={{width: "60px"}}/>
                    </StyledLink>

                    <Hidden smDown>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}>
                            <StyledLink to={""}>Catalogue</StyledLink>
                            <StyledLink to={"/catalogue"}>Promotion</StyledLink>
                            <StyledLink to={"/catalogue"}>Contact</StyledLink>
                        </div>
                    </Hidden>

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                        }}>
                        <Link to="/login">
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                disableElevation
                                style={{textTransform: "none"}}>
                                <FormattedMessage id={"se_connecter"}/>
                            </Button>
                        </Link>

                        <Link to={"/cart"}>
                            <IconButton aria-label="cart">
                                <Badge
                                    badgeContent={cart.items.length}
                                    color="secondary">
                                    <ShoppingCartIcon/>
                                </Badge>
                            </IconButton>
                        </Link>
                        <Hidden mdUp>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                    </div>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
