import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";
import { productsAPI } from "../../../services/products";
import AlertModal from "./../AlertModal";

type ProductDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  product: TProducts;
  shopName: string;
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, product: product, shopName }) => {
  const [targetPricePlace, setTargetPricePlace] = useState<number>(Math.max(product.target_price_place, 0));
  const [priceDifference, setPriceDifference] = useState<number>(Math.max(product.price_difference, 0));
  const [priceAutoChange, setPriceAutoChange] = useState(product.price_auto_change);
  const [minPrice, setMinPrice] = useState<number>(Math.max(product.min_price, 0));
  const [maxPrice, setMaxPrice] = useState<number>(Math.max(product.max_price, 0));

  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsOpenAlert(true);
    setTimeout(() => {
      setIsOpenAlert(false);
    } , 1000);
  };

  const handleCloseAlertModal = () => {
    setIsOpenAlert(false);
  };

  const handleTargetPricePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setTargetPricePlace(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handlePriceDifferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setPriceDifference(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setMinPrice(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value));
    setMaxPrice(Number.isNaN(newValue) ? 0 : newValue);
  };

  const handleBlurTargetPricePlace = async () => {
    try {
      await productsAPI.updateProductField(product.id, 'target_price_place', targetPricePlace);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update target_price_place:', error);
      showModal("Ошибка!");
    }
  };

  const handleBlurPriceDifference = async () => {
    try {
      await productsAPI.updateProductField(product.id, 'price_difference', priceDifference);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_difference:', error);
      showModal("Ошибка!");
    }
  };

  const handleBlurMinPrice = async () => {
    try {
      await productsAPI.updateProductField(product.id, 'min_price', minPrice);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update min_price:', error);
      showModal("Ошибка!");
    }
  };

  const handleBlurMaxPrice = async () => {
    try {
      await productsAPI.updateProductField(product.id, 'max_price', maxPrice);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update max_price:', error);
      showModal("Ошибка!");
    }
  };

  const handleKeyDownMinPrice = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(product.id, 'min_price', minPrice);
        showModal("Сохранено!");
      } catch (error) {
        console.error('Failed to update min_price:', error);
        showModal("Ошибка!");
      }
    }
  };

  const handleKeyDownMaxPrice = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(product.id, 'max_price', maxPrice);
        showModal("Сохранено!");
      } catch (error) {
        console.error('Failed to update max_price:', error);
        showModal("Ошибка!");
      }
    }
  };

  const handleKeyDownTargetPricePlace = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await productsAPI.updateProductField(product.id, 'target_price_place', targetPricePlace);
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
        await productsAPI.updateProductField(product.id, 'price_difference', priceDifference);
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
      await productsAPI.updateProductField(product.id, 'price_auto_change', newValue);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_auto_change:', error);
      setPriceAutoChange(product.price_auto_change);
      showModal("Ошибка!");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader>
          <h3>Настройки товара</h3>
        </ModalHeader>
        <ModalBody>
          <div className="grid gap-5">
            <p>Название: <span className="font-semibold">{product.title}</span></p>
            <div className="flex justify-between">
              <p>Артикул: <span className="font-semibold">{product.code}</span></p>
              <p>Магазин: <span className="font-semibold text-danger">{shopName}</span></p>
            </div>
            <div className="flex justify-between">
              <p>Цена: <span className="font-semibold">{product.price} ₸</span></p>
              <label className="flex gap-2">Тек. место: <p className="text-danger font-semibold">{product.current_price_place}</p></label>
            </div>
            <div className="flex justify-between">
              <p>1-ое место: <span className="font-semibold">{product.first_place_price} ₸</span></p>
              <p>2-ое место: <span className="font-semibold">{product.second_place_price} ₸</span></p>
            </div>
            <div className="flex gap-3">
              <Input
                type="number"
                label="Мин. цена:"
                labelPlacement="outside"
                className="w-full"
                value={minPrice?.toString()}
                onChange={handleMinPriceChange}
                onBlur={handleBlurMinPrice}
                onKeyDown={handleKeyDownMinPrice}
                min="0"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₸</span>
                  </div>
                }
              />
              <Input
                type="number"
                label="Макс. цена:"
                labelPlacement="outside"
                className="w-full"
                value={maxPrice?.toString()}
                onChange={handleMaxPriceChange}
                onBlur={handleBlurMaxPrice}
                onKeyDown={handleKeyDownMaxPrice}
                min="0"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₸</span>
                  </div>
                }
              />
            </div>
            <div className="flex gap-3">
              <Input
                type="number"
                label="Ценовой ориентир:"
                labelPlacement="outside"
                className="w-full"
                value={targetPricePlace?.toString()}
                onChange={handleTargetPricePlaceChange}
                onBlur={handleBlurTargetPricePlace}
                onKeyDown={handleKeyDownTargetPricePlace}
                min="1"
              />
              <Input
                type="number"
                label="Шаг:"
                labelPlacement="outside"
                className="w-full"
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
            </div>
            <div className="flex items-center justify-between">
              <label className="mr-2">Автоизменение цены:</label>
              <Switch color="success" isSelected={priceAutoChange} onChange={handlePriceAutoChangeToggle} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
      <AlertModal message={modalMessage} isOpen={isOpenAlert} onOpenChange={handleCloseAlertModal} />
    </Modal>
  );
};
