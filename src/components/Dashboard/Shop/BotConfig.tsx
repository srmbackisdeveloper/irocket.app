import { Input, Switch } from '@nextui-org/react'
import { RocketIcon } from '../../shared/icons/Rocket.icon'
import { ArrowDownRightIcon } from '../../shared/icons/ArrowDownRight.icon'
import { TruckIcon } from '../../shared/icons/Truck.icon'
import { TShop } from '../../../core/shop.type'
import { FC, useState } from 'react'
import { AdjustIcon } from '../../shared/icons/Adjust.icon'

type BotConfigProps = {
   shop: TShop;
}

export const BotConfig: FC<BotConfigProps> = ({ shop }) => {
   const [isAutoChangeEnabled, setIsAutoChangeEnabled] = useState(shop.price_auto_change);
   const [isEditing, setIsEditing] = useState(false);
   const [value, setValue] = useState(0);

   const handleClick = () => {
     setIsEditing(true);
   };

   const handleBlur = () => {
     if (value === null) {
       setValue(0);
     }
     setIsEditing(false);
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
     }
   };

   return (
      <div className="p-1 md:p-3 w-full">
         <h4 className="text-base font-medium">Настройки бота</h4>
         <p className="text-xs text-danger font-medium">
            Наведите на иконку, чтобы увидеть подсказку
         </p>
         <div className="mt-4 w-full text-xs text-gray-500 font-semibold">
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <AdjustIcon />
                  <span>Автоизменение цены</span>
               </div>
               <Switch 
                  color="success" 
                  size="sm" 
                  isSelected={isAutoChangeEnabled}
                  onChange={() => {setIsAutoChangeEnabled(!isAutoChangeEnabled)}}
               />
            </div>
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200 cursor-not-allowed">
               <div className="flex items-center gap-2 opacity-50">
                  <RocketIcon />
                  <span>Добивать до мин.цены</span>
               </div>
               <Switch color="success" size="sm" isDisabled/>
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
               <Switch color="success" size="sm" isDisabled/>
            </div>
         </div>
      </div>
   )
}
