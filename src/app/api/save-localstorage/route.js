import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    // 🔹 Get token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    // 🔹 Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔹 Parse body
    const body = await req.json();
    const { localStorageData } = body;

    if (!localStorageData) {
      return NextResponse.json({ error: "No data to save" }, { status: 400 });
    }

    // 🔹 Update user’s localStorageData
    await User.findByIdAndUpdate(decoded.id, { localStorageData });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save-localstorage error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
