import React, { useState } from 'react';
import { Switch, Tooltip } from '@nextui-org/react';
import { ActiveIcon } from '../../shared/icons/Active.icon';
import { BanknotesIcon } from '../../shared/icons/Banknotes.icon';
import { DeliveryIcon } from '../../shared/icons/Delivery.icon';
import { TagIcon } from '../../shared/icons/Tag.icon';
import { TShop } from '../../../core/shop.type';
import { useShopStore } from '../../../store/shopStore';
import { useDisclosure } from "@nextui-org/react";
import AlertModal from "./../AlertModal";  

type InformationProps = {
  shop: TShop;
};

export const Information: React.FC<InformationProps> = ({ shop }) => {
  const { updateShopField } = useShopStore();
  const [isParsingEnabled, setIsParsingEnabled] = useState(shop.enable_parsing);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState<string>("");

  const showModal = (message: string) => {
    setModalMessage(message);
    onOpen();
    setTimeout(() => {
      onClose();
    }, 1000); 
  };

  const handleToggle = async () => {
    const newParsingEnabled = !isParsingEnabled;
    setIsParsingEnabled(newParsingEnabled);
    try {
      await updateShopField(shop.id, 'enable_parsing', newParsingEnabled);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update enable_parsing field:', error);
      setIsParsingEnabled(!newParsingEnabled);
      showModal("Ошибка!");
    }
  };

  return (
    <div className="p-1 pt-3 md:p-3 w-full">
      <h4 className="text-base font-medium">Информация</h4>
      <p className="text-xs text-danger font-medium">Наведите на иконку, чтобы увидеть подсказку</p>
      <div className="mt-4 w-full text-xs text-gray-500 font-semibold dark:text-slate-200">
        <div className="h-10 py-2 pl-1 flex items-center justify-between border-b border-gray-200">
          <Tooltip 
            placement="top-start"
            className="bg-gray-600 text-white max-w-xs"
            showArrow={true}
            content="Бот не будет обрабатывать позиции отключенного магазина. Если необходимо временно отключить бота для магазина, используйте эту настройку.">
              <div className="flex items-center gap-2">
                <ActiveIcon />
                <span>Активен</span>
              </div>
          </Tooltip>
          <Switch color="success" size="sm" isSelected={isParsingEnabled} onChange={handleToggle} />
        </div>
        <div>
          <div className="h-10 py-2 px-1 flex items-center justify-between border-b border-gray-200 opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-2">
              <Tooltip
                placement="top-start"
                className="bg-gray-600 text-white"
                showArrow={true}
                content="Эта функция находится в стадии разработки.">
                <div className="flex items-center gap-2">
                  <DeliveryIcon />
                  <span>Стоимость KASPI доставки</span>
                </div>
              </Tooltip>
            </div>
            <div className="text-right font-bold text-gray-600">0.00 ₸</div>
          </div>
          <div className="h-10 py-2 px-1 flex items-center justify-between border-b border-gray-200 opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-2">
            <Tooltip
                placement="top-start"
                className="bg-gray-600 text-white"
                showArrow={true}
                content="Эта функция находится в стадии разработки.">
                <div className="flex items-center gap-2">
                  <TagIcon />
                  <span>Минус процент от маржи</span>
                </div>
              </Tooltip>
            </div>
            <div className="text-right font-bold text-gray-600">0.00 %</div>
          </div>
          <div className="h-10 py-2 pl-1 flex items-center justify-between border-b border-gray-100 cursor-not-allowed">
            <Tooltip
                placement="top-start"
                className="bg-gray-600 text-white"
                showArrow={true}
                content="Эта функция находится в стадии разработки.">
              <div className="flex items-center gap-2 opacity-50">
                <TagIcon />
                <span>Маржа с учетом доставки</span>
              </div>
            </Tooltip>
            <Switch color="success" size="sm" isDisabled />
          </div>
          <div className="h-10 py-2 px-1 flex items-center justify-between opacity-50 cursor-not-allowed">
          <Tooltip
                placement="top-start"
                className="bg-gray-600 text-white"
                showArrow={true}
                content="Эта функция находится в стадии разработки.">
              <div className="flex items-center gap-2">
                <BanknotesIcon />
                <span>Скидка на комиссии</span>
              </div>
            </Tooltip>
            <div className="text-right font-bold text-gray-600">0.00 %</div>
          </div>
        </div>
      </div>
      <AlertModal message={modalMessage} isOpen={isOpen} onOpenChange={onClose} />
    </div>
  );
};
