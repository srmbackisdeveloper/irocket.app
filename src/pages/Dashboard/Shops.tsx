import { Switch } from '@nextui-org/react'
import { CartIcon } from '../../components/shared/icons/Cart.icon'
import { Information } from '../../components/Dashboard/Shop/Information'
import { BotConfig } from '../../components/Dashboard/Shop/BotConfig'
import { TarifLimit } from '../../components/Dashboard/Shop/TarifLimit'
import { useState } from 'react'
import { AddModal } from '../../components/Dashboard/Shop/AddModal'
import { EditModal } from '../../components/Dashboard/Shop/EditModal'
import { DeleteModal } from '../../components/Dashboard/Shop/DeleteModal'

export const Shops = () => {
   const [marginEnabled, setMarginEnabled] = useState(false)

   const handleMarginToggle = () => {
      setMarginEnabled(!marginEnabled)
   }

   return (
      <div className="p-5">
         <div className="flex justify-between items-center p-3 border rounded-lg mb-5">
            <h2 className="text-2xl font-semibold">Магазины</h2>
            <AddModal />
         </div>
         <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between pb-5 border-b-1 border-gray-200">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gray-200">
                     <CartIcon />
                  </div>
                  <div>
                     <a
                        href="#"
                        className="text-lg font-semibold text-danger hover:text-blue-700 duration-300"
                     >
                        Shop Name
                     </a>
                     <p className="text-sm font-meduim">ID: Shop ID</p>
                  </div>
               </div>
               <div className="flex items-center">
                  <EditModal />
                  <DeleteModal />
               </div>
            </div>
            {/* <Divider /> */}
            <div className="md:p-2 md:pl-3 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               <div className="col-span-1 md:border-r-1">
                  <Information />
               </div>
               <div className="col-span-1 md:border-r-1">
                  <BotConfig />
               </div>
               <div className="col-span-1">
                  <TarifLimit />
               </div>
            </div>
            <div className="p-3 w-full md:w-2/3">
               <div className="flex items-center gap-3 pb-3">
                  <h4 className="text-base font-medium">
                     Настройки маржинальности
                  </h4>
                  <Switch
                     color="success"
                     size="sm"
                     checked={marginEnabled}
                     onChange={handleMarginToggle}
                  />
               </div>
               <p className="text-xs font-medium">
                  Укажите настройки маржинальности и Вам будет достаточно
                  указать лишь оптовую цену у товаров. Минимальная цена будет
                  изменяться автоматически с учетом комиссий KASPI, акций KASPI,
                  минимальной маржи, стоимости доставки и т.д
               </p>
               {!marginEnabled && (
                  <p className="pt-1 text-xs font-medium text-danger">
                     На данный момент у магазина отключена настройка
                     маржинальности
                  </p>
               )}
            </div>
         </div>
      </div>
   )
}
