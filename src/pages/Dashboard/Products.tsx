import { ProductSearch } from "../../components/Dashboard/Products/ProductSearch"
import { ProductsList } from "../../components/Dashboard/Products/ProductsList"

export const Products = () => {
   return (
      <div className="grid p-5 gap-5">
         <ProductSearch />
         <ProductsList />
      </div>
   )
}
