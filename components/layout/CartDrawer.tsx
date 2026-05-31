"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, addItem, removeItem, updateQty, clearCart, getTotal } = useCartStore();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-background shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Shopping Cart</h2>
            <span className="text-sm text-muted-foreground">
              ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link href="/shop" onClick={() => setCartOpen(false)}>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li key={item.productId} className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-medium hover:text-highlight line-clamp-1"
                      onClick={() => setCartOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="space-y-2">
              <Link href="/cart" onClick={() => setCartOpen(false)}>
                <Button className="w-full">View Cart</Button>
              </Link>
              <Link href="/checkout" onClick={() => setCartOpen(false)}>
                <Button className="w-full" variant="highlight">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}