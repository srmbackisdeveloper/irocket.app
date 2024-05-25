import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Tooltip, Pagination } from "@nextui-org/react";
import { ProductSearch } from "./ProductSearch";
import { Overlay } from "../../shared/Overlay";
import { useShopStore } from "../../../store/shopStore";

export const ProductComponent = () => {
  const { shops } = useShopStore();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);

  const [page, setPage] = useState(initialPage);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // Overlay state
  const limit = 10; // Constant limit
  const query = useGetProducts(page, limit);

  const totalPages = Math.ceil((query.data?.count ?? 0) / limit);

  const isFirstRender = useRef(true);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Set page state from URL on component mount
  useEffect(() => {
    if (isFirstRender.current) {
      setPage(initialPage);
      isFirstRender.current = false;
    }
  }, [initialPage]);

  // Update URL when page state changes
  useEffect(() => {
    if (!isFirstRender.current) {
      const params = new URLSearchParams(location.search);
      params.set('page', page.toString());
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [page, navigate, location.search]);

  const refreshProducts = async () => {
    setIsOverlayVisible(true); // Show overlay
    await query.refetch();
    setTimeout(() => {
      setIsOverlayVisible(false); // Hide overlay after refreshing
    }, 2000); // Adjust the duration as needed
  };

  return (
    <>
      <Overlay isVisible={isOverlayVisible} /> {/* Use Overlay component */}
      <ProductSearch shops={shops} onProductsRefresh={refreshProducts} />
      <div className={`border rounded-lg p-3 overflow-x-auto ${isOverlayVisible ? 'pointer-events-none' : ''}`}>
        <table className="w-full min-w-max table-fixed">
          <thead className="border-b">
            <tr className="text-base">
              <th className="font-semibold w-[35%] p-2 text-left">Название</th>
              <th className="font-semibold w-[10%] p-2">Цена</th>
              <th className="font-semibold w-[10%] p-2">Тек. место</th>
              <th className="font-semibold w-[10%] p-2">1-ое место</th>
              <th className="font-semibold w-[10%] p-2">2-ое место</th>
              <th className="font-semibold w-[10%] p-2">Цен. ориентир</th>
              <th className="font-semibold w-[10%] p-2">Раз. в цене</th>
              <Tooltip
                placement="top-end"
                offset={-10}
                className="bg-gray-600 text-white max-w-xs"
                showArrow={true}
                content="Если отключено, то бот не будет изменять цену данного товара"
              >
                <th className="font-semibold w-[10%] p-2">Актив.</th>
              </Tooltip>
            </tr>
          </thead>
          <tbody>
            <ProductList query={query} />
          </tbody>
        </table>
        <Pagination
          className="grid justify-center items-center mt-[2em] px-[4em]"
          showControls
          color="danger"
          size="lg"
          total={totalPages}
          page={page} // Set the current page for the pagination component
          onChange={(page: number) => handlePageChange(page)}
        />
      </div>
    </>
  );
};
