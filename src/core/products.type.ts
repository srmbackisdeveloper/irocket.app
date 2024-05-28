export type TProducts = {
    id: number;
    title: string;
    price: number;
    current_price_place: number;
    first_place_price: number;
    second_place_price: number;
    target_price_place: number;
    price_difference: number;
    code: number;
    price_auto_change: boolean;
    product_card_link: string;
    product_image_link: string;
    merchant: number;
}

export type TProductsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: TProducts[];
};