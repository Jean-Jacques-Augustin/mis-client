import * as React from "react";
import ProductList from "../../../atoms/product/ProductList";
import PageHeader from "../../../atoms/PageHeader";
import { Box } from "@mui/material";
import { useGetAllProductQuery } from "../../../../store/apiSlice";
import { useIntl } from "react-intl";

const ProductListPage: React.FC = () => {
  const { data: products, isLoading, error } = useGetAllProductQuery();
  const intl = useIntl();
  if (isLoading) return <div>Loading...</div>;

  if (error)
    return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;

  const data = products?.data || [];

  return (
    <Box>
      <PageHeader
        title="products"
        buttonLabel="add_product"
        buttonColor="primary"
        to="/dashboard/addProduct"
      />

      {products.data.map((product: any) => (
        <div key={product._id}>
          <ProductList product={product} />
        </div>
      ))}
    </Box>
  );
};

export default ProductListPage;
