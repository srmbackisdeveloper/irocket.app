import { Button, Divider, Switch } from '@nextui-org/react'
import { CartIcon } from '../../components/shared/icons/Cart.icon'
import { EditIcon } from '../../components/shared/icons/Edit.icon'
import { CrossIcon } from '../../components/shared/icons/Cross.icon'
import { ActiveIcon } from '../../components/shared/icons/Active.icon'
import { DeliveryIcon } from '../../components/shared/icons/Delivery.icon'

export const Shops = () => {
   return (
      <div className="p-5">
         <div className="flex justify-between items-center p-3 border rounded-lg mb-5">
            <h2 className="text-2xl font-semibold">Магазины</h2>
            <Button
               color="danger"
               variant="bordered"
               className="text-black px-7 font-semibold hover:bg-danger hover:text-white"
            >
               Добавить
            </Button>
         </div>
         <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between pb-5">
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
               <div className="flex gap-3">
                  <EditIcon />
                  <CrossIcon />
               </div>
            </div>
            <Divider />
            <div className="p-2 grid grid-cols-3">
               <div className="p-3 w-full">
                  <h4 className="text-base font-medium">Информация</h4>
                  <p className="text-xs text-danger font-medium">
                     Наведите на иконку, чтобы увидеть подсказку
                  </p>
                  <table className="mt-4 w-full text-xs text-gray-400 font-semibold">
                        <tbody>
                         <tr className="border-b-1 border-gray-300">
                            <td className="flex gap-2">
                               <ActiveIcon />
                               <span>Активен</span>
                            </td>
                            <td className="w-fit">
                               <Switch color="success" size="sm"/>
                            </td>
                         </tr>
                         <tr className="border-b-1 border-gray-300">
                            <td className="flex gap-2">
                               <DeliveryIcon />
                               <span>Стоимость KASPI доставки</span>
                            </td>
                            <td className="text-right">0.00 ₸</td>
                         </tr>
                         <tr className="border-b-1 border-gray-300">
                            <td></td>
                            <td></td>
                            <td></td>
                         </tr>
                         <tr className="border-b-1 border-gray-300">
                            <td></td>
                            <td></td>
                            <td></td>
                         </tr>
                         <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                         </tr>
                        </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}
