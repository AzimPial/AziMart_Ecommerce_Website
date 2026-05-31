"use client";

import { useCartStore } from "@/store/cartStore";
import { IProduct } from "@/types";
import { toast } from "sonner";

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getItemCount,
    getTotal,
    isInCart,
  } = useCartStore();

  const addToCart = async (product: IProduct, qty: number, size: string) => {
    addItem(product, qty, size);
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${size} | Qty: ${qty}`,
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    removeItem(productId, size);
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, size: string, qty: number) => {
    updateQty(productId, size, qty);
  };

  const syncWithServer = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      if (data.success && data.data) {
        useCartStore.getState().updateItemFromServer(data.data.items);
      }
    } catch (error) {
      console.error("Failed to sync cart with server:", error);
    }
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: getItemCount(),
    total: getTotal(),
    isInCart,
    syncWithServer,
  };
}