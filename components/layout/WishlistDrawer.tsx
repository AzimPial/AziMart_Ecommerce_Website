"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  useEffect(() => {
    if (wishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [wishlistOpen]);

  if (!wishlistOpen) return null;

  const handleAddToCart = (item: typeof wishlist.items[0]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      size: item.size,
      qty: 1,
    });
    removeItem(item.productId);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-background shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Wishlist</h2>
            <span className="text-sm text-muted-foreground">
              ({wishlist.items.length} {wishlist.items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWishlistOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {wishlist.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
              <Link href="/shop" onClick={() => setWishlistOpen(false)}>
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlist.items.map((item) => (
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
                      onClick={() => setWishlistOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-medium">{formatPrice(item.price)}</p>
                      <Button
                        size="sm"
                        variant="highlight"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
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
        {wishlist.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <Link href="/wishlist" onClick={() => setWishlistOpen(false)}>
              <Button className="w-full">View All Wishlist</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}