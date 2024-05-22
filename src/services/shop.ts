import { TShop, TShopResponse } from '../core/shop.type';
import { axiosInstance } from './api';

class ShopAPI {
    private axios = axiosInstance("merchants");

    getShops = async() => {
        const response = await this.axios.get<TShopResponse>("/");
        return response.data.results;
    }

    getShop = async(id: TShop["id"]) => {
        const response = await this.axios.get<TShop>(`/${id}`);
        return response.data;
    }

    updateShopField = async (id: TShop["id"], fieldName: keyof TShop, newValue: any) => {
        const response = await this.axios.put<TShop>(`/${id}/`, {
            [fieldName]: newValue
        });
        return response.data;
    }

    createShop = async (kaspi_login: string, kaspi_password: string) => {
        const response = await this.axios.post<TShop>("/", {
            kaspi_login,
            kaspi_password
        });
        return response.data;
    }
}

export const shopAPI = new ShopAPI();