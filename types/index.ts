// User Types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  _id?: string;
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
}

// Product Types
export interface IProductSize {
  size: string;
  stock: number;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: ICategory | string;
  sizes: IProductSize[];
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Category Types
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  order: number;
}

// Order Types
export interface IOrderItem {
  product: string | IProduct;
  name: string;
  image: string;
  price: number;
  qty: number;
  size: string;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface IReview {
  _id: string;
  product: string | IProduct;
  user: string | IUser;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: Date;
}

// Cart Types
export interface ICartItem {
  product: string | IProduct;
  qty: number;
  size: string;
  _id?: string;
}

export interface ICart {
  _id: string;
  user: string | IUser;
  items: ICartItem[];
  updatedAt: Date;
}

// Wishlist Types
export interface IWishlist {
  _id: string;
  user: string | IUser;
  products: (string | IProduct)[];
}

// Coupon Types
export interface ICoupon {
  _id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  maxUses?: number;
  usedCount: number;
  expiresAt: Date;
  active: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  minRating?: number;
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  search?: string;
  sort?: string;
}

export interface SortOption {
  label: string;
  value: string;
}

// Checkout Types
export interface CheckoutData {
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentDetails?: Record<string, string>;
}

// Analytics Types
export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueByDate: { date: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  topProducts: { productId: string; name: string; sales: number }[];
  recentOrders: IOrder[];
}

// Session Types
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
}

// Component Props Types
export interface ProductCardProps {
  product: IProduct;
}

export interface CartItemProps {
  item: ICartItem;
}

export interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AddressFormData {
  label?: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  body: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  sizes: IProductSize[];
  images: string[];
  thumbnail: string;
  featured: boolean;
  isNew: boolean;
  tags: string[];
}