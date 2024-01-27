import React from "react";
import {CircularProgress, Typography, Grid, Card} from "@mui/material";
import {useGetStatsQuery} from "../../../store/apiSlice";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import PageHeader from "../../atoms/PageHeader";

export default function Stat() {
    const {data: stat, isLoading, error} = useGetStatsQuery();

    if (isLoading) return <CircularProgress/>;
    if (error)
        return (
            <div>Error: {"message" in error ? error.message : "Erreur"}</div>
        );

    console.log(stat);

    const renderProductsStats = () => {
        const productsStats = stat?.data?.productsCount[0];

        if (!productsStats) return null;

        return (
            <Paper
                elevation={0}
                style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >

                <Typography variant="h6">Products Statistics</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    {productsStats.totalProducts}
                                </Typography>
                                <Typography>Total Products</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    <b>{productsStats.averagePrice}</b> Ariary
                                </Typography>
                                <Typography>Average Price</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    const renderUsersStats = () => {
        const usersStats = stat?.data?.usersCount[0];

        if (!usersStats) return null;

        return (
            <Paper
                elevation={0}
                style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Typography variant="h6">Users Statistics</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    {usersStats.totalUsers}
                                </Typography>
                                <Typography>Total Users</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    <b>{usersStats.averagePasswordLength}</b> Characters
                                </Typography>
                                <Typography>Average Password Length</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    const renderCategoriesStats = () => {
        const categoriesStats = stat?.data?.categoriesCount[0];

        if (!categoriesStats) return null;

        return (
            <Paper
                elevation={0}
                style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Typography variant="h6">Categories Statistics</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant={"outlined"}
                        >
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    {categoriesStats.totalCategories}
                                </Typography>
                                <Typography>Total Categories</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant={"outlined"}
                        >
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{marginBottom: "10px"}}
                                >
                                    <b>{categoriesStats.totalCategories}</b>
                                </Typography>
                                <Typography>Average Products Per Category</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    return (
        <div>
            <PageHeader title='mis'/>
            <Grid container
                  spacing={2}
            >
                <Grid item xs={12} md={6}>
                    {renderProductsStats()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderUsersStats()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderCategoriesStats()}
                </Grid>
            </Grid>
        </div>

    );
}
