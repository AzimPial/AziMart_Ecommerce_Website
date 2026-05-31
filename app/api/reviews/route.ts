import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, rating, comment } = body;

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Product ID, rating, and comment are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: session.user.id,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create review
    const review = new Review({
      product: productId,
      user: session.user.id,
      rating: Number(rating),
      comment,
      isVerified: true, // In real app, verify purchase
    });

    await review.save();

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      reviewCount: reviews.length,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}