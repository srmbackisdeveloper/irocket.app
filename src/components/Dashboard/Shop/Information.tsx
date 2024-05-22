import { Switch } from '@nextui-org/react'
import { ActiveIcon } from '../../shared/icons/Active.icon'
import { BanknotesIcon } from '../../shared/icons/Banknotes.icon'
import { DeliveryIcon } from '../../shared/icons/Delivery.icon'
import { TagIcon } from '../../shared/icons/Tag.icon'
import { TShop } from '../../../core/shop.type'
import { FC, useState } from 'react'

type InformationProps = {
   shop: TShop;
}

export const Information: FC<InformationProps> = ({ shop }) => {
   const [isParsingEnabled, setIsParsingEnabled] = useState(shop.enable_parsing);
   console.log(isParsingEnabled);

   const handleToggle = () => {
      setIsParsingEnabled(!isParsingEnabled);
      // Here you can add code to update the state on the server if necessary
   };

   return (
      <div className="p-1 pt-3 md:p-3 w-full">
         <h4 className="text-base font-medium">Информация</h4>
         <p className="text-xs text-danger font-medium">
            Наведите на иконку, чтобы увидеть подсказку
         </p>
         <div className="mt-4 w-full text-xs text-gray-500 font-semibold">
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <ActiveIcon />
                  <span>Активен</span>
               </div>
               <Switch
                  color="success"
                  size="sm"
                  isSelected={isParsingEnabled}
                  onChange={handleToggle}
               />
            </div>
            <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-200 opacity-50 cursor-not-allowed">
               <div className="flex items-center gap-2">
                  <DeliveryIcon />
                  <span>Стоимость KASPI доставки</span>
               </div>
               <div className="text-right font-bold text-gray-600">0.00 ₸</div>
            </div>
            <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-200 opacity-50 cursor-not-allowed">
               <div className="flex items-center gap-2">
                  <TagIcon />
                  <span>Минус процент от маржи</span>
               </div>
               <div className="text-right font-bold text-gray-600">0.00 %</div>
            </div>
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200 cursor-not-allowed">
               <div className="flex items-center gap-2 opacity-50">
                  <TagIcon />
                  <span>Маржа с учетом доставки</span>
               </div>
               <Switch
                  color="success" 
                  size="sm" 
                  isDisabled
               />
            </div>
            <div className="h-10 py-2 px-1 flex items-center justify-between opacity-50 cursor-not-allowed">
               <div className="flex items-center gap-2">
                  <BanknotesIcon />
                  <span>Скидка на комиссии</span>
               </div>
               <div className="text-right font-bold text-gray-600">0.00 %</div>
            </div>
         </div>
      </div>
   )
}
