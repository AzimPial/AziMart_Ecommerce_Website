import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getProductBySlug, getRelatedProducts, MOCK_PRODUCTS } from "@/lib/mockData";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const HAS_MONGODB = !!process.env.MONGODB_URI;

async function getProduct(slug: string) {
  if (!HAS_MONGODB) {
    return getProductBySlug(slug) || null;
  }
  try {
    await dbConnect();
    const product = await Product.findOne({ slug })
      .populate("category")
      .lean();

    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch {
    return getProductBySlug(slug) || null;
  }
}

async function getProductReviews(productId: string) {
  if (!HAS_MONGODB) return [];
  try {
    await dbConnect();
    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(reviews));
  } catch {
    return [];
  }
}

async function getRelatedProductsData(category: string | { _id: string; name: string }, excludeId: string) {
  if (!HAS_MONGODB) {
    const catName = typeof category === 'string' ? category : category.name;
    return MOCK_PRODUCTS
      .filter(p => {
        const pCat = typeof p.category === 'string' ? p.category : p.category.name;
        return pCat === catName && p._id !== excludeId;
      })
      .slice(0, 4);
  }
  try {
    await dbConnect();
    const catId = typeof category === 'string' ? category : category._id;
    const products = await Product.find({
      category: catId,
      _id: { $ne: excludeId },
    })
      .limit(4)
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [reviews, relatedProducts] = await Promise.all([
    getProductReviews(product._id),
    product.category ? getRelatedProductsData(product.category, product._id) : [],
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductInfo product={product} />

      {/* Reviews */}
      <div className="mt-16">
        <ProductReviews
          reviews={reviews}
          productId={product._id}
          rating={product.rating}
          numReviews={product.reviewCount}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}