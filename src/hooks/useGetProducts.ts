import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "../services/products";

export const useGetProducts = (page: number, limit: number, query?: string) => {
    return useQuery({
        queryKey: ["kaspi_products", page, limit, query],
        queryFn: () => productsAPI.getAllProducts(page, limit, query),
        staleTime: 5000,  
    });
};
