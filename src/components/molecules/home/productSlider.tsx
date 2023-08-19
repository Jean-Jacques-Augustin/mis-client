import React, {useState, useEffect} from "react";
import {IconButton} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {makeStyles} from "@mui/styles";
import PubProduct from "../../atoms/pubProduct";
import {useGetAllProductQuery} from "../../../store/apiSlice";
import {useIntl} from "react-intl";

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
    controlButton: {
        position: "absolute",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
    },
    prevButton: {
        left: 0,
    },
    nextButton: {
        right: 0,
    },
}));

const ProductSlider: React.FC = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const {data: products, isLoading, error} = useGetAllProductQuery();
    const intl = useIntl();

    useEffect(() => {
        const autoplayInterval = setInterval(handleNextSlide, 5000);

        return () => {
            clearInterval(autoplayInterval);
        };
    }, [activeIndex]);

    const data = products?.data || [];


    const processedData = data.map((product: any) => {
        const parsedName = JSON.parse(product?.name || "{}");
        const parsedDescription = JSON.parse(product?.description || "{}");
        const locale = intl.locale;

        return {
            _id: product?._id || "",
            name: parsedName[locale] || "",
            price: product?.price || 0,
            description: parsedDescription[locale] || "",
            category: product?.category || "",
            image: product?.image || "",
            quantity: product?.quantity || 0,
        };
    });


    const handleNextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % processedData.length);
    };

    const handlePrevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? processedData.length - 1 : prevIndex - 1
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;
    }


    return (
        <div className={classes.carouselContainer}>
            <div className={`${classes.carouselControls} ${classes.prevButton}`}>
                <IconButton onClick={handlePrevSlide} className={classes.controlButton}>
                    <NavigateBeforeIcon/>
                </IconButton>
            </div>
            <div
                className={classes.carouselSlider}
                style={{transform: `translateX(-${activeIndex * 100}%)`}}
            >
                {processedData.map((product: any) => (
                    <div key={product._id} style={{flex: 1, minWidth: "100%"}}>
                        <PubProduct
                            imageSrc={product.image}
                            productName={product.name}
                            productDescription={product.description}
                        />
                    </div>
                ))}
            </div>
            <div className={`${classes.carouselControls} ${classes.nextButton}`}>
                <IconButton onClick={handleNextSlide} className={classes.controlButton}>
                    <NavigateNextIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSlider;
