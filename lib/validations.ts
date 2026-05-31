import { z } from "zod";

// Auth Validations
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = loginSchema;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signUpSchema = registerSchema;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Address Validations
export const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(2, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(2, "Last name is required").max(50, "Last name is too long"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  street: z.string().min(5, "Street address is required").max(200, "Street address is too long"),
  city: z.string().min(2, "City is required").max(50, "City name is too long"),
  state: z.string().min(2, "State is required").max(50, "State is too long"),
  zip: z.string().min(4, "ZIP code is required").max(10, "ZIP code is too long"),
  country: z.string().min(2, "Country is required").max(50, "Country is too long"),
  isDefault: z.boolean().optional(),
});

// Checkout Validations
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  paymentMethod: z.enum(["bKash", "Nagad", "Rocket", "Card", "Stripe"]),
  paymentDetails: z.record(z.string()).optional(),
});

export const bKashPaymentSchema = z.object({
  phone: z.string().min(11, "bKash number must be 11 digits").max(11, "bKash number must be 11 digits"),
});

export const NagadPaymentSchema = z.object({
  phone: z.string().min(11, "Nagad number must be 11 digits").max(11, "Nagad number must be 11 digits"),
});

export const RocketPaymentSchema = z.object({
  phone: z.string().min(11, "Rocket number must be 11 digits").max(11, "Rocket number must be 11 digits"),
});

export const CardPaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number")
    .regex(/^\d+$/, "Card number must contain only digits"),
  expiry: z
    .string()
    .min(5, "Invalid expiry date")
    .max(5, "Invalid expiry date")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3 or 4 digits").max(4, "CVV must be 3 or 4 digits"),
});

// Product Validations
export const productSchema = z.object({
  name: z.string().min(3, "Product name is required").max(200, "Product name is too long"),
  slug: z.string().min(3, "Slug is required").max(200, "Slug is too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description is too long"),
  longDescription: z.string().min(50, "Long description must be at least 50 characters").max(2000, "Long description is too long"),
  price: z.number().min(0, "Price must be positive").max(10000, "Price is too high"),
  salePrice: z.number().min(0).max(10000).optional(),
  stock: z.number().int().min(0, "Stock must be a positive integer"),
  category: z.string().min(1, "Category is required"),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        stock: z.number().int().min(0, "Stock must be a positive integer"),
      })
    )
    .min(1, "At least one size is required"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  featured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const productUpdateSchema = productSchema.partial();

// Review Validations
export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  body: z.string().min(20, "Review must be at least 20 characters").max(500, "Review is too long"),
});

export const reviewResponseSchema = z.object({
  reviewId: z.string(),
  response: z.string().min(10, "Response must be at least 10 characters").max(500, "Response is too long"),
});

// Coupon Validations
export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Coupon code must be at least 3 characters")
    .max(20, "Coupon code is too long")
    .regex(/^[A-Z0-9]+$/, "Coupon code must contain only uppercase letters and numbers"),
  type: z.enum(["percent", "fixed"]),
  value: z.number().min(1, "Value must be at least 1"),
  minOrder: z.number().min(0, "Minimum order must be positive").default(0),
  maxUses: z.number().int().min(1).optional(),
  expiresAt: z.string().or(z.date()).transform((val) => new Date(val)),
  active: z.boolean().default(true),
});

export const couponValidateSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  subtotal: z.number().min(0, "Subtotal must be positive"),
});

// User Validations
export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long").optional(),
  image: z.string().url("Invalid image URL").optional(),
  email: z.string().email("Invalid email").optional(),
});

export const userRoleUpdateSchema = z.object({
  role: z.enum(["user", "admin", "superadmin"]),
});

// Cart Validations
export const cartItemSchema = z.object({
  product: z.string().min(1, "Product ID is required"),
  qty: z.number().int().min(1, "Quantity must be at least 1").max(20, "Maximum 20 items per product"),
  size: z.string().min(1, "Size is required"),
});

export const cartUpdateSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  qty: z.number().int().min(1, "Quantity must be at least 1").max(20, "Maximum 20 items"),
});

// Wishlist Validations
export const wishlistItemSchema = z.object({
  product: z.string().min(1, "Product ID is required"),
});

// Search Validations
export const searchSchema = z.object({
  q: z.string().min(1, "Search query is required").max(100, "Search query is too long"),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
});

// Order Validations
export const orderCreateSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product ID is required"),
        name: z.string().min(1, "Product name is required"),
        image: z.string().min(1, "Image is required"),
        price: z.number().min(0),
        qty: z.number().int().min(1),
        size: z.string().min(1),
      })
    )
    .min(1, "Order must have at least one item"),
  shippingAddress: addressSchema,
  paymentMethod: z.enum(["bKash", "Nagad", "Rocket", "Card", "Stripe"]),
  subtotal: z.number().min(0),
  shipping: z.number().min(0),
  tax: z.number().min(0),
  discount: z.number().min(0).default(0),
  total: z.number().min(0),
  couponCode: z.string().optional(),
});

export const orderStatusUpdateSchema = z.object({
  orderStatus: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]),
  trackingNumber: z.string().optional(),
});

// Pagination Validations
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

// Filter Validations
export const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sizes: z.array(z.string()).optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  featured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  onSale: z.boolean().optional(),
});

// Newsletter Validations
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Contact Form Validations
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject is required").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type CouponValidateInput = z.infer<typeof couponValidateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type CartUpdateInput = z.infer<typeof cartUpdateSchema>;
export type WishlistItemInput = z.infer<typeof wishlistItemSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type FilterInput = z.infer<typeof filterSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;