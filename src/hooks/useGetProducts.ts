import { useQuery } from "@tanstack/react-query"
import { productsAPI } from "../services/products"

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["kaspi_products"],
        queryFn: productsAPI.getProducts,
    })
}