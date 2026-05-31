"use client";

import { useState } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function WishlistSidebar() {
  const { items, removeItem, getTotalItems } = useWishlistStore();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love by clicking the heart icon on product pages"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Wishlist ({totalItems})</h2>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 bg-muted/50 rounded-lg p-3"
          >
            {/* Image */}
            <Link
              href={`/shop/${item.slug}`}
              className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/shop/${item.slug}`}
                className="font-medium text-sm hover:text-highlight line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="font-semibold text-sm mt-1">{formatPrice(item.price)}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-destructive hover:text-destructive mt-2"
                onClick={() => removeItem(item.productId)}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Link href="/wishlist">
          <Button className="w-full" variant="outline">
            View All ({totalItems})
          </Button>
        </Link>
      </div>
    </div>
  );
}