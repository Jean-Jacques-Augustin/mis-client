import Box from "@mui/material/Box";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';

const socialNetworks = [
    {
        name: "Facebook",
        icon: <FacebookIcon style={{fontSize: "2rem"}}/>,
        userName: "MÍS Epices de Madagascar",
        url: "https://web.facebook.com/profile.php?id=100095674056399",
    },
    {
        name: "Linkedin",
        userName: "MÍS Epices de Madagascar",
        icon: <LinkedInIcon style={{fontSize: "2rem"}}/>,
        url: "https://www.linkedin.com/company/m%C3%ADs-epices-de-madagascar/",
    },
    {
        name: "Instagram",
        userName: "MÍS Epices de Madagascar",
        icon: <InstagramIcon style={{fontSize: "2rem"}}/>,
        url: "https://www.instagram.com/mis_epices_de_madagascar/",
    },
    {
        name: "Téléphone",
        userName: "+261 34 05 336 14",
        icon: <LocalPhoneIcon style={{fontSize: "2rem"}}/>,
        url: "tel:+261340533614",
    },
    {
        name: "Email",
        userName: "contact@misfianarantsoa.com",
        icon: <MailIcon style={{fontSize: "2rem"}}/>,
        url: "mailto:contact@misfianarantsoa.com",
    }
];

export default function AdressInfo() {
    const containerStyle = {
        width: "100%",
        height: "300px", // Réglez la hauteur selon vos besoins
    };

    const center = {
        lat: -21.4599533,
        lng: 47.0772754, // Remplacez ces coordonnées par celles de votre adresse
    };

    return (
        <Box minHeight="50vh" padding={"5rem 0"}>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" fontWeight={"600"}>
                            <FormattedMessage id={"contact_us"}/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            {socialNetworks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                        margin: "0 0.5rem",
                                        fontSize: "1.5rem",
                                    }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "center",
                                            marginLeft: "0.5rem",
                                        }}>
                                        {item.icon}
                                        <Typography
                                            variant={"body2"}
                                            fontWeight={"600"}
                                            color={"text.secondary"}>
                                            {item.userName}
                                        </Typography>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LoadScript googleMapsApiKey="AIzaSyDMuyQZzLYUt3opySUdPp6ZORNgp4HvkyQ">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={15}>
                                <Marker position={center}/>
                            </GoogleMap>
                        </LoadScript>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
