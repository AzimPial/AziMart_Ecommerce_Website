import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types";

interface WishlistState {
  items: IProduct[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
  updateItemsFromServer: (items: IProduct[]) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item._id === product._id)) {
            return state;
          }
          if (state.items.length >= 50) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item._id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },

      updateItemsFromServer: (items) => {
        set({ items });
      },
    }),
    {
      name: "azimart-wishlist",
      partialize: (state) => ({ items: state.items }),
    }
  )
);