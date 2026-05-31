"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 16,
  showValue = false,
  interactive = false,
  onChange,
  className = "",
}: RatingStarsProps) {
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < Math.floor(rating);
          const isHalf = !isFilled && index < rating;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(index)}
              className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
            >
              <Star
                size={size}
                className={`${
                  isFilled
                    ? "fill-highlight text-highlight"
                    : isHalf
                      ? "fill-highlight/50 text-highlight"
                      : "fill-muted text-muted"
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function ReviewStars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <RatingStars rating={rating} size={14} />
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} ({count} {count === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}