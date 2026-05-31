import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoSection } from "@/components/home/PromoSection";
import { 
  getFeaturedProducts, 
  getNewArrivals, 
  getProductsByCategory 
} from "@/lib/mockData";

// Use mock data when no MongoDB is connected
const USE_MOCK = !process.env.MONGODB_URI;

async function getHomeData() {
  if (USE_MOCK) {
    return {
      featuredProducts: getFeaturedProducts(),
      newArrivals: getNewArrivals(),
      categories: [
        { _id: "1", name: "Running", slug: "running", image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800", description: "Premium running shoes", order: 1 },
        { _id: "2", name: "Basketball", slug: "basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800", description: "Court domination", order: 2 },
        { _id: "3", name: "Casual", slug: "casual", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800", description: "Everyday comfort", order: 3 },
        { _id: "4", name: "Street", slug: "street", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", description: "Urban style", order: 4 },
      ] as const,
    };
  }

  // MongoDB fetch logic
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Product = (await import("@/models/Product")).default;
    const Category = (await import("@/models/Category")).default;

    await dbConnect();
    
    const [featuredProducts, newArrivals, categories] = await Promise.all([
      Product.find({ featured: true, inStock: true }).sort({ createdAt: -1 }).limit(8).lean(),
      Product.find({ isNew: true, inStock: true }).sort({ createdAt: -1 }).limit(5).lean(),
      Category.find({ isActive: true }).sort({ order: 1 }).limit(4).lean(),
    ]);

    return {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      newArrivals: JSON.parse(JSON.stringify(newArrivals)),
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch {
    return {
      featuredProducts: getFeaturedProducts(),
      newArrivals: getNewArrivals(),
      categories: [
        { _id: "1", name: "Running", slug: "running", image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800", description: "Premium running shoes", order: 1 },
        { _id: "2", name: "Basketball", slug: "basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800", description: "Court domination", order: 2 },
        { _id: "3", name: "Casual", slug: "casual", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800", description: "Everyday comfort", order: 3 },
        { _id: "4", name: "Street", slug: "street", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", description: "Urban style", order: 4 },
      ] as const,
    };
  }
}

export default async function HomePage() {
  const { featuredProducts, newArrivals, categories } = await getHomeData();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoryGrid categories={categories} />
      <NewArrivals products={newArrivals} />
      <PromoSection />
    </>
  );
}