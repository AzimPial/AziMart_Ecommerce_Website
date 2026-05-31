import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const order = await Order.findOne({ _id: id, user: session.user.id }).lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(order)));
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}