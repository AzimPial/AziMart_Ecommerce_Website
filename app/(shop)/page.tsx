import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoSection } from "@/components/home/PromoSection";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

async function getFeaturedProducts() {
  await dbConnect();
  return Product.find({ isFeatured: true, inStock: true })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate("category")
    .lean();
}

async function getNewArrivals() {
  await dbConnect();
  return Product.find({ isNew: true, inStock: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
}

async function getCategories() {
  await dbConnect();
  return Category.find({ isActive: true })
    .sort({ order: 1 })
    .limit(6)
    .lean();
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