import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";
import { productsAPI } from "../../../services/products";
import AlertModal from "./../AlertModal";

type ProductDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  products: TProducts;
  shopName: string;
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, products, shopName }) => {
  const [targetPricePlace, setTargetPricePlace] = useState<number>(Math.max(products.target_price_place, 0));
  const [priceDifference, setPriceDifference] = useState<number>(Math.max(products.price_difference, 0));
  const [priceAutoChange, setPriceAutoChange] = useState(products.price_auto_change);

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
          <div className="grid gap-4">
            <p className="font-semibold">Название: {products.title}</p>
            <p className="font-semibold">Артикул: {products.code}</p>
            <p className="font-semibold">Магазин: {shopName}</p>
            <p className="font-semibold">Цена: {products.price} ₸</p>
            <label className="font-semibold flex gap-2">Тек. место: <p className="text-danger">{products.current_price_place}</p></label>
            <p className="font-semibold">1-ое место: {products.first_place_price}</p>
            <p className="font-semibold">2-ое место: {products.second_place_price}</p>
            <div>
              <label className="font-semibold">Цен. ориентир:</label>
              <Input
                type="number"
                className="w-full"
                value={targetPricePlace?.toString()}
                onChange={handleTargetPricePlaceChange}
                onBlur={handleBlurTargetPricePlace}
                onKeyDown={handleKeyDownTargetPricePlace}
                min="1"
              />
            </div>
            <div>
              <label className="font-semibold">Раз. в цене:</label>
              <Input
                type="number"
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
              <label className="font-semibold mr-2">Автоизменение цены:</label>
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
