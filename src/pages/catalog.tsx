import Typography from "@mui/material/Typography";
import SearchBar from "../components/molecules/SearchBar";
import {Container, Grid, Pagination} from "@mui/material";
import {useGetAllProductQuery} from "../store/apiSlice";
import ProductCard from "../components/atoms/product/ProductCard";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import LoadingPage from "./LoadingPage";


export default function Catalog() {
    const {data: products, isLoading, error} = useGetAllProductQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const locale = "fr";

    if (isLoading) {
        return (
            <LoadingPage
                size={"large"}
            />
        );
    }

    if (error) {
        return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;
    }

    const itemPerPage = 12;

    const filteredProducts = products?.data.filter((product: any) =>
        product.name[locale].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageNumbers = Math.ceil(filteredProducts?.length / itemPerPage);

    const indexOfLastItem = page * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    height: "100%",
                    gap: "10px",
                    minHeight: "88vh",
                    marginTop: "20px"
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} md={6}>
                        <Typography
                            align={"left"}
                            variant="h4">
                            <FormattedMessage id="catalog"/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SearchBar
                            placeholder="Rechercher..."
                            onSearch={(query) => setSearchQuery(query)}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    {currentItems.map((product: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <ProductCard key={product.id} product={product}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    margin: "20px 0"
                }}
            >
                <Pagination
                    page={page}
                    count={pageNumbers}
                    shape="rounded"
                    onChange={(event, value) => setPage(value)}
                />
            </div>
        </Container>
    );
}
