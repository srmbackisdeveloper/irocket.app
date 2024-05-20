import { TProducts } from "../../../core/products.type"

type ProductItemProps = {
    products: TProducts;
}

export const ProductItem: React.FC<ProductItemProps> = ({products}) => {
    return(
        <div className="flex flex-wrap" key={products.id}>
            <p>{products.title}</p>
            <p>{products.price}</p>
        </div>
    )
}