import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsArgs {
  category?: string | null;
  limit: number;
  skip: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsArgs>({
      query: ({ category, limit, skip, search, sortBy, order }) => {
        let url = 'products';

        if (search) {
          url = 'products/search';
        } else if (category) {
          url = `product/category/${category}`;
        }

        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        });

        if (search) {
          params.append('q', search);
        }

        if (sortBy && order) {
          params.append('sortBy', sortBy);
          params.append('order', order);
        }

        return `${url}?${params.toString()}`;
      },
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/category-list',
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
