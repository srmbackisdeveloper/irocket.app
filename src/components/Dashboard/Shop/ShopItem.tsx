import { Switch, Tooltip } from "@nextui-org/react";
import { FC, useState } from "react";
import { CartIcon } from "../../shared/icons/Cart.icon";
import { BotConfig } from "./BotConfig";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import { Information } from "./Information";
import { TarifLimit } from "./TarifLimit";
import { TShop } from "../../../core/shop.type";

type ShopItemProps = {
    shop: TShop;
}

export const ShopItem: FC<ShopItemProps> = ({ shop }) => {
    const [marginEnabled, setMarginEnabled] = useState(false);

    const handleMarginToggle = () => {
       setMarginEnabled(!marginEnabled)
    }
    return (
        <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between pb-5 border-b-1 border-gray-200">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gray-200 dark:bg-zinc-700">
                     <CartIcon />
                  </div>
                  <div>
                     <a
                        href="#"
                        className="text-lg font-semibold text-danger hover:text-blue-700 duration-300"
                     >
                        {shop.name}
                     </a>
                     <p className="text-sm font-meduim">ID: {shop.merchant_id}</p>
                  </div>
               </div>
               <div className="flex items-center">
                  <EditModal />
                  <DeleteModal shopId={shop.id} />
               </div>
            </div>
            {!shop.enabled && <div className="p-2 pl-6 text-danger font-semibold text-xl">Ваш магазин не активирован</div>}
            <div className="md:p-2 md:pl-3 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               <div className="col-span-1 md:border-r-1">
                  <Information shop={shop}/>
               </div>
               <div className="col-span-1 md:border-r-1">
                  <BotConfig shop={shop}/>
               </div>
               <div className="col-span-1">
                  <TarifLimit />
               </div>
            </div>
            <Tooltip
               placement="bottom-start"
               className="bg-gray-600 text-white"
               showArrow={true}
               content="Эта функция находится в стадии разработки.">
            <div className="p-3 w-full md:w-2/3 opacity-50 cursor-not-allowed">
               <div className="flex items-center gap-3 pb-3">
                  <h4 className="text-base font-medium">
                     Настройки маржинальности
                  </h4>
                  <Switch
                     color="success"
                     size="sm"
                     checked={marginEnabled}
                     onChange={handleMarginToggle}
                     isDisabled
                     className="opacity-100"
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
            </Tooltip>
        </div>
    )
}