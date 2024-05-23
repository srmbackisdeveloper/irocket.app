import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

export const ProductComponent = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const query = useGetProducts(page, limit);

  const totalPages = Math.ceil((query.data?.count || 0) / limit);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

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
      <div className="flex justify-between items-center p-4 mt-[2em]">
        <button
          className="px-4 py-2 bg-danger text-white rounded-md"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
          </svg>
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-danger text-white rounded-md"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
