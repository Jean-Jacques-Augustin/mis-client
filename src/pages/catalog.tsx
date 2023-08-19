import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/molecules/SearchBar";
import {Container} from "@mui/material";


export default function Catalog() {
    return (
        <Container>
            <br/>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography>
                    Catalogue
                </Typography>

                <SearchBar
                    placeholder="Rechercher..."
                    onSearch={() => {
                        console.log("Recherche...");
                    }}
                />
            </Box>
            <Box>
                <Typography>
                    Produits par catégorie
                </Typography>
            </Box>
        </Container>
    )
}