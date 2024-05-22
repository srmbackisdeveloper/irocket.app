export type TShop = {
    id: number;
    name: string;
    merchant_id: string;
    enabled: boolean;
    enable_parsing: boolean;
    login: string;
    kaspi_token: string;
    password: string;
    price_auto_change: boolean;
    price_difference: number;
    price_place: string;
    allowed_number_of_products_with_price_change: number | null;
    allowed_number_of_products_with_remainders: number | null;
    competitors_to_exclude: string[];
    user: number;
};

export type TShopResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: TShop[];
};