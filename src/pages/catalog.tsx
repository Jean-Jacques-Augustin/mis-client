import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/molecules/SearchBar";
import {Container, Grid} from "@mui/material";
import {useGetAllProductQuery} from "../store/apiSlice";
import ProductCard from "../components/atoms/product/ProductCard";
import styled from "styled-components";

export const PageTitle = styled(Typography)`
    font-weight: 600;
    font-size: 1.3rem;
    margin-bottom: 10px;
`;

export default function Catalog() {
    const {data: products, isLoading, error} = useGetAllProductQuery();

    console.log("products", products);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>Error: {"message" in error ? error.message : "Erreur"}</div>
        );
    }
    return (
        <Container>
            <br />
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <PageTitle>Catalogue de produits</PageTitle>

                <SearchBar
                    placeholder="Rechercher..."
                    onSearch={() => {
                        console.log("Recherche...");
                    }}
                />
            </Box>
            <br />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}>
                {products?.data.map((product: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <ProductCard key={product.id} product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
