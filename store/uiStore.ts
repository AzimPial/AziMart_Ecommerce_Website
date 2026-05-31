import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  wishlistOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  wishlistOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,

  setCartOpen: (open) => set({ cartOpen: open }),
  setWishlistOpen: (open) => set({ wishlistOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
}));