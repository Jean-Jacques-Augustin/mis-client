import { Box, Typography } from "@mui/material";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Cart () {
    const cart = useSelector((state: RootState) => state.cart);

    const [product, setProduct] = useState([]);


    return (
        <Box>
            <Typography variant="h5">
                Votre panier
            </Typography>
            <div>

            </div>
        </Box>
    )
}