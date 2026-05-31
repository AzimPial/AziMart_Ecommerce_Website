import { notFound } from "next/navigation";
import Image from "next/image";
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

async function getProduct(slug: string) {
  await dbConnect();
  const product = await Product.findOne({ slug })
    .populate("category")
    .lean();

  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}

async function getProductReviews(productId: string) {
  await dbConnect();
  const reviews = await Review.find({ product: productId })
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(reviews));
}

async function getRelatedProducts(categoryId: string, excludeId: string) {
  await dbConnect();
  const products = await Product.find({
    category: categoryId,
    _id: { $ne: excludeId },
    inStock: true,
  })
    .limit(4)
    .lean();

  return JSON.parse(JSON.stringify(products));
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
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p: typeof product) => (
              <a key={p._id} href={`/shop/${p.slug}`} className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                  {p.images[0] && (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-medium group-hover:text-highlight transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <p className="font-semibold mt-1">${p.price}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}