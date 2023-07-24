import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { makeStyles } from "@mui/styles";
import ProductCard from "../atoms/ProductCard";

// URL du placeholder générique de taille 600x600
const placeholderImageURL = 'https://via.placeholder.com/600';

interface Products {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

const placeholderProducts: Products[] = [];

const generateRandomProduct = (id: number): Products => {
    const categories = ['Category 1', 'Category 2', 'Category 3'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    return {
        _id: id.toString(),
        name: `Product ${id}`,
        price: Math.random() * 100,
        description: `Description of Product ${id}`,
        category: randomCategory,
        image: placeholderImageURL,
        quantity: Math.floor(Math.random() * 20) + 1,
    };
};

for (let i = 1; i <= 30; i++) {
    const randomProduct = generateRandomProduct(i);
    placeholderProducts.push(randomProduct);
}

const useStyles = makeStyles(() => ({
    carouselContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
    },
    carouselSlider: {
        display: "flex",
        overflow: "hidden",
        margin: "auto",
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

const CardSlide: React.FC = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState<number>(3); // Commencer avec l'index au milieu des produits

    const handleNextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % placeholderProducts.length);
    };

    const handlePrevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? placeholderProducts.length - 1 : prevIndex - 1
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

    const lg = window.innerWidth >= 1280;
    const md = window.innerWidth >= 960 && window.innerWidth < 1280;
    const sm = window.innerWidth >= 600 && window.innerWidth < 960;

    // Rendre le slider infini avec clonage des produits
    const clonedProducts = [...placeholderProducts];
    const firstProducts = clonedProducts.slice(0, 3); // 3 produits pour afficher sur l'écran à la fois
    const lastProducts = clonedProducts.slice(-3); // 3 derniers produits

    return (
        <div className={classes.carouselContainer}>
            <div className={classes.carouselControls} style={{ left: 0 }}>
                <IconButton onClick={handlePrevSlide} className={classes.prevButton}>
                    <NavigateBeforeIcon />
                </IconButton>
            </div>
            <div className={classes.carouselSlider} style={{ transform: `translateX(-${activeIndex * 33.333333}%)`, width: '100%' }}>
                {lastProducts.map((product, index) => (
                    <div key={`last-${index}`} style={{ flex: 1, minWidth: lg ? "33.333333%" : md ? "50%" : sm ? "100%" : "100%" }}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {placeholderProducts.map((product, index) => (
                    <div key={index} style={{ flex: 1, minWidth: lg ? "33.333333%" : md ? "50%" : sm ? "100%" : "100%" }}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {firstProducts.map((product, index) => (
                    <div key={`first-${index}`} style={{ flex: 1, minWidth: lg ? "33.333333%" : md ? "50%" : sm ? "100%" : "100%" }}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className={classes.carouselControls} style={{ right: 0 }}>
                <IconButton onClick={handleNextSlide} className={classes.nextButton}>
                    <NavigateNextIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CardSlide;
