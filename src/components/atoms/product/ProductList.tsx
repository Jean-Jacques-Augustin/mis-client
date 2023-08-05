import * as React from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
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

const StyledListItem = styled(ListItem)`
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductName = styled(ListItemText)`
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProductDescription = styled(ListItemText)`
  font-size: 1rem;
  color: #555;
`;

const ProductPrice = styled(ListItemText)`
  font-size: 1rem;
  font-weight: 600;
`;

const ProductList: React.FC<ProductCardProps> = ({product}) => {
    const {name, description, price} = product;

    return (
        <StyledListItem>
            <img src={product.image} alt={product.name} style={{width: '100px', marginRight: '16px'}}/>
            <div style={{flex: 1}}>
                <ProductName primary={name}/>
                <ProductDescription primary={description}/>
                <ProductPrice primary={`Price: $${price}`}/>
            </div>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Add to Cart">
                    <AddShoppingCartIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </StyledListItem>
    );
};

export default ProductList;
