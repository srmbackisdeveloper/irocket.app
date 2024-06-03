import { TProducts, TProductsResponse } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");

    getAllProducts = async (page: number, limit: number, query?: string): Promise<TProductsResponse> => {
        let url = `/?ordering=id&page=${page}&limit=${limit}`;
        if (query) {
            url += `&search=${query}`;
        }
        const response = await this.axios.get<TProductsResponse>(url);
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
