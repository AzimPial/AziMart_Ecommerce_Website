"use client";

import { useState } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeItem, getTotalItems } = useWishlistStore();
  const { addItem } = useCartStore();
  const [movingIds, setMovingIds] = useState<Set<string>>(new Set());

  const totalItems = getTotalItems();

  const handleMoveToCart = async (item: typeof items[0]) => {
    setMovingIds((prev) => new Set([...prev, item.productId]));
    try {
      addItem({
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        price: item.price,
        image: item.image,
        qty: 1,
      });
      removeItem(item.productId);
      toast.success(`${item.name} added to cart`);
    } finally {
      setMovingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.productId);
        return next;
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Save items you love by clicking the heart icon on product pages.
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Wishlist ({totalItems})</h1>
        <Button variant="outline" asChild>
          <Link href="/shop">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="group border rounded-lg overflow-hidden"
          >
            {/* Image */}
            <Link
              href={`/shop/${item.slug}`}
              className="relative aspect-square bg-muted block overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                className="absolute top-2 right-2 p-2 rounded-full bg-white/90 text-destructive hover:bg-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  removeItem(item.productId);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </Link>

            {/* Details */}
            <div className="p-4">
              <Link
                href={`/shop/${item.slug}`}
                className="font-medium hover:text-highlight line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="font-semibold mt-1">{formatPrice(item.price)}</p>

              <Button
                className="w-full mt-4"
                size="sm"
                onClick={() => handleMoveToCart(item)}
                isLoading={movingIds.has(item.productId)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}