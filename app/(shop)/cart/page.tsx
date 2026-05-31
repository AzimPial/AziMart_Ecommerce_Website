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
  const { items, updateQuantity, removeItem, getSubtotal, getTotalItems, clearCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const { openWishlist } = useUIStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
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
    addToWishlist({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
    });
    removeItem(item.productId);
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
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
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
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="p-4 grid grid-cols-6 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-3 flex gap-4">
                    <Link href={`/shop/${item.slug}`} className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-medium hover:text-highlight line-clamp-1"
                      >
                        {item.name}
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
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <span>{formatPrice(item.price)}</span>

                  {/* Quantity */}
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.productId, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.productId, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Total */}
                  <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={() => openWishlist()}>
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

            <Button className="w-full mt-6" size="lg" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}