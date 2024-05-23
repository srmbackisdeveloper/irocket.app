import { TProductsResponse } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");

    getAllProducts = async (page: number, limit: number): Promise<TProductsResponse> => {
        const response = await this.axios.get<TProductsResponse>(`/?page=${page}&limit=${limit}`);
        return response.data;
    }
}

export const productsAPI = new ProductsAPI();
