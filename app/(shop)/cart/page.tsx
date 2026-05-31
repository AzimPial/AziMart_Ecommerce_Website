"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQty, removeItem, getTotal, getItemCount, clearCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const { setWishlistOpen } = useUIStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Fixed: use getTotal() for subtotal
  const subtotal = getTotal();
  const totalItems = getItemCount();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - promoDiscount;

  const handleApplyPromo = () => {
    // TODO: Implement promo code validation
    if (promoCode.toLowerCase() === "save10") {
      setPromoDiscount(subtotal * 0.1);
    }
  };

  const handleMoveToWishlist = (item: typeof items[0]) => {
    addToWishlist(item.product);
    removeItem(item.product._id, item.size);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 grid grid-cols-6 gap-4 text-sm font-medium">
              <span className="col-span-3">Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <div className="divide-y">
              {items.map((item) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div key={`${item.product._id}-${item.size}`} className="p-4 grid grid-cols-6 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-3 flex gap-4">
                      <Link href={`/shop/${item.product.slug}`} className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={item.product.images?.[0] || item.product.thumbnail}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-medium hover:text-highlight line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {item.size && (
                          <p className="text-sm text-muted-foreground mt-0.5">Size: {item.size}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <button
                            className="text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleMoveToWishlist(item)}
                          >
                            Move to wishlist
                          </button>
                          <button
                            className="text-sm text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.product._id, item.size)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <span>{formatPrice(price)}</span>

                    {/* Quantity */}
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQty(item.product._id, item.size, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQty(item.product._id, item.size, item.qty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Total */}
                    <span className="font-semibold">{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={() => setWishlistOpen(true)}>
              <Heart className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Promo Code */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-highlight">
                  <span>Discount</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}