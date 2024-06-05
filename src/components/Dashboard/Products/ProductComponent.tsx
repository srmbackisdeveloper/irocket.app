import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductList } from "./ProductList";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Spinner, Tooltip } from "@nextui-org/react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ProductSearch } from "./ProductSearch";
import { Overlay } from "./Overlay";
import { useShopStore } from "../../../store/shopStore";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from 'next-themes';

const theme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#f31260',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(243, 18, 96,)',
            '&:hover': {
              backgroundColor: 'rgba(243, 18, 96, 0.9)',
            },
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#f31260',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)', // Default text color
          '&.Mui-selected': {
            backgroundColor: 'rgba(243, 18, 96,)',
            color: '#fff', // Selected text color
            '&:hover': {
              backgroundColor: 'rgba(243, 18, 96, 0.9)',
            },
          },
        },
      },
    },
  },
});

export const ProductComponent: React.FC = () => {
  const { shops } = useShopStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  // Initialize page state from URL
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);

  const [page, setPage] = useState<number>(initialPage);
  const searchQuery = queryParams.get('query') || undefined;
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false); // Overlay state
  const limit = 10; // Constant limit
  const query = useGetProducts(page, limit, searchQuery);

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

  // Reset page to 1 when search query changes
  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

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

  useEffect(() => {
    console.log("Query data:", query.data);
  }, [query.data]);

  if (query.isLoading) {
    return <div>
              <tr>
                <td colSpan={6} className="flex justify-center items-center w-screen h-[40vh]">
                  <Spinner size="lg" color="danger" />
                </td>
              </tr>
          </div>;
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <>
      <Overlay isVisible={isOverlayVisible} /> {/* Use Overlay component */}
      <ProductSearch shops={shops} onProductsRefresh={refreshProducts} />
      <div className={`border rounded-lg p-3 min-w-320px overflow-x-auto ${isOverlayVisible ? 'pointer-events-none' : ''}`}>
        <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="w-full min-w-max table-fixed">
            <thead className="border-b dark:border-gray-500 sticky top-0 bg-white dark:bg-[rgb(31,31,31)] z-20">
              <tr className="text-base dark:text-slate-300">
                <th className="font-semibold md:w-[20%] w-full p-2 text-left">Название</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Цена</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Тек. место</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">1-ое место</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Мин. цена</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Макс. цена</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Цен. ориентир</th>
                <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Шаг</th>
                <Tooltip
                  placement="top-end"
                  offset={-10}
                  className="bg-gray-600 text-white max-w-xs"
                  showArrow={true}
                  content="Если отключено, то бот не будет изменять цену данного товара"
                >
                  <th className="font-semibold w-[10%] p-2 hidden md:table-cell">Актив.</th>
                </Tooltip>
              </tr>
            </thead>
            <tbody>
              <ProductList query={query} />
            </tbody>
          </table>
        </div>
        <Stack spacing={2} className="grid justify-center items-center mt-[2em] mb-[1em] md:px-[4em]">
          <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
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
