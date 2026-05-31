// App-wide constants

export const APP_NAME = "AziMart";
export const TAGLINE = "Move Forward";

// Navigation Links
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Kids", href: "/kids" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Sale", href: "/sale" },
];

// Footer Links
export const FOOTER_LINKS = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "Sale", href: "/sale" },
  ],
  help: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Info", href: "/faq#shipping" },
    { name: "Returns", href: "/faq#returns" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/about#careers" },
    { name: "Press", href: "/about#press" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/privacy#cookies" },
  ],
};

// Sort Options
export const SORT_OPTIONS = [
  { label: "Newest", value: "-createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Best Rating", value: "-rating" },
  { label: "Name A-Z", value: "name" },
];

// Price Ranges for Filter
export const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "$150 - $200", min: 150, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

// Available Sizes
export const SIZES = [
  "US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5",
  "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12",
];

// Rating Options
export const RATINGS = [
  { label: "5 Stars", value: 5 },
  { label: "4+ Stars", value: 4 },
  { label: "3+ Stars", value: 3 },
  { label: "2+ Stars", value: 2 },
];

// Pagination
export const PRODUCTS_PER_PAGE = 12;
export const REVIEWS_PER_PAGE = 5;

// Order Statuses
export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "confirmed", label: "Confirmed", color: "blue" },
  { value: "processing", label: "Processing", color: "purple" },
  { value: "shipped", label: "Shipped", color: "indigo" },
  { value: "delivered", label: "Delivered", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
];

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: "bKash",
    name: "bKash",
    icon: "/images/bkash.png",
    description: "Pay with your bKash mobile wallet",
  },
  {
    id: "Nagad",
    name: "Nagad",
    icon: "/images/nagad.png",
    description: "Pay with your Nagad mobile wallet",
  },
  {
    id: "Rocket",
    name: "Rocket",
    icon: "/images/rocket.png",
    description: "Pay with your Rocket mobile wallet",
  },
  {
    id: "Card",
    name: "Credit/Debit Card",
    icon: "/images/card.png",
    description: "Pay with Visa, Mastercard, or others",
  },
  {
    id: "Stripe",
    name: "Stripe",
    icon: "/images/stripe.png",
    description: "Pay securely with Stripe",
  },
];

// Default Images
export const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";
export const DEFAULT_AVATAR = "/images/avatar-placeholder.png";

// Promo Banner Config
export const PROMO_END_DATE = new Date("2026-06-15T23:59:59");

// Analytics Config
export const ANALYTICS_DATE_RANGES = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
];

// Social Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/azimart",
  instagram: "https://instagram.com/azimart",
  twitter: "https://twitter.com/azimart",
  youtube: "https://youtube.com/azimart",
};

// Contact Info
export const CONTACT_INFO = {
  email: "support@azimart.com",
  phone: "+880 1XXX-XXXXXX",
  address: "123 Commerce Street, Dhaka, Bangladesh",
  hours: "Mon-Sat: 9AM - 8PM",
};

// Email Templates
export const EMAIL_TEMPLATES = {
  orderConfirmation: {
    subject: "Order Confirmed - AziMart",
  },
  orderShipped: {
    subject: "Your AziMart Order Has Been Shipped!",
  },
  orderDelivered: {
    subject: "Your AziMart Order Has Been Delivered",
  },
};

// SEO Defaults
export const SEO_DEFAULTS = {
  title: "AziMart - Move Forward",
  description: "Premium footwear and apparel. Move Forward with AziMart.",
  keywords: "shoes, footwear, sneakers, apparel, fashion, AziMart",
  ogImage: "/images/og-image.jpg",
};

// Free Shipping Threshold
export const FREE_SHIPPING_THRESHOLD = 100;

// Tax Rate (8%)
export const TAX_RATE = 0.08;

// Maximum Coupon Uses
export const MAX_COUPON_USES = 1000;

// Wishlist Limit
export const WISHLIST_LIMIT = 50;

// Cart Item Limit
export const CART_ITEM_LIMIT = 20;

// Review Guidelines
export const REVIEW_GUIDELINES = {
  minLength: 20,
  maxLength: 500,
  minRating: 1,
  maxRating: 5,
};

// Admin Roles
export const ADMIN_ROLES = ["admin", "superadmin"];

// User Roles
export const USER_ROLES = ["user", "admin", "superadmin"];

// Session Config
export const SESSION_CONFIG = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
};

// Image Config
export const IMAGE_CONFIG = {
  product: {
    width: 800,
    height: 800,
    quality: 85,
  },
  thumbnail: {
    width: 200,
    height: 200,
    quality: 75,
  },
  avatar: {
    width: 150,
    height: 150,
    quality: 80,
  },
};