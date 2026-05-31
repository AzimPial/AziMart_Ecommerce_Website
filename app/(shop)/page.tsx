import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoSection } from "@/components/home/PromoSection";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

// Check if MongoDB URI is available
const HAS_MONGODB = !!process.env.MONGODB_URI;

async function getFeaturedProducts() {
  if (!HAS_MONGODB) return [];
  try {
    await dbConnect();
    return Product.find({ isFeatured: true, inStock: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category")
      .lean();
  } catch {
    return [];
  }
}

async function getNewArrivals() {
  if (!HAS_MONGODB) return [];
  try {
    await dbConnect();
    return Product.find({ isNew: true, inStock: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
  } catch {
    return [];
  }
}

async function getCategories() {
  if (!HAS_MONGODB) return [];
  try {
    await dbConnect();
    return Category.find({ isActive: true })
      .sort({ order: 1 })
      .limit(6)
      .lean();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, newArrivals, categories] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getCategories(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={JSON.parse(JSON.stringify(featuredProducts))} />
      <CategoryGrid categories={JSON.parse(JSON.stringify(categories))} />
      <NewArrivals products={JSON.parse(JSON.stringify(newArrivals))} />
      <PromoSection />
    </>
  );
}