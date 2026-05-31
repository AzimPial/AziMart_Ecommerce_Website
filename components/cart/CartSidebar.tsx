"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartSidebar() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, updateQty, removeItem, getTotal, getItemCount } = useCartStore();

  const subtotal = getTotal();
  const totalItems = getItemCount();

  if (items.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some products to your cart to see them here"
          action={{
            label: "Continue Shopping",
            href: "/shop",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart ({totalItems})</h2>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.product._id}-${item.size}`}
            className="flex gap-4 bg-muted/50 rounded-lg p-3"
          >
            {/* Image */}
            <Link href={`/shop/${item.product.slug}`} className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/shop/${item.product.slug}`}
                className="font-medium text-sm hover:text-highlight line-clamp-1"
              >
                {item.product.name}
              </Link>
              {item.size && (
                <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
              )}
              <p className="font-semibold text-sm mt-1">{formatPrice(item.product.salePrice || item.product.price)}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQty(item.product._id, item.size, item.qty - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQty(item.product._id, item.size, item.qty + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={() => removeItem(item.product._id, item.size)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Shipping and taxes calculated at checkout
        </p>
        <Button
          className="w-full"
          size="lg"
          onClick={() => setIsCheckingOut(true)}
          disabled={isCheckingOut}
        >
          Checkout
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Link href="/shop" className="block">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}