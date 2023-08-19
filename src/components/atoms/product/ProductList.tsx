import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {baseURL} from "../../../api/apiService";

const StyledCard = styled(Card)`
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 16px;
`;

const ProductName = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const ProductDescription = styled(Typography)`
  font-size: 1rem;
  color: #666;
  margin-bottom: 12px;
`;

const ProductPrice = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #007bff;
`;

const ProductQuantity = styled(Typography)`
  font-size: 1rem;
  color: #888;
`;

const CartButton = styled(IconButton)`
  margin-left: auto;
`;

const ProductList: React.FC<{ product: any }> = ({product}) => {
    const {name, description, price, quantity} = product;

    return (
        <StyledCard>
            <ProductImage crossOrigin="anonymous" src={`${baseURL}/${product.image}`} alt={product.name}/>
            <ProductInfo>
                <ProductName variant="h6">
                    {name}
                </ProductName>
                <ProductDescription variant="body1">
                    {description}
                </ProductDescription>
                <ProductPrice variant="body1">
                    ${price}
                </ProductPrice>
                <ProductQuantity variant="body2">
                    Quantity: {quantity}
                </ProductQuantity>
            </ProductInfo>
            <CartButton edge="end" aria-label="Add to Cart">
                <AddShoppingCartIcon/>
            </CartButton>
        </StyledCard>
    );
};

export default ProductList;
