import { TProducts } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");
    
    getProducts = async (): Promise<TProducts[]> => {
        const response = await this.axios.get<TProducts[]>("/");
        return Array.isArray(response.data) ? response.data : [];
    }
}

export const productsAPI = new ProductsAPI();