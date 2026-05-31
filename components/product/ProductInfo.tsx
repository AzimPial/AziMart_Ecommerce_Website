"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, slugify } from "@/lib/utils";
import { toast } from "sonner";
import type { IProduct } from "@/types";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addItem, isInCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();

  const inCart = isInCart(product._id, selectedSize || "default");
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const size = (selectedSize as unknown as string) || "default";
    addItem(product, quantity, size);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeItem(product._id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const getCategoryName = () => {
    if (typeof product.category === "string") return product.category;
    return product.category?.name;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          {product.images[selectedImage] && (
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-highlight"
                    : "border-transparent hover:border-muted-foreground"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Title & Actions */}
        <div className="flex justify-between items-start">
          <div>
            {product.category && (
              <p className="text-sm text-muted-foreground mb-1">
                {getCategoryName()}
              </p>
            )}
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleToggleWishlist}>
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-highlight text-highlight" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating!) ? "text-highlight" : "text-muted"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span className="text-3xl font-bold text-highlight">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
              <span className="bg-highlight text-white text-sm px-2 py-1 rounded">
                Save {Math.round((1 - product.salePrice / product.price) * 100)}%
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{product.description}</p>

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size as unknown as string}
                  onClick={() => setSelectedSize(size as unknown as string)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === (size as unknown as string)
                      ? "border-highlight bg-highlight text-white"
                      : "border-input hover:border-highlight"
                  }`}
                >
                  {size as unknown as string}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div>
          <h3 className="font-medium mb-3">Quantity</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product.stock}
            variant={inCart ? "outline" : "highlight"}
          >
            {inCart ? "Add Another" : "Add to Cart"}
          </Button>
        </div>

        {/* Features */}
        <div className="border-t pt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>30-day hassle-free returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
