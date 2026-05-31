"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search, SlidersHorizontal, X, Grid, List } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import type { IProduct, ICategory } from "@/types";

interface ShopClientProps {
  products: IProduct[];
  categories: ICategory[];
  totalProducts: number;
  totalPages: number;
}

export function ShopClient({ products, categories, totalProducts, totalPages }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    inStock: searchParams.get("inStock") === "true",
    sort: searchParams.get("sort") || "newest",
  });

  const debouncedSearch = useDebounce(search, 300);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.inStock) params.set("inStock", "true");
    if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);

    const queryString = params.toString();
    router.push(`/shop${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  useEffect(() => {
    updateURL();
  }, [debouncedSearch, filters]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category) {
        const categorySlug = typeof product.category === "object" && product.category !== null 
          ? product.category.slug 
          : product.category;
        if (categorySlug !== filters.category) return false;
      }
      if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
      if (filters.inStock && !product.stock) return false;
      return true;
    });
  }, [products, filters]);

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      sort: "newest",
    });
    setSearch("");
  };

  const hasActiveFilters =
    filters.category || filters.minPrice || filters.maxPrice || filters.inStock;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shop</h1>
          <p className="text-muted-foreground">
            {totalProducts} products found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-40"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </Select>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:flex"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* View Mode */}
          <div className="hidden md:flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}
        >
          <div className="bg-muted/50 rounded-lg p-4 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>

            {/* Category */}
            <div>
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.slug}
                      onChange={() =>
                        setFilters({
                          ...filters,
                          category: filters.category === category.slug ? "" : category.slug,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="w-24"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="w-24"
                />
              </div>
            </div>

            {/* In Stock */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) =>
                    setFilters({ ...filters, inStock: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No products found"
              description="Try adjusting your search or filter criteria"
              action={{ label: "Clear Filters", onClick: clearFilters }}
            />
          ) : (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={
                        Number(searchParams.get("page")) === i + 1 ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", String(i + 1));
                        router.push(`/shop?${params.toString()}`);
                      }}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}