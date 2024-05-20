import { TProducts } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");

    getProducts = async() => {
        const response = await this.axios.get<TProducts[]>("/");
        return response.data;
    }
}

export const productsAPI = new ProductsAPI();