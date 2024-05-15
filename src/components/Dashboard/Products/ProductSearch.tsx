import { Button, Select, SelectItem } from "@nextui-org/react";
import { Search } from "../../shared/icons/Search.icon";
import { useState } from "react";

const dataSizes = [
    10, 20, 30
];

const labeledData = dataSizes.map(size => ({
    label: size.toString(),
    value: size
}));

export const ProductSearch = () => {
    const [selectedSize, setSelectedSize] = useState<number>(labeledData[0].value);

    const handleSizeChange = (value: number) => {
        setSelectedSize(value);
    };

    return (
        <div className="">
            <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                    <div className="flex border-gray-200 border-2 rounded-lg p-[6px] gap-2 max-w-[16em] max-h-fit items-center focus:border-black duration-200 focus-within:border-black">
                        <Search/>
                        <input type="text" placeholder="Артикул / Название" className=""/>
                    </div>
                    <Select
                        variant="bordered"
                        radius="sm"
                        value={selectedSize}
                        defaultSelectedKeys={[selectedSize]}
                        className="min-w-[4.5rem]"
                    >
                        {labeledData.map((data) => (
                            <SelectItem key={data.value} value={data.value} onChange={() => handleSizeChange(data.value)}>
                                {data.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Button
                   color="danger"
                   variant="bordered"
                   className="text-black px-7 font-semibold hover:bg-danger hover:text-white"
                >
                   Обновить
                </Button>
            </div>
            <div>

            </div>
        </div>
    )
}