"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, User, Heart, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function MobileMenu() {
  const { data: session } = useSession();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Menu */}
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-background shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold">
              Azi<span className="text-highlight">Mart</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-lg font-medium hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-4" />

            {/* User Section */}
            <div className="space-y-2">
              {session ? (
                <>
                  <div className="px-4 py-2">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>My Account</span>
                  </Link>
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-3 hover:bg-muted rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}

              <Link
                href="/wishlist"
                className="flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </div>
                {getWishlistCount() > 0 && (
                  <span className="bg-highlight text-white text-xs px-2 py-0.5 rounded-full">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cart</span>
                </div>
                {getItemCount() > 0 && (
                  <span className="bg-highlight text-white text-xs px-2 py-0.5 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}