import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PromoSection() {
  return (
    <>
      {/* Banner */}
      <section className="py-16 container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-highlight text-white text-sm font-medium rounded-full mb-4">
                Limited Time
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Summer Sale Up to 50% Off
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Don&apos;t miss out on our biggest sale of the season. Premium footwear at unbeatable prices.
              </p>
              <Link href="/shop?sale=true">
                <Button variant="highlight" size="lg">
                  Shop the Sale
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}