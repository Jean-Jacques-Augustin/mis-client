import React, {useState, useEffect, useRef} from "react";
import {IconButton} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {makeStyles} from "@mui/styles";
import ProductCard from "../atoms/product/ProductCard";

const useStyles = makeStyles(() => ({
    carouselContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
    },
    carouselSlider: {
        display: "flex",
        transition: "transform 0.5s ease-in-out",
        gap: "1rem",
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
        border: "1px solid white",
        position: "absolute",
        right: 0,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
    },
}));

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
    const categories = ["Category 1", "Category 2", "Category 3"];
    const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

    return {
        _id: id.toString(),
        name: `Product ${id}`,
        price: Math.random() * 100,
        description: `Description of Product ${id}`,
        category: randomCategory,
        image: "https://via.placeholder.com/600", // Placeholder image URL
        quantity: Math.floor(Math.random() * 20) + 1,
    };
};

for (let i = 1; i <= 30; i++) {
    const randomProduct = generateRandomProduct(i);
    placeholderProducts.push(randomProduct);
}

const CardSlide: React.FC = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [autoplayInterval, setAutoplayInterval] =
        useState<NodeJS.Timeout | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleNextSlide = () => {
        setActiveIndex(
            prevIndex => (prevIndex + 1) % placeholderProducts.length,
        );
    };

    const handlePrevSlide = () => {
        setActiveIndex(prevIndex =>
            prevIndex === 0 ? placeholderProducts.length - 1 : prevIndex - 1,
        );
    };

    const startAutoplay = () => {
        setAutoplayInterval(setInterval(handleNextSlide, 5000));
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            setAutoplayInterval(null);
        }
    };

    useEffect(() => {
        startAutoplay();
        return stopAutoplay;
    }, []); // Run only once on mount

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const containerWidth = slider.parentElement?.offsetWidth || 0;
            const itemsToShow = Math.floor(containerWidth / 300); // Adjust card width as needed
            const itemWidth = containerWidth / itemsToShow;
            const translateXValue = -itemWidth * activeIndex;
            slider.style.transform = `translateX(${translateXValue}px)`;
        }
    }, [activeIndex]);

    const lg = window.innerWidth >= 1280;
    const md = window.innerWidth >= 960 && window.innerWidth < 1280;
    const sm = window.innerWidth >= 600 && window.innerWidth < 960;
    const itemsToShow = lg ? 3 : md ? 2 : 1;

    const clonedProducts = [...placeholderProducts];
    const firstProducts = clonedProducts.slice(0, itemsToShow);
    const lastProducts = clonedProducts.slice(-itemsToShow);

    // mis à jour du itemsToShow on resize
    window.addEventListener("resize", () => {
        const lg = window.innerWidth >= 1280;
        const md = window.innerWidth >= 960 && window.innerWidth < 1280;
        const sm = window.innerWidth >= 600 && window.innerWidth < 960;
        const itemsToShow = lg ? 3 : md ? 2 : 1;
    });

    return (
        <div className={classes.carouselContainer}>
            <div className={classes.carouselControls} style={{left: 0}}>
                <IconButton
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={startAutoplay}
                    onClick={handlePrevSlide}
                    className={classes.prevButton}>
                    <NavigateBeforeIcon />
                </IconButton>
            </div>
            <div ref={sliderRef} className={classes.carouselSlider}>
                {/* {[...lastProducts, ...placeholderProducts, ...firstProducts].map((product, index) => (
                    <div key={index} style={{flex: 1, minWidth: `${100 / itemsToShow}%`}}>
                        <ProductCard product={product}/>
                    </div>
                ))}*/}
            </div>
            <div className={classes.carouselControls} style={{right: 0}}>
                <IconButton
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={startAutoplay}
                    onClick={handleNextSlide}
                    className={classes.nextButton}>
                    <NavigateNextIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CardSlide;
