import { ShopClient } from "@/components/shop/ShopClient";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sort?: string;
  page?: string;
}

const HAS_MONGODB = !!process.env.MONGODB_URI;

async function getProducts(searchParams: SearchParams) {
  if (!HAS_MONGODB) {
    let products = [...MOCK_PRODUCTS];
    
    // Apply filters to mock data
    if (searchParams.category) {
      products = products.filter(p => {
        const cat = typeof p.category === 'string' ? p.category : p.category.name;
        return cat.toLowerCase() === searchParams.category!.toLowerCase();
      });
    }
    
    if (searchParams.minPrice) {
      const min = Number(searchParams.minPrice);
      products = products.filter(p => p.salePrice || p.price >= min);
    }
    
    if (searchParams.maxPrice) {
      const max = Number(searchParams.maxPrice);
      products = products.filter(p => (p.salePrice || p.price) <= max);
    }
    
    if (searchParams.q) {
      const q = searchParams.q.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    // Sort
    if (searchParams.sort === "price-asc") {
      products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (searchParams.sort === "price-desc") {
      products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (searchParams.sort === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }
    
    const page = Number(searchParams.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const paginatedProducts = products.slice(skip, skip + limit);
    
    return { 
      products: paginatedProducts, 
      totalProducts: products.length, 
      totalPages: Math.ceil(products.length / limit), 
      currentPage: page 
    };
  }
  try {
    await dbConnect();

    const page = Number(searchParams.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (searchParams.q) {
      query.$text = { $search: searchParams.q };
    }

    if (searchParams.category) {
      query["category.slug"] = searchParams.category;
    }

    if (searchParams.minPrice || searchParams.maxPrice) {
      (query as any).price = {};
      if (searchParams.minPrice) (query as any).price.$gte = Number(searchParams.minPrice);
      if (searchParams.maxPrice) (query as any).price.$lte = Number(searchParams.maxPrice);
    }

    if (searchParams.inStock === "true") {
      query.inStock = true;
    }

    const sortOptions: Record<string, unknown> = {};
    switch (searchParams.sort) {
      case "price-asc":
        sortOptions.price = 1;
        break;
      case "price-desc":
        sortOptions.price = -1;
        break;
      case "rating":
        sortOptions.rating = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions as Record<string, 1 | -1>)
        .skip(skip)
        .limit(limit)
        .populate("category")
        .lean(),
      Product.countDocuments(query),
    ]);

    return {
      products: JSON.parse(JSON.stringify(products)),
      totalProducts: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch {
    return { products: [], totalProducts: 0, totalPages: 0, currentPage: 1 };
  }
}

async function getCategories() {
  if (!HAS_MONGODB) return MOCK_CATEGORIES;
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return JSON.parse(JSON.stringify(categories));
  } catch {
    return MOCK_CATEGORIES;
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [shopData, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  return (
    <ShopClient
      products={shopData.products}
      categories={categories}
      totalProducts={shopData.totalProducts}
      totalPages={shopData.totalPages}
    />
  );
}