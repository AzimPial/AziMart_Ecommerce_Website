import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICategoryDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  image: string;
  description: string;
  order: number;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Category image is required"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ slug: 1 });
categorySchema.index({ order: 1 });

const Category: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", categorySchema);

export default Category;