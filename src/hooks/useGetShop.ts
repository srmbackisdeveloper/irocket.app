import { useQuery } from "@tanstack/react-query"
import { shopAPI } from "../services/shop"

export const useGetShops = () => {
    return useQuery({
        queryKey: ["merchants"],
        queryFn: shopAPI.getShops,
    })
}