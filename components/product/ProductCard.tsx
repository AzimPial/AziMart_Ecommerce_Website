"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/Button";
import type { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  
  const inCart = isInCart(product._id, "default");
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, "default");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeItem(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group">
      {/* Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.salePrice && (
            <span className="bg-highlight text-white text-xs font-medium px-2 py-1 rounded">
              -{Math.round((1 - product.salePrice / product.price) * 100)}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-lg"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-highlight text-highlight" : ""}`} />
          </Button>
          {product.stock && (
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-background px-4 py-2 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-medium group-hover:text-highlight transition-colors line-clamp-1">
        {product.name}
      </h3>
      {product.category && (
        <p className="text-sm text-muted-foreground">{typeof product.category === "string" ? product.category : product.category?.name}</p>
      )}
      <div className="flex items-center gap-2 mt-1">
        {product.salePrice ? (
          <>
            <span className="font-semibold text-highlight">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          </>
        ) : (
          <span className="font-semibold">{formatPrice(product.price)}</span>
        )}
      </div>

      {/* Rating */}
      {product.rating && product.rating > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating!) ? "text-highlight" : "text-muted"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
      )}
    </Link>
  );
}
