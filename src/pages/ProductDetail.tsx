import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../store/apiSlice";
import {FormattedMessage, useIntl} from "react-intl";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Container,
    Grid,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {baseURL} from "../api/apiService";
import {useDispatch} from "react-redux";
import {addToCart} from "../store/cartSlice";

// Styles
const styles = {
    card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
    },
    img: {
        width: "100%",
        height: "auto",
    },
    counterButton: {
        width: "40px",
        height: "40px",
        minWidth: "40px",
        minHeight: "40px",
    },
    detail: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        height: "100%",
        gap: "10px",
    },
    actionButton: {
        textTransform: "none",
        marginTop: "10px",
    },
};

export default function ProductDetail() {
    const dispatch = useDispatch();
    const [count, setCount] = useState<number>(0);
    const params = useParams<{id: string}>();
    const productId = params.id as string;
    const {data, error, isLoading} = useGetProductByIdQuery(productId);
    const intl = useIntl();
    const locale = ["fr", "en", "mg"].includes(intl.locale)
        ? intl.locale
        : intl.defaultLocale;
    const product = data?.data;

    const handleIncrement = () => setCount(prevCount => prevCount + 1);
    const handleDecrement = () =>
        setCount(prevCount => Math.max(prevCount - 1, 0));

    if (isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 3}}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{m: 3}}>
                <Alert severity="error">
                    Error: {"message" in error ? error.message : "Erreur"}
                </Alert>
            </Box>
        );
    }

    const HandleaddToCart = () => {
        if (count > 0) dispatch(addToCart({id: productId, quantity: count}));
    };

    return (
        <Container>
            <Box sx={{mt: 1}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography
                            variant="body2"
                            color="inherit"
                            textAlign="start">
                            <FormattedMessage id="product_detail" /> &gt;{" "}
                            {product?.name[locale]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={styles.card}>
                            <img
                                src={`${baseURL}/${product?.image}`}
                                alt={product?.name[locale]}
                                style={styles.img}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                height: "100%",
                                gap: "10px",
                            }}>
                            <Typography variant="body1" textAlign="start">
                                <b>
                                    <FormattedMessage id="product_name" /> :
                                </b>{" "}
                                {product?.name[locale]}
                            </Typography>
                            <Typography variant="body1" textAlign="start">
                                <b>
                                    <FormattedMessage id="product_description" />{" "}
                                    :
                                </b>{" "}
                                {product?.description[locale]}
                            </Typography>
                            <Typography variant="body1" textAlign="start">
                                <b>
                                    <FormattedMessage id="product_price" /> :
                                </b>{" "}
                                {product?.price}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    gap: "30px",
                                }}>
                                <ButtonGroup
                                    variant="outlined"
                                    color="inherit"
                                    disableElevation
                                    aria-label="outlined primary button group">
                                    <Button
                                        style={styles.counterButton}
                                        onClick={handleDecrement}>
                                        <RemoveIcon />
                                    </Button>
                                    <Button style={styles.counterButton}>
                                        <b>{count}</b>
                                    </Button>
                                    <Button
                                        style={styles.counterButton}
                                        onClick={handleIncrement}>
                                        <AddIcon />
                                    </Button>
                                </ButtonGroup>
                                <Typography variant="body1" textAlign="start">
                                    <b>
                                        <FormattedMessage id="product_total" />{" "}
                                        :
                                    </b>{" "}
                                    {product?.price * count} Ariary
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                size="large"
                                onClick={HandleaddToCart}
                                fullWidth
                                sx={styles.actionButton}>
                                <FormattedMessage id="add_to_cart" />
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                color="secondary"
                                size="large"
                                fullWidth
                                sx={styles.actionButton}>
                                <FormattedMessage id="buy_now" />
                            </Button>
                            <Button
                                color="inherit"
                                size="large"
                                disableElevation
                                fullWidth
                                sx={styles.actionButton}>
                                <FormattedMessage id="search_same_category" />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
