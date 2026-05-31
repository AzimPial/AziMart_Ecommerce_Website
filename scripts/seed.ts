import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import User from "@/models/User";
import Coupon from "@/models/Coupon";
import { hash } from "bcryptjs";

const categories = [
  { name: "Electronics", slug: "electronics", description: "Latest gadgets and electronics", icon: "Smartphone" },
  { name: "Fashion", slug: "fashion", description: "Trendy clothing and accessories", icon: "Shirt" },
  { name: "Home& Garden", slug: "home-garden", description: "Everything for your home", icon: "Home" },
  { name: "Sports", slug: "sports", description: "Sports equipment and gear", icon: "Dumbbell" },
  { name: "Beauty", slug: "beauty", description: "Beauty and skincare products", icon: "Sparkles" },
  { name: "Books", slug: "books", description: "Books, e-books and more", icon: "BookOpen" },
];

const products = [
  {
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The most powerful iPhone ever with A17 Pro chip",
    price: 1199,
    comparePrice: 1299,
    sku: "IPH15PM256",
    category: "electronics",
    tags: ["smartphone", "apple", "5g"],
    images: ["/images/products/iphone-15.jpg"],
    stock: 50,
    rating: 4.8,
    reviewCount: 1247,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "AI-powered smartphone with S Pen included",
    price: 1099,
    comparePrice: 1199,
    sku: "SAMS24U256",
    category: "electronics",
    tags: ["smartphone", "samsung", "android"],
    images: ["/images/products/galaxy-s24.jpg"],
    stock: 35,
    rating: 4.7,
    reviewCount: 892,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "MacBook Pro 14\"",
    slug: "macbook-pro-14",
    description: "M3 Pro chip, 18GB RAM, 512GB SSD",
    price: 1999,
    comparePrice: 2199,
    sku: "MBP14M3P",
    category: "electronics",
    tags: ["laptop", "apple", "macbook"],
    images: ["/images/products/macbook-pro.jpg"],
    stock: 25,
    rating: 4.9,
    reviewCount: 2341,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    description: "Max Air unit for cushioned comfort",
    price: 150,
    comparePrice: 170,
    sku: "NAM270BLK",
    category: "fashion",
    tags: ["shoes", "nike", "sneakers"],
    images: ["/images/products/air-max.jpg"],
    stock: 100,
    rating: 4.6,
    reviewCount: 3421,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Levi's 501 Original Jeans",
    slug: "levis-501-original-jeans",
    description: "The original button fly jeans",
    price: 69,
    sku: "LV501ORG",
    category: "fashion",
    tags: ["jeans", "levis", "denim"],
    images: ["/images/products/levis-jeans.jpg"],
    stock: 200,
    rating: 4.5,
    reviewCount: 5678,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Dyson V15 Detect",
    slug: "dyson-v15-detect",
    description: "Cordless vacuum with laser dust detection",
    price: 749,
    comparePrice: 849,
    sku: "DYV15DET",
    category: "home-garden",
    tags: ["vacuum", "dyson", "cordless"],
    images: ["/images/products/dyson-v15.jpg"],
    stock: 40,
    rating: 4.8,
    reviewCount: 1234,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Instant Pot Duo 7-in-1",
    slug: "instant-pot-duo",
    description: "Electric pressure cooker, slow cooker, and more",
    price: 89,
    comparePrice: 99,
    sku: "IPDUO7IN1",
    category: "home-garden",
    tags: ["pressure cooker", "instant pot", "kitchen"],
    images: ["/images/products/instant-pot.jpg"],
    stock: 150,
    rating: 4.7,
    reviewCount: 8901,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise canceling headphones",
    price: 349,
    comparePrice: 399,
    sku: "SNYWHXM5",
    category: "electronics",
    tags: ["headphones", "sony", "noise canceling"],
    images: ["/images/products/sony-xm5.jpg"],
    stock: 75,
    rating: 4.8,
    reviewCount: 4567,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Adidas Ultraboost 23",
    slug: "adidas-ultraboost-23",
    description: "Responsive cushioning for running",
    price: 190,
    sku: "ADDUB23",
    category: "sports",
    tags: ["running", "adidas", "sneakers"],
    images: ["/images/products/ultraboost.jpg"],
    stock: 80,
    rating: 4.6,
    reviewCount: 2345,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Peloton Bike+",
    slug: "peloton-bike-plus",
    description: "Premium indoor cycling with auto-follow",
    price: 2495,
    comparePrice: 2795,
    sku: "PLTBIKEPLUS",
    category: "sports",
    tags: ["cycling", "peloton", "fitness"],
    images: ["/images/products/peloton.jpg"],
    stock: 15,
    rating: 4.5,
    reviewCount: 678,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "La Mer Moisturizing Cream",
    slug: "la-mer-cream",
    description: "Luxury face cream with cell-renewing energy",
    price: 190,
    sku: "LMCRM30",
    category: "beauty",
    tags: ["skincare", "luxury", "moisturizer"],
    images: ["/images/products/la-mer.jpg"],
    stock: 60,
    rating: 4.7,
    reviewCount: 1234,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "The Alchemist by Paulo Coelho",
    slug: "the-alchemist",
    description: "A magical story about following your dreams",
    price: 15,
    comparePrice: 18,
    sku: "BKALCHEMIST",
    category: "books",
    tags: ["fiction", "bestseller", "inspirational"],
    images: ["/images/products/alchemist.jpg"],
    stock: 500,
    rating: 4.5,
    reviewCount: 23456,
    isFeatured: false,
    isActive: true,
  },
];

const coupons = [
  { code: "WELCOME10", discountType: "percentage", discountValue: 10, minOrderValue: 50, usageLimit: 1000 },
  { code: "SAVE20", discountType: "percentage", discountValue: 20, minOrderValue: 100, usageLimit: 500 },
  { code: "FLAT50", discountType: "fixed", discountValue: 50, minOrderValue: 200, usageLimit: 200 },
  { code: "FREESHIP", discountType: "freeShipping", discountValue: 0, minOrderValue: 100, usageLimit: 1000 },
];

async function seed() {
  try {
    console.log("🔄 Connecting to database...");
    await dbConnect();
    console.log("✅ Connected to database");

    // Clear existing data
    console.log("🗑️ Clearing existing data...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Coupon.deleteMany({});

    // Seed categories
    console.log("📁 Seeding categories...");
    const createdCategories = await Category.insertMany(
      categories.map((cat) => ({
        ...cat,
        image: `/images/categories/${cat.slug}.jpg`,
      }))
    );
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create category map
    const categoryMap = createdCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat._id;
      return acc;
    }, {} as Record<string, any>);

    // Seed products
    console.log("📦 Seeding products...");
    const productsWithCategories = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Seed admin user
    console.log("👤 Seeding admin user...");
    const hashedPassword = await hash("admin123", 12);
    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@azimart.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Created admin user (admin@azimart.com / admin123)");

    // Seed test user
    console.log("👤 Seeding test user...");
    const testPassword = await hash("user123", 12);
    await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: testPassword,
      role: "customer",
    });
    console.log("✅ Created test user (john@example.com / user123)");

    // Seed coupons
    console.log("🎟️ Seeding coupons...");
    await Coupon.insertMany(coupons);
    console.log(`✅ Created ${coupons.length} coupons`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nTest credentials:");
    console.log("  Admin: admin@azimart.com / admin123");
    console.log("  User: john@example.com / user123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();