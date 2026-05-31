import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  qty: number;
  size: string;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IOrderDocument extends Document {
  _id: mongoose.Types.ObjectId;
  orderId: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  couponCode?: string;
  notes?: string;
}

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true, default: "Bangladesh" },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v: IOrderItem[]) => v.length > 0,
        message: "Order must have at least one item",
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bKash", "Nagad", "Rocket", "Card", "Stripe"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    trackingNumber: {
      type: String,
    },
    couponCode: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ orderId: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

const Order: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", orderSchema);

export default Order;