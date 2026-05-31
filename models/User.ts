import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "admin";
  addresses: mongoose.Types.DocumentArray<{
    label?: string;
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault?: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const addressSchema = new Schema(
  {
    label: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true, default: "Bangladesh" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 });

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;