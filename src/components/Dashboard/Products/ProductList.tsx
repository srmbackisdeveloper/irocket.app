import { UseQueryResult } from "@tanstack/react-query";
import { TProducts } from "../../../core/products.type";
import { ProductItem } from "./ProductItem";
import { Spinner } from "@nextui-org/react";

type ProductListProps = {
  query: UseQueryResult<TProducts[], Error>;
};

export const ProductList: React.FC<ProductListProps> = ({ query }) => {
  const { data, status, error } = query;

  return (
    <>
      {status === "pending" && <tr><td colSpan={6} className="flex justify-center items-center w-screen h-[25vh]"><Spinner size="lg" color="danger"/></td></tr>}
      {status === "error" && <tr><td colSpan={6}>Error: {error.message}</td></tr>}
      {status === "success" && (
        <>
          {data?.map((products) => (
            <ProductItem key={products.id} products={products} />
          ))}
        </>
      )}
    </>
  );
};