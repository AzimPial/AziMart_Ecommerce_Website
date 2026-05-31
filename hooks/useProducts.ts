"use client";

import { useState, useCallback } from "react";
import { IProduct, ProductFilters, PaginatedResponse } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (filters?: ProductFilters, pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", pageNum.toString());
      params.set("limit", "12");

      if (filters?.category) params.set("category", filters.category);
      if (filters?.minPrice) params.set("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
      if (filters?.sizes?.length) params.set("sizes", filters.sizes.join(","));
      if (filters?.minRating) params.set("minRating", filters.minRating.toString());
      if (filters?.featured) params.set("featured", "true");
      if (filters?.isNew) params.set("isNew", "true");
      if (filters?.onSale) params.set("onSale", "true");
      if (filters?.search) params.set("search", filters.search);
      if (filters && "sort" in filters && filters.sort) params.set("sort", filters.sort);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data: PaginatedResponse<IProduct> = await response.json();

      if (data.success) {
        setProducts(data.data);
        setTotal(data.total);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProduct = useCallback(async (idOrSlug: string): Promise<IProduct | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${idOrSlug}`);
      const data = await response.json();

      if (data.success && data.data) {
        return data.data;
      } else {
        setError(data.error || "Failed to fetch product");
        return null;
      }
    } catch (err) {
      setError("Failed to fetch product");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || "Search failed");
      }
    } catch (err) {
      setError("Search failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    total,
    page,
    totalPages,
    fetchProducts,
    fetchProduct,
    searchProducts,
    setPage: (p: number) => {
      setPage(p);
      fetchProducts(undefined, p);
    },
  };
}