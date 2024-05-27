import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Tooltip } from "@nextui-org/react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ProductSearch } from "./ProductSearch";
import { Overlay } from "../../shared/Overlay";
import { useShopStore } from "../../../store/shopStore";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    secondary: {
      main: '#f31260',
    },
  },
});


const customStyles = ` .MuiPaginationItem-page.Mui-selected:hover { background-color: rgba(243, 18, 96, 0.9); } `;

export const ProductComponent: React.FC = () => {
  const { shops } = useShopStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize page state from URL
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);

  const [page, setPage] = useState<number>(initialPage);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false); // Overlay state
  const limit = 10; // Constant limit
  const query = useGetProducts(page, limit);

  const totalPages = Math.ceil((query.data?.count ?? 0) / limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    event.preventDefault();
    setPage(newPage);
  };

  // Update URL when page state changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentUrlPage = parseInt(params.get('page') || '1', 10);
    if (currentUrlPage !== page) {
      params.set('page', page.toString());
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [page, navigate, location.search]);

  // Sync page state with URL when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPage = parseInt(params.get('page') || '1', 10);
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [location.search]);

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
      <style>{customStyles}</style>
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
        <Stack spacing={2} className="grid justify-center items-center mt-[2em] mb-[1em] px-[4em]">
          <ThemeProvider theme={theme}>
            <Pagination
              shape="rounded"
              count={totalPages}
              color="secondary"
              size="large"
              page={page}
              onChange={handlePageChange}
            />
          </ThemeProvider>
        </Stack>
      </div>
    </>
  );
};