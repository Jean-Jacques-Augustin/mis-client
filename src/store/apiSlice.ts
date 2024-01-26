import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInterface } from "../interfaces/UserInterface";
import { baseURL } from "../api/apiService";

const customHeader = "Your-Custom-Header-Value";

export const misApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    /*prepareHeaders: (headers) => {
            headers.set('Authorization', customHeader);
            return headers;
        },*/
  }),
  endpoints: (builder) => ({
    /**
     * for category
     */
    getAllCategory: builder.query<any, void>({
      query: () => "productCategory",
    }),

    /**
     * for user
     */
    getUsers: builder.query<UserInterface[], void>({
      query: () => "users",
    }),

    /**
     * for product
     */
    // get all product
    getAllProduct: builder.query<any, void>({
      query: () => "products",
    }),

    // get product by id
    getProductById: builder.query<any, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetAllCategoryQuery,
  useGetUsersQuery,
  useGetProductByIdQuery,
} = misApi;
