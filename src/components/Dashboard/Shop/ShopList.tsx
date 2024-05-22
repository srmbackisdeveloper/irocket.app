import { Spinner } from "@nextui-org/react";
import { UseQueryResult } from "@tanstack/react-query";
import { TShop } from "../../../core/shop.type";
import { FC } from "react";
import { ShopItem } from "./ShopItem";

type ShopListProps = {
    query: UseQueryResult<TShop[], Error>;
}

export const ShopList: FC<ShopListProps> = ({ query }) => {
    const { data, status, error } = query;
    console.log(data)

    return (
        <div className="p-3 border rounded-lg">
          {status === "pending" && (
            <div className="flex justify-center items-center w-screen h-[30vh]">
              <Spinner size="lg" color="danger" />
            </div>
          )}
          {status === "error" && (
            <div>Error: {error?.message}</div>
          )}
          {status === "success" && Array.isArray(data) && (
            <>
              {data.map((shop) => (
                <ShopItem key={shop.id} shop={shop} />
              ))}
            </>
          )}
        </div>
    );
}
