import React from "react";
import {AppBar, Container, IconButton, Hidden} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {StyledLink, StyledToolbar} from "./WithStyled";
import MenuIcon from "@mui/icons-material/Menu";


export default function Navigation() {
	return (
		<AppBar color="inherit"
				elevation={0}
				variant="outlined"
				position={"sticky"}
				sx={{
					opacity: 0.9,
					backdropFilter: "blur(8px)",
				}}
		>
			<Container>
				<StyledToolbar>
					<StyledLink to={"/"}>
						Home
					</StyledLink>

					<Hidden smDown>
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
					</Hidden>

					<div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
						<StyledLink
							to="/login"
						>
							Login
						</StyledLink>
						<IconButton color="inherit" aria-label="Panier">
							<ShoppingCartIcon/>
						</IconButton>

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
