import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "../services/products";

export const useGetProducts = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["kaspi_products", page, limit],
        queryFn: () => productsAPI.getAllProducts(page, limit),
        staleTime: 5000,  
    });
};
