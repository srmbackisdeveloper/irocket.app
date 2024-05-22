import { TProductsResponse, TProducts } from '../core/products.type';
import { axiosInstance } from './api';

class ProductsAPI {
    private axios = axiosInstance("kaspi_products");

    getAllProducts = async () => {
        let allProducts: TProducts[] = [];
        let page = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await this.axios.get<TProductsResponse>(`/?page=${page}`);
            allProducts = allProducts.concat(response.data.results);
            hasNextPage = Boolean(response.data.next);
            page++;
        }

        return allProducts;
    }
}

export const productsAPI = new ProductsAPI();
