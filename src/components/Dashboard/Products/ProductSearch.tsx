import {
    Button,
    Divider,
    VisuallyHidden,
} from '@nextui-org/react';
import { Search } from '../../shared/icons/Search.icon';
import { FC, useState, useEffect } from 'react';
import { TShop } from '../../../core/shop.type';
import { useNavigate, useLocation } from 'react-router-dom';

type ProductSearchProps = {
    shops: TShop[];
    onProductsRefresh: () => void;
}

export const ProductSearch: FC<ProductSearchProps> = ({ shops, onProductsRefresh }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page') || '1', 10);

    const [page, setPage] = useState(initialPage);
    const [checkedShops, setCheckedShops] = useState<Set<number>>(new Set());

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newPage = parseInt(params.get('page') || '1', 10);
        setPage(newPage);
    }, [location.search]);

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

    const handleRefresh = () => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        navigate({ search: params.toString() });
        onProductsRefresh(); // Call the parent function to refresh the products
    };

    return (
        <div className="border rounded-lg">
            <div className="p-3">
                <div className="flex items-center justify-between pb-5">
                    <div className="flex items-center gap-3">
                        <div className="flex border-gray-200 border-2 rounded-lg p-[6px] gap-2 max-w-[16em] max-h-fit items-center focus:border-black duration-200 focus-within:border-black">
                            <Search />
                            <input type="text" placeholder="Артикул / Название" className="border-none  " />
                        </div>
                    </div>
                    <Button
                        color="danger"
                        variant="ghost"
                        className="text-black px-7 my-3 font-semibold float-right"
                        onClick={handleRefresh}
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
