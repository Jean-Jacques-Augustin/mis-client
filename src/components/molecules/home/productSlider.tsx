import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { makeStyles } from "@mui/styles";
import PubProduct from "../../atoms/pubProduct";

// URL du placeholder générique de taille 600x600
const placeholderImageURL = "https://via.placeholder.com/600";

interface SlideProduct {
    imageSrc: string;
    productName: string;
    productDescription: string;
}

const useStyles = makeStyles(() => ({
    carouselContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
    },
    carouselSlider: {
        display: "flex",
        transition: "transform 0.5s ease-in-out",
    },
    carouselControls: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
    },
    prevButton: {
        position: "absolute",
        left: 0,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
    },
    nextButton: {
        position: "absolute",
        right: 0,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
    },
}));

const ProductSlider: React.FC = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const slideProducts: SlideProduct[] = [
        {
            imageSrc: placeholderImageURL,
            productName: "Product 1",
            productDescription: "Description du produit 1",
        },
        {
            imageSrc: placeholderImageURL,
            productName: "Product 2",
            productDescription: "Description du produit 2",
        },
        {
            imageSrc: placeholderImageURL,
            productName: "Product 3",
            productDescription: "Description du produit 3",
        },
        {
            imageSrc: placeholderImageURL,
            productName: "Product 4",
            productDescription: "Description du produit 4",
        },
    ];

    const handleNextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slideProducts.length);
    };

    const handlePrevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? slideProducts.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const autoplayInterval = setInterval(() => {
            handleNextSlide();
        }, 5000);

        return () => {
            clearInterval(autoplayInterval);
        };
    }, [activeIndex]);

    return (
        <div className={classes.carouselContainer}>
            <div className={classes.carouselControls} style={{ left: 0 }}>
                <IconButton onClick={handlePrevSlide} className={classes.prevButton}>
                    <NavigateBeforeIcon />
                </IconButton>
            </div>
            <div className={classes.carouselSlider} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {slideProducts.map((product, index) => (
                    <div key={index} style={{ flex: 1, minWidth: "100%" }}>
                        <PubProduct
                            imageSrc={product.imageSrc}
                            productName={product.productName}
                            productDescription={product.productDescription}
                        />
                    </div>
                ))}
            </div>
            <div className={classes.carouselControls} style={{ right: 0, }}>
                <IconButton onClick={handleNextSlide} className={classes.nextButton}>
                    <NavigateNextIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSlider;