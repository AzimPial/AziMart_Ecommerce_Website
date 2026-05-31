import { ShopClient } from "@/components/shop/ShopClient";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sort?: string;
  page?: string;
}

async function getProducts(searchParams: SearchParams) {
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
    query.price = {};
    if (searchParams.minPrice) query.price.$gte = Number(searchParams.minPrice);
    if (searchParams.maxPrice) query.price.$lte = Number(searchParams.maxPrice);
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
      .sort(sortOptions)
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
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(categories));
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