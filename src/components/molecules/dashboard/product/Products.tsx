import * as React from 'react';
import ProductList from '../../../atoms/product/ProductList';
import PageHeader from "../../../atoms/PageHeader";
import {Box} from '@mui/material';
// Assuming this is the path to your ProductList component

// Dummy product data
const dummyData = [
    {
        _id: '1',
        name: 'Product 1',
        price: 10.99,
        description: 'This is the first product description.',
        category: 'Category 1',
        image: 'https://via.placeholder.com/150',
        quantity: 50,
    },
    {
        _id: '2',
        name: 'Product 2',
        price: 19.99,
        description: 'This is the second product description.',
        category: 'Category 2',
        image: 'https://via.placeholder.com/150',
        quantity: 30,
    },
];

const ProductListPage: React.FC = () => {
    return (
        <Box>
            <PageHeader title="products" buttonLabel="add_product" buttonColor="primary" to="/dashboard/addProduct"/>

            {dummyData.map((product) => (
                <ProductList key={product._id} product={product}/>
            ))}
        </Box>
    );
};

export default ProductListPage;
