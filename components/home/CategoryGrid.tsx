import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-1">
            Find the perfect fit for your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category._id}
              href={`/shop?category=${category.slug}`}
              className="group"
            >
              <div className="relative aspect-square rounded-full overflow-hidden bg-background shadow-sm mb-3">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              <h3 className="text-center font-medium group-hover:text-highlight transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}