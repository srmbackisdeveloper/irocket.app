import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";

type ProductDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  products: TProducts;
  shopName: string;
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, products, shopName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>Настройки товара</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <p className="font-semibold">Название: {products.title}</p>
            <p className="font-semibold">Артикул: {products.code}</p>
            <p className="font-semibold">Магазин: {shopName}</p>
            <p className="font-semibold">Цена: {products.price} ₸</p>
            <p className="font-semibold">Тек. место: {products.current_price_place}</p>
            <p className="font-semibold">1-ое место: {products.first_place_price}</p>
            <p className="font-semibold">2-ое место: {products.second_place_price}</p>
            <p className="font-semibold">Раз. в цене: {products.price_difference} ₸</p>
            <p className="font-semibold">Автоизменение цены: {products.price_auto_change ? "Да" : "Нет"}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
