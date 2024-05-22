import { ProductSearch } from "../../components/Dashboard/Products/ProductSearch"
import { ProductComponent } from "../../components/Dashboard/Products/ProductComponent"
import { useShopStore } from "../../store/shopStore"

export const Products = () => {
   const { shops } = useShopStore();
   return (
      <div className="grid p-5 gap-5">
         <ProductSearch shops={shops}/>
         <ProductComponent />
      </div>
   )
}
