export type TProducts = {
    id: number;
    title: string;
    price: number;
    current_price_place: number;
    target_price_place: number;
    price_difference: number;
    code: number;
    price_auto_change: boolean;
    merchant: number;
}

export type TProductsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: TProducts[];
};