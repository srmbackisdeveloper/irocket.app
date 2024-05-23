import { Divider, Input, Switch } from "@nextui-org/react";
import { TProducts } from "../../../core/products.type";

type ProductItemProps = {
  products: TProducts;
  shopName: string;
};

export const ProductItem: React.FC<ProductItemProps> = ({ products, shopName }) => {
  return (
    <>
      <tr key={products.id}>
        <td className="w-1/5 p-2">
          <div className="grid gap-2">
            <p className="text-danger text-sm font-semibold">{products.title}</p>
            <p className="text-xs font-bold">Артикул: {products.code}</p>
            <p className="text-xs font-bold">Магазин: <span className="text-danger">{shopName}</span></p>
          </div>
        </td>
        <td className="w-1/5 p-2 text-center font-semibold">{products.price} ₸</td>
        <td className="w-1/5 p-2 text-center">{products.current_price_place}</td>
        <td className="w-1/5 p-2 text-center">
          <Input
            type="number"
            className="w-16 ml-8"
            placeholder={products?.target_price_place.toString()}
          />
        </td>
        <td className="w-1/5 p-2 text-center">
          <Input
            type="number"
            className="w-full text-center"
            placeholder={products?.price_difference.toString()}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₸</span>
              </div>
            }
          />
        </td>
        <td className="w-1/5 p-2 text-center">
          <Switch color="success">{products.price_auto_change}</Switch>
        </td>
      </tr>
      <tr>
        <td colSpan={6}>
          <Divider />
        </td>
      </tr>
    </>
  );
};
