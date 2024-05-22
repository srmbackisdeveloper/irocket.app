import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Pagination, Tooltip } from "@nextui-org/react";

export const ProductComponent = () => {
  const query = useGetProducts();

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
            <Tooltip placement="top-end" offset={-10} className="bg-gray-600 text-white max-w-xs" showArrow={true} content="Если отключено, то бот не будет изменять цену данного товара">
              <th className="font-semibold w-[10%] p-2">Актив.</th>
            </Tooltip>
          </tr>
        </thead>
        <tbody>
          <ProductList query={query} />
        </tbody>
      </table>
      <div className="flex justify-end p-4">
        <Pagination color="danger" showControls total={5} initialPage={1} />
      </div>
    </div>
  );
};