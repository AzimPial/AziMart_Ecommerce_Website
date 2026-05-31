import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  qty: number;
  size: string;
}

export interface ICartDocument extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String, required: true },
  },
  { _id: true }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ user: 1 });

const Cart: Model<ICartDocument> =
  mongoose.models.Cart || mongoose.model<ICartDocument>("Cart", cartSchema);

export default Cart;