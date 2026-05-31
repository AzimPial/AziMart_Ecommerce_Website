import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReviewDocument extends Document {
  _id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    body: {
      type: String,
      required: [true, "Review body is required"],
      maxlength: [500, "Body cannot exceed 500 characters"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review: Model<IReviewDocument> =
  mongoose.models.Review || mongoose.model<IReviewDocument>("Review", reviewSchema);

export default Review;