import { Switch } from '@nextui-org/react'
import { TrendUpIcon } from '../../shared/icons/TrendUp.icon'
import { TrendDownIcon } from '../../shared/icons/TrendDown.icon'
import { RocketIcon } from '../../shared/icons/Rocket.icon'
import { ArrowDownRightIcon } from '../../shared/icons/ArrowDownRight.icon'
import { TruckIcon } from '../../shared/icons/Truck.icon'

export const BotConfig = () => {
   return (
      <div className="p-1 md:p-3 w-full">
         <h4 className="text-base font-medium">Настройки бота</h4>
         <p className="text-xs text-danger font-medium">
            Наведите на иконку, чтобы увидеть подсказку
         </p>
         <div className="mt-4 w-full text-xs text-gray-500 font-semibold">
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <TrendUpIcon />
                  <span>Автоповышение</span>
               </div>
               <Switch color="success" size="sm" />
            </div>
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <TrendDownIcon />
                  <span>Автопонижение</span>
               </div>
               <Switch color="success" size="sm" />
            </div>
            <div className="h-10 py-2 pl-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <RocketIcon />
                  <span>Добивать до мин.цены</span>
               </div>
               <Switch color="success" size="sm" isDisabled/>
            </div>
            <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-200">
               <div className="flex items-center gap-2">
                  <ArrowDownRightIcon />
                  <span>Шаг опускания</span>
               </div>
               <div className="text-right font-bold text-gray-600">0.00 ₸</div>
            </div>
            <div className="h-10 py-2 pl-1 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <TruckIcon />
                  <span>Не демпинговать межгород</span>
               </div>
               <Switch color="success" size="sm" />
            </div>
         </div>
      </div>
   )
}
