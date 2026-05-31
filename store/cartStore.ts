import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct, ICartItem } from "@/types";

interface CartItemWithProduct extends ICartItem {
  product: IProduct;
}

interface CartState {
  items: CartItemWithProduct[];
  addItem: (product: IProduct, qty: number, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  isInCart: (productId: string, size: string) => boolean;
  updateItemFromServer: (items: CartItemWithProduct[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty, size) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product._id === product._id && item.size === size
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              qty: Math.min(newItems[existingIndex].qty + qty, 20),
            };
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, qty, size }],
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product._id === productId && item.size === size)
          ),
        }));
      },

      updateQty: (productId, size, qty) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.size === size
              ? { ...item, qty: Math.max(1, Math.min(qty, 20)) }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price;
          return total + price * item.qty;
        }, 0);
      },

      isInCart: (productId, size) => {
        return get().items.some(
          (item) => item.product._id === productId && item.size === size
        );
      },

      updateItemFromServer: (items) => {
        set({ items });
      },
    }),
    {
      name: "azimart-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);