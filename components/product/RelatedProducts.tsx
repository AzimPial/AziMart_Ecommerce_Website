"use client";

import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types";

interface RelatedProductsProps {
  products: IProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/shop/${product.slug}`}
            className="group"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-highlight text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
              {product.salePrice && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )}
            </div>
            <h3 className="font-medium group-hover:text-highlight transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {product.salePrice ? (
                <>
                  <span className="font-semibold text-highlight">
                    ${product.salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="font-semibold">${product.price}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
