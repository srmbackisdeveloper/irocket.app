import React, { useState } from 'react';
import { Input, Switch } from '@nextui-org/react';
import { RocketIcon } from '../../shared/icons/Rocket.icon';
import { ArrowDownRightIcon } from '../../shared/icons/ArrowDownRight.icon';
import { TruckIcon } from '../../shared/icons/Truck.icon';
import { TShop } from '../../../core/shop.type';
import { AdjustIcon } from '../../shared/icons/Adjust.icon';
import { useShopStore } from '../../../store/shopStore';
import { useDisclosure } from "@nextui-org/react";
import AlertModal from "./../AlertModal";

type BotConfigProps = {
  shop: TShop;
};

export const BotConfig: React.FC<BotConfigProps> = ({ shop }) => {
  const { updateShopField } = useShopStore();
  const [isAutoChangeEnabled, setIsAutoChangeEnabled] = useState(shop.price_auto_change);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<number>(shop.price_difference ?? 0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState<string>("");

  const showModal = (message: string) => {
    setModalMessage(message);
    onOpen();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleToggleAutoChange = async () => {
    const newAutoChangeEnabled = !isAutoChangeEnabled;
    setIsAutoChangeEnabled(newAutoChangeEnabled);
    try {
      await updateShopField(shop.id, 'price_auto_change', newAutoChangeEnabled);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_auto_change field:', error);
      setIsAutoChangeEnabled(!newAutoChangeEnabled);
      showModal("Восстановлено!");
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    if (value === null) {
      setValue(0);
    }
    setIsEditing(false);
    try {
      await updateShopField(shop.id, 'price_difference', value);
      showModal("Сохранено!");
    } catch (error) {
      console.error('Failed to update price_difference field:', error);
      showModal("Ошибка!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    setValue(Number.isNaN(inputValue) ? 0 : inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (value === null) {
        setValue(0);
      }
      setIsEditing(false);
      try {
        updateShopField(shop.id, 'price_difference', value);
        showModal("Сохранено!");
      } catch (error) {
        console.error('Failed to update price_difference field:', error);
        showModal("Ошибка!");
      }
    }
  };

  return (
    <div className="p-1 md:p-3 w-full">
      <h4 className="text-base font-medium">Настройки бота</h4>
      <p className="text-xs text-danger font-medium">Наведите на иконку, чтобы увидеть подсказку</p>
      <div className="mt-4 w-full text-xs text-gray-500 font-semibold">
        <div className="h-10 py-2 pl-1 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AdjustIcon />
            <span>Автоизменение цены</span>
          </div>
          <Switch
            color="success"
            size="sm"
            isSelected={isAutoChangeEnabled}
            onChange={handleToggleAutoChange}
          />
        </div>
        <div className="h-10 py-2 pl-1 flex items-center justify-between border-b border-gray-200 cursor-not-allowed">
          <div className="flex items-center gap-2 opacity-50">
            <RocketIcon />
            <span>Добивать до мин.цены</span>
          </div>
          <Switch color="success" size="sm" isDisabled />
        </div>
        <div className="h-10 py-2 px-1 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ArrowDownRightIcon />
            <span>Шаг опускания</span>
          </div>
          <div className="text-right font-bold text-gray-600">
            {isEditing ? (
              <Input
                autoFocus
                type="number"
                value={value.toString()}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                size="sm"
                className="w-24 outline-none"
              />
            ) : (
              <span onClick={handleClick}>{value} ₸</span>
            )}
          </div>
        </div>
        <div className="h-10 py-2 pl-1 flex items-center justify-between cursor-not-allowed">
          <div className="flex items-center gap-2 opacity-50">
            <TruckIcon />
            <span>Не демпинговать межгород</span>
          </div>
          <Switch color="success" size="sm" isDisabled />
        </div>
      </div>
      <AlertModal message={modalMessage} isOpen={isOpen} onOpenChange={onClose} />
    </div>
  );
};
