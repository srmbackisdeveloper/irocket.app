import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";

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
                                    <span className="font-medium">Фото</span>
                                    <span className="font-medium">Название</span>
                                </div>
                                <div className="flex flex-wrap space-x-16">
                                    <span className="font-medium">Магазин</span>
                                    <span className="font-medium">Шаг</span>
                                    <span className="font-medium">Мин. цена</span>
                                    <span className="font-medium">Прод.</span>
                                    <span className="font-medium">Актив.</span>
                                    <span className="font-medium">Управ.</span>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ProductList query={query}  />
                </tbody>
            </table>
        </div>
    );
};
