import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { OrderItem, IOrderDocument } from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(JSON.parse(JSON.stringify(orders)));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    await dbConnect();

    const orderItems: OrderItem[] = items.map((item: {
      productId: string;
      name: string;
      price: number;
      qty: number;
      size?: string;
    }) => ({
      product: item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty,
      size: item.size,
    }));

    const subtotal = items.reduce(
      (sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty,
      0
    );
    const shipping = subtotal >= 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const order = new Order({
      user: session.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost: shipping,
      tax,
      total,
      status: "pending",
    });

    await order.save();

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}