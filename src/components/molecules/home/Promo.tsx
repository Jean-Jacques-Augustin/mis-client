import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useGetAllProductQuery} from "../../../store/apiSlice";
import {useIntl} from "react-intl";
import React from "react";
import ProductCard from "../../atoms/product/ProductCard";
import {Product} from "../../../interfaces/ProductInterface";
import {Container, Typography} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import {FormattedMessage} from "react-intl";

export default function Promo() {
    const {data: products, isLoading, error} = useGetAllProductQuery();
    const intl = useIntl();

    console.log("products", products);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const data = products?.data as Product[];

    if (error) {
        return (
            <div>Error: {"message" in error ? error.message : "Erreur"}</div>
        );
    }
    let settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        centeredMode: true,
        prevArrow: (
            <ArrowBackIosIcon
                fontSize={"large"}
                sx={{
                    fontSize: "3rem",
                    position: "absolute",
                    top: "50%",
                    left: "-2rem",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    borderRadius: "50%",
                    padding: "0.5rem 0.5rem 0.5rem 1.2rem",
                    color: "inherit",
                    "&:hover": {
                        color: "inherit"
                    },
                }}
            />
        ),
        nextArrow: (
            <ArrowForwardIosIcon
                fontSize={"large"}
                sx={{
                    fontSize: "3rem",
                    position: "absolute",
                    top: "50%",
                    right: "-2rem",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    borderRadius: "50%",
                    padding: "0.5rem 1.2rem 0.5rem 0.5rem",
                    color: "inherit",
                    "&:hover": {
                        color: "blue",
                    },
                }}
            />
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div
            style={{
                padding: "50px 0",
                background: "inherit",
            }}>
            <Container>
                <Box>
                    <Typography variant="h4" fontWeight={"600"}>
                        <FormattedMessage id="promotion"/>
                    </Typography>
                    <br/>
                    <Typography
                        variant={"h6"}
                        className={"text-center text-6xl"}>
                        <FormattedMessage id="promo_text"/>
                    </Typography>
                    <br/>

                    <Slider {...settings}>
                        {data?.map((products: any) => (
                            <ProductCard
                                key={products._id}
                                onSlide
                                product={products}
                            />
                        ))}
                    </Slider>
                </Box>
            </Container>
        </div>
    );
}
