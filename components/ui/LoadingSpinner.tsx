"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function ButtonSpinner({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${
        size === "sm" ? "w-4 h-4" : "w-5 h-5"
      }`}
    />
  );
}