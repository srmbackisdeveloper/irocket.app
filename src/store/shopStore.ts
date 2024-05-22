import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TShop } from '../core/shop.type';
import { shopAPI } from '../services/shop';

interface ShopState {
  shops: TShop[];
  selectedShop: TShop | null;
  isLoading: boolean;
  error: string | null;
  fetchShops: () => Promise<void>;
  fetchShop: (id: number) => Promise<void>;
  setSelectedShop: (shop: TShop | null) => void;
}

export const useShopStore = create<ShopState>()(
  devtools(
    persist(
      (set) => ({
        shops: [],
        selectedShop: null,
        isLoading: false,
        error: null,
        fetchShops: async () => {
          set({ isLoading: true, error: null });
          try {
            const shops = await shopAPI.getShops();
            set({ shops, isLoading: false });
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
          }
        },
        fetchShop: async (id: number) => {
          set({ isLoading: true, error: null });
          try {
            const shop = await shopAPI.getShop(id);
            set({ selectedShop: shop, isLoading: false });
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
          }
        },
        setSelectedShop: (shop: TShop | null) => set({ selectedShop: shop }),
      }),
      {
        name: 'shop-storage',
      }
    )
  )
);
