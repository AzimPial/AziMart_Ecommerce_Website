"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { IProduct } from "@/types";
import { toast } from "sonner";

export function useWishlist() {
  const {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    getItemCount,
  } = useWishlistStore();

  const toggleWishlist = async (product: IProduct) => {
    if (isInWishlist(product._id)) {
      removeItem(product._id);
      toast.success("Removed from wishlist");
    } else {
      addItem(product);
      toast.success("Added to wishlist");
    }
  };

  const syncWithServer = async () => {
    try {
      const response = await fetch("/api/wishlist");
      const data = await response.json();
      if (data.success && data.data) {
        useWishlistStore.getState().updateItemsFromServer(data.data.products);
      }
    } catch (error) {
      console.error("Failed to sync wishlist with server:", error);
    }
  };

  return {
    items,
    addItem,
    removeItem,
    toggleWishlist,
    clearWishlist,
    itemCount: getItemCount(),
    isInWishlist,
    syncWithServer,
  };
}