import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlistDocument extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ user: 1 });

const Wishlist: Model<IWishlistDocument> =
  mongoose.models.Wishlist || mongoose.model<IWishlistDocument>("Wishlist", wishlistSchema);

export default Wishlist;