import {Box, Container, Grid, Typography} from "@mui/material";

const QuiSommmes = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 6
            }}
        >
            <Container>
                <Typography variant="h4" fontWeight={'700'}>
                    Qui sommes nous ?
                </Typography>
                <br/>
                <Typography variant="body1" fontWeight={'400'} align={'justify'}>
                    La Boutique MÍS EPICES DE MADAGASCAR est une petite entreprise créée et fondée en 2023 par
                    Miora.Située dans la vieille ville de Fianarantsoa (patrimoine architectural malgache dont il est
                    fortement encouragé la visite), la boutique propose une multitude de produits locaux, des produits
                    100% bio aux arômes exceptionnels, fruit d’une collaboration avec des producteurs et artisans
                    locaux. Par amour de la nature, Miora n’a jamais cessé de mettre en avant le secret de « La Santé au
                    Naturel » pour elle comme pour nous.« Corps Sains, Esprit Sain » En effet, la nature nous donne à
                    tout moment du bon et du beau suivant les saisons. Afin de valoriser la diversité de l’offre dans la
                    vieille ville de Fianarantsoa, la boutique MÍS EPICES DE MADAGASCAR a créé sa gamme de produits afin
                    de vous offrir que de beaux et de bons produits. Ces produits sont prêts à déguster ou à utiliser
                    chez vous. Nous veillons à ce que la qualité c'est aussi bien pour votre palais que pour votre
                    santé. MÍS EPICES DE MADAGASCAR prépare (broyage, concassage, conditionnement, mise en bocaux,
                    ensachage) et distribue ces produits.Tous les produits de MÍS EPICES DE MADAGASCAR permettent à des
                    familles ou des membres de la communauté d’avoir du travail pérenne ou simplement d’avoir un
                    complément de revenu dans des conditions optimums.
                </Typography>
            </Container>
        </Box>
    );
};

export default QuiSommmes;
