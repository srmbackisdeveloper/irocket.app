import { Spinner } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { ShopItem } from "./ShopItem";
import { useShopStore } from "../../../store/shopStore";

export const ShopList: FC = () => {
  const { shops, fetchShops, isLoading, error } = useShopStore();

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return (
    <div className="p-3 border rounded-lg">
      {isLoading && (
        <div className="flex justify-center items-center w-screen h-[30vh]">
          <Spinner size="lg" color="danger" />
        </div>
      )}
      {error && (
        <div>Error: {error}</div>
      )}
      {!isLoading && !error && Array.isArray(shops) && (
        <>
          {shops.map((shop) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </>
      )}
    </div>
  );
};
