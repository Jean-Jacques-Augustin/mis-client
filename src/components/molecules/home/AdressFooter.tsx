import Box from "@mui/material/Box";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const socialNetworks = [
    {
        name: "Facebook",
        icon: <FacebookIcon style={{fontSize: "2rem"}} />,
        userName: "lebonnetrouge",
        url: "https://www.facebook.com/lebonnetrouge",
    },
    {
        name: "Twitter",
        userName: "lebonnetrouge",
        icon: <TwitterIcon style={{fontSize: "2rem"}} />,
        url: "https://www.twitter.com/lebonnetrouge",
    },
    {
        name: "Linkedin",
        userName: "lebonnetrouge",
        icon: <LinkedInIcon style={{fontSize: "2rem"}} />,
        url: "https://www.linkedin.com/lebonnetrouge",
    },
    {
        name: "Instagram",
        userName: "lebonnetrouge",
        icon: <LinkedInIcon style={{fontSize: "2rem"}} />,
        url: "https://www.linkedin.com/lebonnetrouge",
    },
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
                            <FormattedMessage id={"contact_us"} />
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
                                <Marker position={center} />
                            </GoogleMap>
                        </LoadScript>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
