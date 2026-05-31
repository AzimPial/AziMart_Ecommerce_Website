import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(user)));
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, phone, dateOfBirth, gender } = body;

    await dbConnect();
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { firstName, lastName, phone, dateOfBirth, gender },
      { new: true }
    ).lean();

    return NextResponse.json(JSON.parse(JSON.stringify(user)));
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}