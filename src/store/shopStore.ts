import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TShop } from '../core/shop.type';
import { shopAPI } from '../services/shop';

interface ShopState {
  shops: TShop[];
  isLoading: boolean;
  error: string | null;
  fetchShops: () => Promise<void>;
  fetchShop: (id: number) => Promise<void>;
  updateShopField: (id: number, fieldName: keyof TShop, newValue: any) => Promise<void>;
  createShop: (kaspiLogin: string, kaspiPassword: string) => Promise<void>;
}

export const useShopStore = create<ShopState>()(
  devtools(
    persist(
      (set) => ({
        shops: [],
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
            set((state) => ({
              shops: state.shops.map((s) => (s.id === id ? shop : s)),
              isLoading: false
            }));
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
          }
        },
        updateShopField: async (id: number, fieldName: keyof TShop, newValue: any) => {
          set({ error: null });
          try {
            const updatedShop = await shopAPI.updateShopField(id, fieldName, newValue);
            set((state) => ({
              shops: state.shops.map((shop) =>
                shop.id === id ? updatedShop : shop
              ),
            }));
            // console.log(updatedShop);
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage});
          }
        },
        createShop: async (kaspiLogin: string, kaspiPassword: string) => {
          set({ isLoading: true, error: null });
          try {
            const newShop = await shopAPI.createShop(kaspiLogin, kaspiPassword);
            set((state) => ({
              shops: [...state.shops, newShop],
              isLoading: false
            }));
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
          }
        },
      }),
      {
        name: 'shop-storage',
      }
    )
  )
);
