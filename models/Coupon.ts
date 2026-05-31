import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICouponDocument extends Document {
  _id: mongoose.Types.ObjectId;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  maxUses?: number;
  usedCount: number;
  expiresAt: Date;
  active: boolean;
  description?: string;
}

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["percent", "fixed"],
    },
    value: {
      type: Number,
      required: [true, "Coupon value is required"],
      min: [1, "Value must be at least 1"],
    },
    minOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxUses: {
      type: Number,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ code: 1 });
couponSchema.index({ active: 1 });
couponSchema.index({ expiresAt: 1 });

const Coupon: Model<ICouponDocument> =
  mongoose.models.Coupon || mongoose.model<ICouponDocument>("Coupon", couponSchema);

export default Coupon;