import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProductSize {
  size: string;
  stock: number;
}

export interface IProductDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: Types.ObjectId;
  sizes: IProductSize[];
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew: boolean;
  tags: string[];
}

const sizeSchema = new Schema(
  {
    size: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    longDescription: {
      type: String,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    salePrice: {
      type: Number,
      min: [0, "Sale price cannot be negative"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    sizes: {
      type: [sizeSchema],
      default: [],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one product image is required",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ "sizes.size": 1 });

const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", productSchema);

export default Product;