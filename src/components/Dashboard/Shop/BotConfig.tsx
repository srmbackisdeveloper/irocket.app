import { Switch } from "@nextui-org/react"
import { ActiveIcon } from "../../shared/icons/Active.icon"
import { BanknotesIcon } from "../../shared/icons/Banknotes.icon"
import { DeliveryIcon } from "../../shared/icons/Delivery.icon"
import { TagIcon } from "../../shared/icons/Tag.icon"

export const BotConfig = () => {
    return (
        <div className="p-3 w-full">
                  <h4 className="text-base font-medium">Информация</h4>
                  <p className="text-xs text-danger font-medium">
                     Наведите на иконку, чтобы увидеть подсказку
                  </p>
                  <div className="mt-4 pr-4 w-full text-xs text-gray-400 font-semibold border-r-1 border-gray-300 h-[85%]">
                     <div className="py-2 pl-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <ActiveIcon />
                           <span>Активен</span>
                        </div>
                           <Switch
                              color="success"
                              size="sm"
                           />
                     </div>
                     <div className="py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <DeliveryIcon />
                           <span>Стоимость KASPI доставки</span>
                        </div>
                        <div className="text-right font-bold text-gray-500">0.00 ₸</div>
                     </div>
                     <div className="py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <TagIcon />
                           <span>Минус процент от маржи</span>
                        </div>
                        <div className="text-right font-bold text-gray-500">0.00 %</div>
                     </div>
                     <div className="py-2 pl-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <TagIcon />
                           <span>Маржа с учетом доставки</span>
                        </div>
                        <Switch
                           color="success"
                           size="sm"
                        />
                     </div>
                     <div className="py-2 px-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <BanknotesIcon />
                           <span>Маржа с учетом доставки</span>
                        </div>
                        <div className="text-right font-bold text-gray-500">0.00 %</div>
                     </div>
                  </div>
               </div>
    )
}