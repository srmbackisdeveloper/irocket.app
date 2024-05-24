import { Divider, Input, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";
import { productsAPI } from "../../../services/products";
import { useState } from "react";

type ProductItemProps = {
  products: TProducts;
  shopName: string;
};

export const ProductItem: React.FC<ProductItemProps> = ({ products, shopName }) => {
  const [targetPricePlace, setTargetPricePlace] = useState<number>(products.target_price_place);
  const [priceDifference, setPriceDifference] = useState<number>(products.price_difference);
  const [priceAutoChange, setPriceAutoChange] = useState(products.price_auto_change);

  const handleTargetPricePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTargetPricePlace(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handlePriceDifferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setPriceDifference(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handleBlurTargetPricePlace = async () => {
    try {
      await productsAPI.updateProductField(products.id, 'target_price_place', targetPricePlace);
      alert("Сохранено!");
    } catch (error) {
      console.error('Failed to update target_price_place:', error);
      alert("Ошибка!");
    }
  };

  const handleBlurPriceDifference = async () => {
    try {
      await productsAPI.updateProductField(products.id, 'price_difference', priceDifference);
      alert("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_difference:', error);
      alert("Ошибка!");
    }
  };

  const handleKeyDownTargetPricePlace = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(products.id, 'target_price_place', targetPricePlace);
        alert("Сохранено!");
      } catch (error) {
        console.error('Failed to update target_price_place:', error);
        alert("Ошибка!");
      }
    }
  };

  const handleKeyDownPriceDifference = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(products.id, 'price_difference', priceDifference);
        alert("Сохранено!");
      } catch (error) {
        console.error('Failed to update price_difference:', error);
        alert("Ошибка!");
      }
    }
  };

  const handlePriceAutoChangeToggle = async () => {
    const newValue = !priceAutoChange;
    setPriceAutoChange(newValue);
    try {
      await productsAPI.updateProductField(products.id, 'price_auto_change', newValue);
      alert("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_auto_change:', error);
      setPriceAutoChange(products.price_auto_change); // Revert to old value on error
      alert("Ошибка!");
    }
  };

  return (
    <>
      <tr key={products.id}>
        <td className="w-1/5 p-2">
          <div className="grid gap-2">
            <p className="text-danger text-sm font-semibold">{products.title}</p>
            <p className="text-xs font-bold">Артикул: {products.code}</p>
            <p className="text-xs font-bold">Магазин: <span className="text-danger">{shopName}</span></p>
          </div>
        </td>
        <td className="w-1/5 p-2 text-center font-semibold">{products.price} ₸</td>
        <td className="w-1/5 p-2 text-center">{products.current_price_place}</td>
        <td className="w-1/5 p-2 text-center">
          <Input
            type="number"
            className="w-16 ml-8"
            value={targetPricePlace.toString()}
            onChange={handleTargetPricePlaceChange}
            onBlur={handleBlurTargetPricePlace}
            onKeyDown={handleKeyDownTargetPricePlace}
          />
        </td>
        <td className="w-1/5 p-2 text-center">
          <Input
            type="number"
            className="w-full text-center"
            value={priceDifference.toString()}
            onChange={handlePriceDifferenceChange}
            onBlur={handleBlurPriceDifference}
            onKeyDown={handleKeyDownPriceDifference}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₸</span>
              </div>
            }
          />
        </td>
        <td className="w-1/5 p-2 text-center">
          <Switch color="success" isSelected={priceAutoChange} onChange={handlePriceAutoChangeToggle} />
        </td>
      </tr>
      <tr>
        <td colSpan={6}>
          <Divider />
        </td>
      </tr>
    </>
  );
};
