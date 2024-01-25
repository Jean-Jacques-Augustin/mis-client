import {
  AppBar,
  Container,
  IconButton,
  Hidden,
  Badge,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StyledLink, StyledToolbar } from "./WithStyled";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";
import logo from "./../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useEffect } from "react";
import { clearUser } from "../../store/userSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const isConnected = useSelector(
    (state: RootState) => state.user.user.isLogged
  );
  const isAdmin = useSelector((state: RootState) => state.user.user.isAdmin);
  const username = useSelector((state: RootState) => state.user.user.name);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [data, setData] = React.useState({
    cart,
    user,
    isConnected,
    isAdmin,
  });

  useEffect(() => {
    setData({
      cart,
      user,
      isConnected,
      isAdmin,
    });
  }, [cart, user, isConnected, isAdmin]);

  const logOut = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      position={"fixed"}
      sx={{
        opacity: 0.9,
        backdropFilter: "blur(8px)",
      }}
    >
      <Container>
        <StyledToolbar>
          <StyledLink to={"/"}>
            <img src={logo} alt="logo" style={{ width: "60px" }} />
          </StyledLink>

          <Hidden smDown>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
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
            }}
          >
            {data.isConnected ?? (
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ textTransform: "none" }}
                >
                  <FormattedMessage id="se_connecter" />
                </Button>
              </Link>
            )}
            {data.isAdmin && (
              <Link to="/dashboard">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ textTransform: "none" }}
                >
                  <FormattedMessage id="dashboard" />
                </Button>
              </Link>
            )}

            <Link to={"/cart"}>
              <IconButton aria-label="cart">
                <Badge badgeContent={data.cart.items.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {isConnected ? (
              <Button
                variant="text"
                color="inherit"
                disableElevation
                style={{ textTransform: "none" }}
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "1rem",
                    }}
                  >
                    {username?.charAt(0)}
                  </Avatar>
                }
              >
                {username}
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ textTransform: "none" }}
                >
                  <FormattedMessage id="se_connecter" />
                </Button>
              </Link>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <FormattedMessage id={"profile"} />
              </MenuItem>
              <MenuItem onClick={logOut}>
                <FormattedMessage id={"logout"} />
              </MenuItem>
            </Menu>

            <Hidden mdUp>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
