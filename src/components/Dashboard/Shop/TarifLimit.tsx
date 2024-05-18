import { BanknotesIcon } from "../../shared/icons/Banknotes.icon"
import { TagIcon } from "../../shared/icons/Tag.icon"
import { HomeIcon } from "../../shared/icons/Home.icon"
import { CardIcon } from "../../shared/icons/Card.icon"
import { CalendarIcon } from "../../shared/icons/Calendar.icon"

export const TarifLimit = () => {
    return (
        <div className="p-3 w-full">
                  <h4 className="text-base font-medium">Тарифы / Лимиты</h4>
                  <p className="text-xs text-danger font-medium">
                     Оплата списывается автоматически с баланса
                  </p>
                  <div className="mt-4 w-full text-xs text-gray-500 font-semibold">
                     <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <HomeIcon />
                           <span>Компания</span>
                        </div>
                        <div className="text-right font-bold text-gray-600">Company Name</div>
                     </div>
                     <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <BanknotesIcon />
                           <span>Баланс</span>
                        </div>
                        <div className="text-right font-bold text-gray-600">0.00 ₸</div>
                     </div>
                     <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <CardIcon />
                           <span>Месячная стоимость</span>
                        </div>
                        <div className="text-right font-bold text-gray-600">0.00 ₸</div>
                     </div>
                     <div className="h-10 py-2 px-1 flex items-center justify-between border-b-1 border-gray-300">
                        <div className="flex items-center gap-2">
                           <TagIcon />
                           <span>Сумма списания</span>
                        </div>
                        <div className="text-right font-bold text-gray-600">0.00 ₸/ день</div>
                     </div>
                     <div className="h-10 py-2 px-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <CalendarIcon />
                           <span>Дата создания</span>
                        </div>
                        <div className="text-right font-bold text-gray-600">2024-05-01 19:15:17</div>
                     </div>
                  </div>
               </div>
    )
}