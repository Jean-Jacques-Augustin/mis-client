import * as React from 'react';
import ProductList from '../../../atoms/product/ProductList';
import PageHeader from "../../../atoms/PageHeader";
import { Box } from '@mui/material';
import { useGetAllProductQuery } from "../../../../store/apiSlice";
import {useIntl} from "react-intl";

const ProductListPage: React.FC = () => {
    const { data: products, isLoading, error } = useGetAllProductQuery();
    const intl = useIntl();
    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {"message" in error ? error.message : 'Erreur'}</div>;

    const data = products?.data || [];

    const processedData = data.map((product: any) => {
        const parsedName = JSON.parse(product?.name || '{}');
        const parsedDescription = JSON.parse(product?.description || '{}');


        const locale = intl.locale;

        console.log(locale);

        return {
            _id: product?._id || '',
            name: parsedName[locale] || '',
            price: product?.price || 0,
            description: parsedDescription[locale] || '',
            category: product?.category || '',
            image: product?.image || '',
            quantity: product?.quantity || 0,
        };
    });

    console.log(processedData);

    return (
        <Box>
            <PageHeader title="products" buttonLabel="add_product" buttonColor="primary" to="/dashboard/addProduct" />

            {processedData.map((product:any) => (
                <div key={product._id}>
                    <ProductList product={product} />
                </div>
            ))}
        </Box>
    );
};

export default ProductListPage;
