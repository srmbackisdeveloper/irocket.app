import { Divider, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type"

type ProductItemProps = {
    products: TProducts;
}

export const ProductItem: React.FC<ProductItemProps> = ({products}) => {
    return(
        <>
            <div className="flex flex-wrap justify-between items-center my-4" key={products.id}>
                <div className="grid gap-2">
                    <p className="text-danger text-sm font-semibold">{products.title}</p>
                    <p className="text-xs font-bold">Артикул: {products.code}</p>
                </div>
                <div className="flex flex-wrap justify-center items-center space-x-[6em]">
                    <p className="font-semibold text-left">{products.price} ₸</p>
                    <p className="border rounded-2xl p-2">{products.current_price_place}</p>
                    <p className="border rounded-2xl p-2">{products.target_price_place}</p>
                    <p className="border rounded-2xl p-2">{products.price_difference}</p>
                    <Switch color="success">{products.price_auto_change}</Switch>
                </div>
            </div>
            <div>
               <Divider/>
            </div>
        </>
    )
}