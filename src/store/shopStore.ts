import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TShop } from '../core/shop.type';
import { shopAPI } from '../services/shop';

interface ShopState {
  shops: TShop[];
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  fetchError: string | null;
  createError: string | null;
  updateError: string | null;
  fetchShops: () => Promise<void>;
  fetchShop: (id: number) => Promise<void>;
  updateShopField: (id: number, fieldName: keyof TShop, newValue: any) => Promise<void>;
  createShop: (kaspiLogin: string, kaspiPassword: string) => Promise<{ success: boolean, error?: string }>;
}

export const useShopStore = create<ShopState>()(
  devtools(
    persist(
      (set) => ({
        shops: [],
        isFetching: false,
        isCreating: false,
        isUpdating: false,
        fetchError: null,
        createError: null,
        updateError: null,
        fetchShops: async () => {
          set({ isFetching: true, fetchError: null });
          try {
            const shops = await shopAPI.getShops();
            set({ shops, isFetching: false });
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ fetchError: errorMessage, isFetching: false });
          }
        },
        fetchShop: async (id: number) => {
          set({ isFetching: true, fetchError: null });
          try {
            const shop = await shopAPI.getShop(id);
            set((state) => ({
              shops: state.shops.map((s) => (s.id === id ? shop : s)),
              isFetching: false
            }));
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ fetchError: errorMessage, isFetching: false });
          }
        },
        updateShopField: async (id: number, fieldName: keyof TShop, newValue: any) => {
          set({ isUpdating: true, updateError: null });
          try {
            const updatedShop = await shopAPI.updateShopField(id, fieldName, newValue);
            set((state) => ({
              shops: state.shops.map((shop) =>
                shop.id === id ? updatedShop : shop
              ),
              isUpdating: false,
            }));
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ updateError: errorMessage, isUpdating: false });
          }
        },
        createShop: async (kaspiLogin: string, kaspiPassword: string) => {
          set({ isCreating: true, createError: null });
          try {
            const newShop = await shopAPI.createShop(kaspiLogin, kaspiPassword);
            set((state) => ({
              shops: [...state.shops, newShop],
              isCreating: false
            }));
            return { success: true };
          } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
              errorMessage = error.message || 'An unknown error occurred'; // Check if the message is an empty string
            } else if (typeof error === 'string' && error.trim() === '') {
              errorMessage = 'An unknown error occurred'; // Handle the empty string case
            }
            set({ createError: errorMessage, isCreating: false });
            return { success: false, error: errorMessage };
          }
        },
      }),
      {
        name: 'shop-storage',
      }
    )
  )
);
