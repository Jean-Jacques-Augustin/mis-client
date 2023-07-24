import { Box, Typography, Button } from "@mui/material";

const About = () => {
    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundImage: "linear-gradient(to bottom, #2E86C1, #3498DB)", // Utilisez un dégradé de couleur pour le fond
                color: "white",
                textAlign: "center",
                padding: "40px 20px",
                lineHeight: 1.8, // Ajustez l'espacement des lignes pour faciliter la lecture
            }}
        >
            <Typography variant="h4" gutterBottom>
                Qui sommes-nous
            </Typography>
            <Typography variant="body1" gutterBottom>
                MIS Madagascar est une boutique en ligne spécialisée dans la vente de produits locaux authentiques. Depuis notre création, nous nous efforçons de mettre en valeur les saveurs uniques de Madagascar et de promouvoir les produits de qualité de notre pays.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Notre mission est de proposer une expérience culinaire exceptionnelle à nos clients en leur offrant une sélection variée de produits frais et délicieux. Nous travaillons en étroite collaboration avec des producteurs locaux pour garantir la fraîcheur et la qualité de nos produits.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Chez MIS Madagascar, nous croyons en l'importance de préserver les traditions culinaires de notre pays tout en innovant pour satisfaire les goûts modernes. Nous nous engageons à offrir à nos clients une expérience d'achat exceptionnelle et un service client de premier ordre.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Rejoignez-nous dans notre quête de découvrir les saveurs authentiques de Madagascar et de promouvoir les produits locaux de qualité. Commandez dès maintenant et plongez dans un voyage culinaire passionnant avec MIS Madagascar.
            </Typography>
            <Box marginTop={4}>
                <Button variant="contained" color="primary">
                    Découvrir nos produits →
                </Button>
            </Box>
        </Box>
    );
};

export default About;