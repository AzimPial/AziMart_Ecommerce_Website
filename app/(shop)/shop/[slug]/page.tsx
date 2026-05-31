import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const HAS_MONGODB = !!process.env.MONGODB_URI;

async function getProduct(slug: string) {
  if (!HAS_MONGODB) return null;
  try {
    await dbConnect();
    const product = await Product.findOne({ slug })
      .populate("category")
      .lean();

    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch {
    return null;
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

async function getRelatedProducts(categoryId: string, excludeId: string) {
  if (!HAS_MONGODB) return [];
  try {
    await dbConnect();
    const products = await Product.find({
      category: categoryId,
      _id: { $ne: excludeId },
      inStock: true,
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
    product.category ? getRelatedProducts(product.category._id, product._id) : [],
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
          numReviews={product.numReviews}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}