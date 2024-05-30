import { TProducts, TProductsResponse } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");

    getAllProducts = async (page: number, limit: number): Promise<TProductsResponse> => {
        const response = await this.axios.get<TProductsResponse>(`/?ordering=id&page=${page}&limit=${limit}`);
        return response.data;
    }

    updateProductField = async (id: TProducts["id"], fieldName: keyof TProducts, newValue: any) => {
        const response = await this.axios.put<TProducts>(`/${id}/`, {
            [fieldName]: newValue
        });
        return response.data;
    }
}

export const productsAPI = new ProductsAPI();

