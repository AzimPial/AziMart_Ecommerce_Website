import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    await dbConnect();
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
    }

    return NextResponse.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderValue: coupon.minOrderValue,
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json({ error: "Failed to validate coupon" }, { status: 500 });
  }
}