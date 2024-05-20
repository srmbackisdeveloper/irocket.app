import { ProductSearch } from "../../components/Dashboard/Products/ProductSearch"
import { ProductComponent } from "../../components/Dashboard/Products/ProductComponent"

export const Products = () => {
   return (
      <div className="grid p-5 gap-5">
         <ProductSearch />
         <ProductComponent />
      </div>
   )
}
