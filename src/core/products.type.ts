export type TProducts = {
    id: number;
    title: string;
    price: number;
    current_price_place: string;
    target_price_place: string;
    price_difference: number;
    code: number;
    price_auto_change: boolean;
}

export type TProductsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: TProducts[];
  };