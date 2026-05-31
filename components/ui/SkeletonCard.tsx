"use client";

import { useEffect, useState } from "react";

interface SkeletonCardProps {
  variant?: "product" | "category" | "order";
}

export function SkeletonCard({ variant = "product" }: SkeletonCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (variant === "product") {
    return (
      <div className="animate-pulse">
        <div className="aspect-square bg-muted rounded-lg mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-5 bg-muted rounded w-1/4 mt-2" />
        </div>
      </div>
    );
  }

  if (variant === "category") {
    return (
      <div className="animate-pulse">
        <div className="aspect-square bg-muted rounded-full mb-3" />
        <div className="h-4 bg-muted rounded w-16 mx-auto" />
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="h-20 bg-muted rounded-lg mb-3" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2 mt-2" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="product" />
      ))}
    </>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="category" />
      ))}
    </>
  );
}