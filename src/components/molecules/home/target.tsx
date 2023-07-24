import { Box, Typography, Button } from "@mui/material";

const backgroundImage = "https://img.freepik.com/photos-gratuite/feuilles-automne-vives-transparentes_23-2148239689.jpg?w=1380&t=st=1690055470~exp=1690056070~hmac=36cc16fd63b36335622ea9d6bcaa10b619ab79c16390b31567e37277218e9bec";

const Target = () => {
    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                color: "white",
                textAlign: "center",
                padding: 4,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)", // Ajoute une ombre subtile au conteneur
                backdropFilter: "blur(4px)", // Ajoute un effet de flou au fond pour une apparence élégante
            }}
        >
            <Typography variant="h4" gutterBottom>
                Notre Devise
            </Typography>
            <Typography variant="body1" gutterBottom>
                MIS Madagascar, votre boutique en ligne, propose des produits locaux authentiques.
                Découvrez notre sélection de saveurs uniques. Commandez dès maintenant et plongez dans l'expérience
                culinaire exceptionnelle qu'offre notre collection de produits de qualité.
            </Typography>
            <Box display="flex" justifyContent="space-between" maxWidth="400px" margin="auto" marginTop={4}>
                <Button variant="contained" color="primary">
                    Ajouter dans le panier →
                </Button>
                <Button variant="contained" color="primary">
                    Acheter →
                </Button>
                <Button variant="contained" color="primary">
                    S'inscrire →
                </Button>
                <Button variant="contained" color="primary">
                    Livrer →
                </Button>
            </Box>
            <Typography variant="body2" gutterBottom>
                Offices worldwide
            </Typography>
            <Typography variant="body2" gutterBottom>
                12 Full-time colleagues
            </Typography>
            <Typography variant="body2" gutterBottom>
                300+ Disponibilité du site
            </Typography>
            <Typography variant="body2">
                24/24 Paid time off
            </Typography>
        </Box>
    );
};

export default Target;