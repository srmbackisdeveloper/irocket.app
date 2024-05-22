import { TShop } from '../core/shop.type';
import { axiosInstance } from './api';

class ShopAPI {
    private axios = axiosInstance("merchants");

    getShops = async() => {
        const response = await this.axios.get<TShop[]>("/");
        return response.data;
    }

    getShop = async(id: TShop["id"]) => {
        const response = await this.axios.get<TShop>(`/${id}`);
        return response.data;
    }
}

export const shopAPI = new ShopAPI();