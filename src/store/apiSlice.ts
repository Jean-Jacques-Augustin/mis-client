import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UserInterface} from "../interfaces/UserInterface";
import {baseURL} from "../api/apiService";


const customHeader = 'Your-Custom-Header-Value';

export const misApi = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        /*prepareHeaders: (headers) => {
            headers.set('Authorization', customHeader);
            return headers;
        },*/
    }),
    endpoints: (builder) => ({
        getAllCategory: builder.query<any, void>({
            query: () => 'productCategory',
        }),
        getUsers: builder.query<UserInterface[], void>({
            query: () => 'users',
        }),

        // for product
        getAllProduct: builder.query<any, void>({
            query: () => 'products',
        }),
    })
});

export const {
    useGetAllProductQuery,
    useGetAllCategoryQuery,
    useGetUsersQuery
} = misApi;
