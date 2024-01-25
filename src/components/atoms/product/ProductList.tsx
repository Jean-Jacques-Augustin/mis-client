import * as React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { baseURL } from "../../../api/apiService";
import products from "../../molecules/dashboard/product/Products";
import { FormattedMessage, useIntl } from "react-intl";
import { Product } from "../../../interfaces/ProductInterface";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const ProductInfo = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  padding: 10px;
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
  // 4 lines max
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
  text-align: justify;
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

const ProductList: React.FC<{ product: Product }> = ({ product }) => {
  const { name, description, price, quantity } = product;
  const intl = useIntl();
  const locale = intl.locale;

  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: "20px",
        borderRadius: "10px",
        height: 300,
        gap: "20px",
      }}
      variant={"outlined"}
    >
      <ProductImage
        crossOrigin="anonymous"
        src={`${baseURL}/${product.image}`}
        alt={product.name[locale]}
      />
      <ProductInfo>
        <ProductName variant="h6">
          <FormattedMessage id={"name"} />: {name[locale]}
        </ProductName>
        <ProductDescription variant="body1">
          <b>
            <FormattedMessage id={"description"} />:
          </b>{" "}
          {description[locale]}
        </ProductDescription>
        <ProductPrice variant="body1">
          <b>
            <FormattedMessage id={"price"} />:
          </b>{" "}
          ${price}
        </ProductPrice>
        <ProductQuantity variant="body2">Quantity: {quantity}</ProductQuantity>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button variant={"contained"} color={"primary"} startIcon={<Edit />}>
            <FormattedMessage id={"edit"} />
          </Button>
          <Button variant={"outlined"} color={"primary"} startIcon={<Edit />}>
            <FormattedMessage id={"delete"} />
          </Button>
        </div>
      </ProductInfo>
    </Card>
  );
};

export default ProductList;
