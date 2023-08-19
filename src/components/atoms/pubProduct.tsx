import React from "react";
import {Box, Typography} from "@mui/material";
import {baseURL} from "../../api/apiService";

interface ProductCartProps {
    imageSrc: string;
    productName: string;
    productDescription: string;
}

const PubProduct: React.FC<ProductCartProps> = ({
                                                    imageSrc,
                                                    productName,
                                                    productDescription,
                                                }) => {
    return (
        <Box
            borderRadius={2}
            p={2}
            style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            {/* Image du produit (utilisez l'URL réelle du produit si disponible, sinon utilisez le placeholder) */}
            <img
                crossOrigin="anonymous" src={`${baseURL}/${imageSrc}`} alt={productName}
                style={{
                    height: 600,
                    width: "50%",
                    objectFit: "cover",
                }}
            />
            <Box ml={2} flex="1">
                <Typography variant="h6" component="div">
                    {productName}
                </Typography>
                <Typography variant="body1" component="div">
                    {productDescription}
                </Typography>
            </Box>
        </Box>
    );
};

export default PubProduct;