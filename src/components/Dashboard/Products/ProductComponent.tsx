import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Pagination } from "@nextui-org/react";

export const ProductComponent = () => {
    const query = useGetProducts();

    return (
        <div className="border rounded-lg p-3 overflow-x-auto">
            <table className="w-full min-w-max">
                <thead className="border-b">
                    <tr className="text-sm">
                        <th className="font-medium">
                            <div className="flex flex-wrap justify-between items-center my-[0.5em]">
                                <div className="flex flex-wrap space-x-16">
                                    <span className="font-medium">Название</span>
                                </div>
                                <div className="flex flex-wrap space-x-[4em]">
                                    <span className="font-medium">Цена</span>
                                    <span className="font-medium">Тек. цен. место</span>
                                    <span className="font-medium">Цен. ориентир</span>
                                    <span className="font-medium">Раз. в цене</span>
                                    <span className="font-medium">Актив.</span>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ProductList query={query} />
                    <div className="flex flex-wrap p-4 justify-end items-center">
                        <Pagination color="danger" showControls total={5} initialPage={1} />
                    </div>
                </tbody>
            </table>
        </div>
    );
};
