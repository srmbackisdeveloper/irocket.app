import { UseQueryResult } from "@tanstack/react-query";
import { ProductItem } from "./ProductItem";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useShopStore } from "../../../store/shopStore";
import { TProductsResponse } from "../../../core/products.type";

type ProductListProps = {
  query: UseQueryResult<TProductsResponse, Error>;
};

export const ProductList: React.FC<ProductListProps> = ({ query }) => {
  const { data, status, error } = query;
  const { shops, fetchShops } = useShopStore();
  
  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const getShopNameById = (shopId: number) => {
    const shop = shops.find((shop) => shop.id === shopId);
    return shop ? shop.name : "Unknown Shop";
  };

  return (
    <>
      {status === "pending" && (
        <tr>
          <td colSpan={6} className="flex justify-center items-center w-screen h-[40vh]">
            <Spinner size="lg" color="danger" />
          </td>
        </tr>
      )}
      {status === "error" && (
        <tr>
          <td colSpan={6}>Error: {error.message}</td>
        </tr>
      )}
      {status === "success" && (
        <>
          {data?.results.length === 0 && (
            <tr className="flex justify-center items-center">
              <td colSpan={6}>У вас пока нету подуктов. Попробуйте обновить страницу</td>
            </tr>
          )}
          {data?.results.map((products) => (
            <ProductItem key={products.id} products={products} shopName={getShopNameById(products.merchant)} />
          ))}
        </>
      )}
    </>
  );
};
