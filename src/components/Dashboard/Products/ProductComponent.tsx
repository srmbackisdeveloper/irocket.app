import { useState } from "react";
import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Tooltip, Pagination } from "@nextui-org/react";

export const ProductComponent = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const query = useGetProducts(page, limit);

  const totalPages = Math.ceil((query.data?.count ?? 0) / limit);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const hasProducts = (query.data?.results ?? []).length > 0;

  if (!hasProducts) {
    return null;
  }

  return (
    <div className="border rounded-lg p-3 overflow-x-auto">
      <table className="w-full min-w-max table-fixed">
        <thead className="border-b">
          <tr className="text-base">
            <th className="font-semibold w-1/2 p-2 text-left">Название</th>
            <th className="font-semibold w-[10%] p-2">Цена</th>
            <th className="font-semibold w-[10%] p-2">Тек. цен. место</th>
            <th className="font-semibold w-[10%] p-2">Цен. ориентир</th>
            <th className="font-semibold w-[10%] p-2">Раз. в цене</th>
            <Tooltip
              placement="top-end"
              offset={-10}
              className="bg-gray-600 text-white max-w-xs"
              showArrow={true}
              content="Если отключено, то бот не будет изменять цену данного товара"
            >
              <th className="font-semibold w-[10%] p-2">Актив.</th>
            </Tooltip>
          </tr>
        </thead>
        <tbody>
          <ProductList query={query} />
        </tbody>
      </table>
        <Pagination
          className="grid justify-center items-center mt-[2em] px-[4em]"
          showControls
          color="danger"
          size="lg"
          total={totalPages}
          initialPage={page}
          onChange={(page: number) => handlePageChange(page)}
        />
      </div>
  );
};
