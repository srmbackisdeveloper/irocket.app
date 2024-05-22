import {
   Button,
   Divider,
   Select,
   SelectItem,
   VisuallyHidden,
} from '@nextui-org/react';
import { Search } from '../../shared/icons/Search.icon';
import { FC, useState } from 'react';
import { TShop } from '../../../core/shop.type';

const dataSizes = [10, 20, 30];

const labeledData = dataSizes.map((size) => ({
   label: size.toString(),
   value: size,
}));

type ProductSearchProps = {
    shops: TShop[];
}

export const ProductSearch: FC<ProductSearchProps> = ({ shops }) => {
    const [selectedSize, setSelectedSize] = useState<number>(labeledData[0].value);
    const [checkedShops, setCheckedShops] = useState<Set<number>>(new Set());

    const handleCheckboxChange = (shopId: number) => {
        setCheckedShops((prevCheckedShops) => {
            const newCheckedShops = new Set(prevCheckedShops);
            if (newCheckedShops.has(shopId)) {
                newCheckedShops.delete(shopId);
            } else {
                newCheckedShops.add(shopId);
            }
            return newCheckedShops;
        });
    };

    const handleSizeChange = (value: number) => {
        setSelectedSize(value);
    };

    return (
        <div className="border rounded-lg">
            <div className="p-3">
                <div className="md:flex sm:block items-center justify-between pb-5">
                    <div className="flex items-center gap-3">
                        <div className="flex border-gray-200 border-2 rounded-lg p-[6px] gap-2 max-w-[16em] max-h-fit items-center focus:border-black duration-200 focus-within:border-black">
                            <Search />
                            <input type="text" placeholder="Артикул / Название" className="" />
                        </div>
                        <Select
                            variant="bordered"
                            radius="sm"
                            value={selectedSize}
                            defaultSelectedKeys={[selectedSize]}
                            className="min-w-[4.5rem]"
                            aria-label="Select Size"
                            onChange={(e) => handleSizeChange(parseInt(e.currentTarget.value))}
                        >
                            {labeledData.map((data) => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Button
                        color="danger"
                        variant="bordered"
                        className="text-black px-7 my-3 font-semibold hover:bg-danger hover:text-white float-right"
                    >
                        Обновить
                    </Button>
                </div>
                <Divider />
                <div className="flex items-center gap-3 pt-5 pb-2">
                    <p className="text-xs text-gray-600 font-medium">Магазины:</p>
                    {shops.map((shop) => (
                        <label key={shop.id} className="inline-block">
                            <VisuallyHidden>
                                <input
                                    type="checkbox"
                                    checked={checkedShops.has(shop.id)}
                                    onChange={() => handleCheckboxChange(shop.id)}
                                />
                            </VisuallyHidden>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full cursor-pointer duration-300 ease-in ${checkedShops.has(shop.id) ? 'bg-danger text-white border border-transparent' : 'border border-gray-300 text-gray-700'}`}>
                                <span className="text-sm font-semibold">{shop.name}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
