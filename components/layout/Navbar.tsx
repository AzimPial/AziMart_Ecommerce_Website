"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const { setSearchOpen } = useUIStore();

  const cartItemCount = getItemCount();
  const wishlistItemCount = getWishlistCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">
              Azi<span className="text-highlight">Mart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User */}
            {session ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </Button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg">
                    <div className="p-2">
                      <p className="px-2 py-1 text-sm font-medium">
                        {session.user?.name}
                      </p>
                      <p className="px-2 py-1 text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                    <hr className="my-1" />
                    <div className="p-1">
                      <Link
                        href="/account"
                        className="block px-2 py-1 text-sm hover:bg-muted rounded"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-2 py-1 text-sm hover:bg-muted rounded"
                      >
                        Orders
                      </Link>
                      {session.user?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block px-2 py-1 text-sm hover:bg-muted rounded"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded text-destructive"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="icon" aria-label="Sign in">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-highlight text-[10px] font-medium text-white flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-highlight text-[10px] font-medium text-white flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => useUIStore.getState().setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}