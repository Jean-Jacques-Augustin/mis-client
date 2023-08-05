import {Box, Container, Grid, Typography} from "@mui/material";
import ProductCard from "../../atoms/product/ProductCard";
import FadeSlider from "../../atoms/FadeSlider";
import CardSlide from "../CardSlide";
import SimpleSlider from "../CardSlide";

interface Products {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

const placeholderImageURL = 'https://via.placeholder.com/600';
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

const PromotionTab = () => {
    return (
        <Box
            minHeight="100vh"
            bgcolor="#FF4500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Typography variant="h3" component="h1" color="white" gutterBottom>
                Promotion Tab Content
            </Typography>
            <Container>
               <SimpleSlider />
            </Container>
        </Box>
    );
};

export default PromotionTab;
