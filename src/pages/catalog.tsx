import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/molecules/SearchBar";
import { CircularProgress, Container, Grid } from "@mui/material";
import { useGetAllProductQuery } from "../store/apiSlice";
import ProductCard from "../components/atoms/product/ProductCard";
import styled from "styled-components";

export const PageTitle = styled(Typography)`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

export default function Catalog() {
  const { data: products, isLoading, error } = useGetAllProductQuery();

  console.log("products", products);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;
  }
  return (
    <Container>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Catalogue de produits</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <SearchBar
            placeholder="Rechercher..."
            onSearch={() => {
              console.log("Recherche...");
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {products?.data.map((product: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
