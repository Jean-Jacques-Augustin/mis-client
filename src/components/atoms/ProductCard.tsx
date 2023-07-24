import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ProductCardProps {
    product: Products;
}

interface Products {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, description, price } = product;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                <Button size="small" startIcon={<AddShoppingCartIcon />}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
