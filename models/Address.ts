import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddressDocument extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  label?: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String,
      maxlength: [50, "Label cannot exceed 50 characters"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    street: {
      type: String,
      required: [true, "Street address is required"],
      maxlength: [200, "Street address cannot exceed 200 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      maxlength: [50, "City cannot exceed 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      maxlength: [50, "State cannot exceed 50 characters"],
    },
    zip: {
      type: String,
      required: [true, "ZIP code is required"],
      maxlength: [10, "ZIP code cannot exceed 10 characters"],
    },
    country: {
      type: String,
      required: true,
      default: "Bangladesh",
      maxlength: [50, "Country cannot exceed 50 characters"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

addressSchema.index({ user: 1 });
addressSchema.index({ user: 1, isDefault: 1 });

const Address: Model<IAddressDocument> =
  mongoose.models.Address || mongoose.model<IAddressDocument>("Address", addressSchema);

export default Address;