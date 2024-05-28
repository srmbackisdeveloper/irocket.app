import { Spinner } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { ShopItem } from "./ShopItem";
import { useShopStore } from "../../../store/shopStore";

export const ShopList: FC = () => {
  const { shops, fetchShops, isFetching, fetchError } = useShopStore();

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return (
    <div className={`${(isFetching || fetchError) ? "p-3 border rounded-lg" : ""}`}>
      {isFetching && (
        <div className="flex justify-center items-center w-screen h-[45vh]">
          <Spinner size="lg" color="danger" />
        </div>
      )}
      {fetchError && (
        <div>fetchError: {fetchError}</div>
      )}
      {!isFetching && !fetchError && Array.isArray(shops) && shops.length > 0 && (
        <div className="flex flex-col gap-5">
          {shops.map((shop) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>
      )}
      {!isFetching && !fetchError && Array.isArray(shops) && shops.length === 0 && (
        <div className="flex flex-wrap justify-center items-center">У вас пока нету магазинов</div>
      )}
    </div>
  );
};
