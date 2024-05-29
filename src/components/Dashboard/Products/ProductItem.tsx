import { Divider, Input, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";
import { productsAPI } from "../../../services/products";
import { useState } from "react";
import AlertModal from "./../AlertModal";
import { ProductDetail } from "./ProductDetail"; // Import the ProductDetail component

type ProductItemProps = {
  products: TProducts;
  shopName: string;
};

export const ProductItem: React.FC<ProductItemProps> = ({ products, shopName }) => {
  const [targetPricePlace, setTargetPricePlace] = useState<number>(Math.max(products.target_price_place, 0));
  const [priceDifference, setPriceDifference] = useState<number>(Math.max(products.price_difference, 0));
  const [priceAutoChange, setPriceAutoChange] = useState(products.price_auto_change);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false); // State for ProductDetail modal

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    } , 1000);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleTargetPricePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setTargetPricePlace(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handlePriceDifferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setPriceDifference(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handleBlurTargetPricePlace = async () => {
    try {
      await productsAPI.updateProductField(products.id, 'target_price_place', targetPricePlace);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update target_price_place:', error);
      showModal("Ошибка!");
    }
  };

  const handleBlurPriceDifference = async () => {
    try {
      await productsAPI.updateProductField(products.id, 'price_difference', priceDifference);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_difference:', error);
      showModal("Ошибка!");
    }
  };

  const handleKeyDownTargetPricePlace = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(products.id, 'target_price_place', targetPricePlace);
        showModal("Сохранено!");
      } catch (error) {
        console.error('Failed to update target_price_place:', error);
        showModal("Ошибка!");
      }
    }
  };

  const handleKeyDownPriceDifference = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(products.id, 'price_difference', priceDifference);
        showModal("Сохранено!");
      } catch (error) {
        console.error('Failed to update price_difference:', error);
        showModal("Ошибка!");
      }
    }
  };

  const handlePriceAutoChangeToggle = async () => {
    const newValue = !priceAutoChange;
    setPriceAutoChange(newValue);
    try {
      await productsAPI.updateProductField(products.id, 'price_auto_change', newValue);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_auto_change:', error);
      setPriceAutoChange(products.price_auto_change);
      showModal("Ошибка!");
    }
  };

  const handleProductDetailOpen = () => {
    setIsProductDetailOpen(true);
  };

  const handleProductDetailClose = () => {
    setIsProductDetailOpen(false);
  };

  return (
    <>
      <tr key={products.id}>
        <td className="flex gap-3 p-2">
          <img src={products.product_image_link} className="object-contain w-12"/>
          <div className="grid gap-2 items-start">
            <a className="text-danger text-sm font-semibold cursor-pointer hover:text-blue-700 duration-300" href={products.product_card_link}>{products.title}</a>
            <p className="text-xs font-bold dark:text-slate-300">Артикул: {products.code}</p>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold dark:text-slate-300">Магазин: <span className="text-danger">{shopName}</span></p>
              <button className="text-blue-700 text-xs hover:text-danger" onClick={handleProductDetailOpen}>Настройки товара</button>
            </div>
          </div>
        </td>
        <td className="w-1/5 p-2 text-center font-semibold dark:text-slate-300 hidden md:table-cell">{products.price} ₸</td>
        <td className="w-1/5 p-2 text-center text-danger font-semibold hidden md:table-cell">{products.current_price_place}</td>
        <td className="w-1/5 p-2 text-center dark:text-slate-300 hidden md:table-cell">{products.first_place_price}</td>
        <td className="w-1/5 p-2 text-center dark:text-slate-300 hidden md:table-cell">{products.second_place_price}</td>
        <td className="w-1/5 p-2 text-center dark:text-slate-300 hidden md:table-cell">
          <Input
            type="number"
            className="w-16 ml-8"
            value={targetPricePlace?.toString()}
            onChange={handleTargetPricePlaceChange}
            onBlur={handleBlurTargetPricePlace}
            onKeyDown={handleKeyDownTargetPricePlace}
            min="1"
          />
        </td>
        <td className="w-1/5 p-2 text-center hidden md:table-cell">
          <Input
            type="number"
            className="w-full text-center"
            value={priceDifference?.toString()}
            onChange={handlePriceDifferenceChange}
            onBlur={handleBlurPriceDifference}
            onKeyDown={handleKeyDownPriceDifference}
            min="0"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₸</span>
              </div>
            }
          />
        </td>
        <td className="w-1/5 p-2 text-center hidden md:table-cell">
          <Switch color="success" isSelected={priceAutoChange} onChange={handlePriceAutoChangeToggle} />
        </td>
      </tr>
      <tr>
        <td colSpan={8}>
          <Divider />
        </td>
      </tr>
      <AlertModal message={modalMessage} isOpen={isOpen} onOpenChange={handleCloseModal} />
      <ProductDetail isOpen={isProductDetailOpen} onClose={handleProductDetailClose} products={products} shopName={""} />
    </>
  );
};
