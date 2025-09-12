import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // ✅ Connect to Mongo
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    // ✅ Validate input
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user with subscribed: false
    const user = await User.create({ email, password: hashed, subscribed: false });

    // ✅ Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env.local");
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Return success with subscribed info
    return Response.json(
      {
        message: "Signup success",
        user: { id: user._id, email: user.email, subscribed: user.subscribed },
        token,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Signup API error:", err.message, err.stack);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
