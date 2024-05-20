import { UseQueryResult } from "@tanstack/react-query"
import { TProducts } from "../../../core/products.type"
import { ProductItem } from "./ProductItem";

type ProductListProps = {
    query: UseQueryResult<TProducts[], Error>;
}

export const ProductList: React.FC<ProductListProps> = ({ query }) => {
    const { data, status, error } = query;
    return (
        <>
            {status === "pending" && <div>Loading...</div>}
            {status === "error" && <div>Error: {error.message}</div>}
            {status === "success" && (
                <div className='mt-4'>
                    {data?.map((products) => (
                        <ProductItem key={products.id} products={products} />
                    ))}
                </div>
            )}
        </>
    )
}

// http://164.90.181.189/kaspi_products/
// http://164.90.181.189/kaspi_products/:id/