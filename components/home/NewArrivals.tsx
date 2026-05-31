import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { IProduct } from "@/types";

interface NewArrivalsProps {
  products: IProduct[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground mt-1">
            Fresh styles just dropped - be the first to get them
          </p>
        </div>
        <Link href="/shop?sort=newest">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Large */}
        {products[0] && (
          <Link
            href={`/shop/${products[0].slug}`}
            className="group relative h-[400px] rounded-xl overflow-hidden"
          >
            <Image
              src={products[0].images[0]}
              alt={products[0].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-sm text-highlight font-medium">New Arrival</span>
              <h3 className="text-2xl font-bold text-white mt-1">{products[0].name}</h3>
              <p className="text-white/80 mt-1">{formatPrice(products[0].price)}</p>
            </div>
          </Link>
        )}

        {/* Grid of 3 */}
        <div className="grid grid-cols-2 gap-4">
          {products.slice(1, 5).map((product) => (
            <Link
              key={product._id}
              href={`/shop/${product.slug}`}
              className="group relative h-[190px] rounded-xl overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-white text-sm line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-white/80 text-sm">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}