import { UseQueryResult } from "@tanstack/react-query";
import { ProductItem } from "./ProductItem";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShopStore } from "../../../store/shopStore";
import { TProductsResponse } from "../../../core/products.type";

type ProductListProps = {
  query: UseQueryResult<TProductsResponse, Error>;
};

export const ProductList: React.FC<ProductListProps> = ({ query }) => {
  const { data, status, error } = query;
  const { shops, fetchShops } = useShopStore();
  const location = useLocation();

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const getShopNameById = (shopId: number) => {
    const shop = shops.find((shop) => shop.id === shopId);
    return shop ? shop.name : "Unknown Shop";
  };

  // Extract the query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

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
          <td colSpan={6}>Ошибка: {error.message}</td>
        </tr>
      )}
      {status === "success" && (
        <>
          {searchQuery && data?.results.length === 0 && (
            <tr className="flex justify-center items-center h-[30vh] w-screen">
              <td colSpan={6}>Нет данных для этого запроса</td>
            </tr>
          )}
          {!searchQuery && data?.results.length === 0 && (
            <tr className="flex justify-center items-center h-[30vh] w-screen">
              <td colSpan={6}>У вас пока нет продуктов</td>
            </tr>
          )}
          {data?.results.map((product) => (
            <ProductItem key={product.id} product={product} shopName={getShopNameById(product.merchant)} />
          ))}
        </>
      )}
    </>
  );
};
