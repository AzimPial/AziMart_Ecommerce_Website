"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { toast } from "sonner";
import { reviewSchema } from "@/lib/validations";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";

interface ProductReviewsProps {
  reviews: Review[];
  productId: string;
  rating: number;
  numReviews: number;
}

export function ProductReviews({
  reviews,
  productId,
  rating,
  numReviews,
}: ProductReviewsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productId, rating: userRating }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully");
      reset();
      setUserRating(0);
      // Optionally refresh reviews
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
            <div className="flex justify-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < Math.floor(rating) ? "text-highlight" : "text-muted"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{numReviews} reviews</p>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => Math.round(r.rating) === star).length;
              const percentage = numReviews > 0 ? (count / numReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{star} ★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-highlight"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write Review */}
      <div className="mb-8 border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setUserRating(i + 1);
                    setValue("rating", String(i + 1));
                  }}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={`${
                      i < (hoverRating || userRating)
                        ? "fill-highlight text-highlight"
                        : "text-muted"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              {...register("comment")}
              placeholder="Share your experience with this product..."
              rows={4}
              error={errors.comment?.message}
            />
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            <Send className="h-4 w-4 mr-2" />
            Submit Review
          </Button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
                    {review.user?.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-medium">{review.user?.name || "Anonymous"}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? "text-highlight" : "text-muted"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}