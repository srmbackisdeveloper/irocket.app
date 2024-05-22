import { useQuery } from "@tanstack/react-query"
import { shopAPI } from "../services/shop"
import { TShop } from "../core/shop.type"

export const useGetShop = (id: TShop["id"]) => {
    return useQuery({
        queryKey: ["merchants", id],
        queryFn: () => shopAPI.getShop(id),
    })
}