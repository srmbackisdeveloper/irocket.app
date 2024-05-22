import { AddModal } from '../../components/Dashboard/Shop/AddModal'
import { ShopList } from '../../components/Dashboard/Shop/ShopList';
import { useGetShops } from '../../hooks/useGetShop'

export const Shops = () => {
   const query = useGetShops();

   return (
      <div className="p-5">
         <div className="flex justify-between items-center p-3 border rounded-lg mb-5">
            <h2 className="text-2xl font-semibold">Магазины</h2>
            <AddModal />
         </div>
         <ShopList query={query} />
      </div>
   )
}
