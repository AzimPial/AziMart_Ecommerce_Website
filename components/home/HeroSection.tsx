"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="AziMart Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-highlight text-white text-sm font-medium rounded-full mb-4">
            New Collection 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Move Forward
            <br />
            <span className="text-highlight">With Confidence</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-md">
            Discover our premium collection of footwear and apparel designed for those who lead the way.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button size="lg" variant="highlight">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/shop?category=new-arrivals">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse-once" />
        </div>
      </div>
    </section>
  );
}