import {
    AppBar,
    Container,
    IconButton,
    Hidden,
    Badge,
    Typography,
    Avatar,
    Menu,
    MenuItem, Drawer, Card, Grid, Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {StyledLink, StyledToolbar} from "./WithStyled";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {FormattedMessage} from "react-intl";
import logo from "./../../img/logo.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import React, {useEffect} from "react";
import {clearUser} from "../../store/userSlice";
import ViewListIcon from "@mui/icons-material/ViewList";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CloseIcon from '@mui/icons-material/Close';


const list = [
    {
        name: <FormattedMessage id="catalog"/>,
        path: "/catalogue",
        icon: <ViewListIcon/>
    },
    {
        name: <FormattedMessage id="promotion"/>,
        path: "/promotion",
        icon: <LoyaltyIcon/>
    }
];

export default function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);
    const user = useSelector((state: RootState) => state.user.user);
    const isConnected = useSelector((state: RootState) => state.user.user.isLogged);
    const isAdmin = useSelector((state: RootState) => state.user.user.isAdmin);
    const username = useSelector((state: RootState) => state.user.user.name);
    const [mobileOpen, setMobileOpen] = React.useState(false);

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
                        <img src={logo} alt="logo" style={{width: "60px"}}/>
                    </StyledLink>

                    <Hidden smDown>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                        >
                            <StyledLink to={"/catalogue"}>
                                <FormattedMessage id="catalog"/>
                            </StyledLink>
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
                                    style={{textTransform: "none"}}
                                >
                                    <FormattedMessage id="se_connecter"/>
                                </Button>
                            </Link>
                        )}
                        <Hidden smDown>
                            {data.isAdmin && (
                                <Link to="/dashboard">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{textTransform: "none"}}
                                    >
                                        <FormattedMessage id="dashboard"/>
                                    </Button>
                                </Link>
                            )}
                        </Hidden>

                        <Link to={"/cart"}>
                            <IconButton aria-label="cart">
                                <Badge badgeContent={data.cart.items.length} color="secondary">
                                    <ShoppingCartIcon/>
                                </Badge>
                            </IconButton>
                        </Link>

                        {isConnected ? (
                            <Button
                                variant="text"
                                color="inherit"
                                disableElevation
                                style={{textTransform: "none"}}
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
                                    style={{textTransform: "none"}}
                                >
                                    <FormattedMessage id="se_connecter"/>
                                </Button>
                            </Link>
                        )}
                        {
                            isConnected && (
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
                                        <FormattedMessage id={"profile"}/>
                                    </MenuItem>
                                    <MenuItem onClick={logOut}>
                                        <FormattedMessage id={"logout"}/>
                                    </MenuItem>
                                </Menu>
                            )
                        }
                        <Drawer
                            anchor={"top"}
                            open={mobileOpen}
                            onClose={() => setMobileOpen(false)}
                        >
                            <Box>
                                <img src="/logo.svg" alt="logo"
                                     style={{width: "80px", margin: "auto", display: "block", marginTop: "1rem"}}
                                />
                                <List>
                                    {list.map((item, index) => (
                                        <ListItemButton
                                            component="a"
                                            href={item.path}
                                            key={index}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name}/>
                                        </ListItemButton>
                                    ))}
                                    {
                                        isAdmin && (
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DashboardIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={<FormattedMessage id="dashboard"/>}
                                                              style={{
                                                                  textTransform: "capitalize"
                                                              }}
                                                />
                                            </ListItemButton>
                                        )
                                    }
                                </List>
                                <Card>
                                    <CardContent>
                                        <Paper variant={"outlined"}
                                               style={{
                                                   padding: "1rem",
                                                   display: "flex",
                                                   alignItems: "center",
                                                   gap: "1rem"
                                               }}
                                        >
                                            <Avatar>{username?.charAt(0)}</Avatar>
                                            <Typography variant="h6">{username}</Typography>
                                        </Paper>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button variant="outlined" color="primary" fullWidth>
                                                    <FormattedMessage id={"profile"}/>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant="outlined" color="secondary" fullWidth>
                                                    <FormattedMessage id={"logout"}/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Box>
                            <div
                                style={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                }}
                            >
                                <IconButton color="inherit" aria-label="Menu"
                                            onClick={() => setMobileOpen(false)}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </Drawer>

                        <Hidden mdUp>
                            <IconButton color="inherit" aria-label="Menu"
                                        onClick={() => setMobileOpen(true)}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                    </div>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
