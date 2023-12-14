import {Box, Typography, Grid, Container} from "@mui/material";
import LandingBox, {LandingBoxProps} from "../../atoms/LandingBox";
import cartIcon from "../../../img/cart.svg";
import deliveryIcon from "../../../img/delivery.svg";
import paymentIcon from "../../../img/pay.svg";
import {FormattedMessage} from "react-intl";

const LivraisonProcess: LandingBoxProps[] = [
    {
        title: "choose_product",
        description: "choix_produit",
        icone: (
            <img
                src={cartIcon}
                alt="Choisissez vos produits"
                style={{
                    width: 70,
                    height: 70,
                }}
            />
        ),
    },
    {
        title: "payment_online",
        description: "paiement_texte",
        icone: (
            <img
                src={paymentIcon}
                alt="Paiement en ligne"
                style={{
                    width: 70,
                    height: 70,
                }}
            />
        ),
    },
    {
        title: "livraison",
        description: "livraison_produit",
        icone: (
            <img
                src={deliveryIcon}
                alt="Livraison"
                style={{
                    width: 70,
                    height: 70,
                }}
            />
        ),
    },
];

const Target = () => {
    return (
        <Box minHeight="50vh" padding={"5rem 0"}>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                }}>
                <Typography variant="h4" fontWeight={"600"}>
                    <FormattedMessage id={"comment_ca_marche"} />
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <FormattedMessage id={"comment_ca_marche_text"} />
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    {LivraisonProcess.map((item, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}>
                            <LandingBox {...item} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Target;
