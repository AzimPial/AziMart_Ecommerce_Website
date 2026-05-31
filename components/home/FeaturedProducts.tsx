import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground mt-1">
            Discover our handpicked selection of top sellers
          </p>
        </div>
        <Link href="/shop">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
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
              {product.salePrice && (
                <span className="absolute top-2 left-2 bg-highlight text-white text-xs font-medium px-2 py-1 rounded">
                  Sale
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                  New
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
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-semibold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}