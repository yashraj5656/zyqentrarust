import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // 1️⃣ Connect to DB
    try {
      await connectDB();
      console.log("✅ MongoDB connected");
    } catch (dbErr) {
      console.error("❌ MongoDB connection error:", dbErr);
      return new Response(
        JSON.stringify({ error: "Database connection failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2️⃣ Parse body
    let body;
    try {
      body = await req.json();
      console.log("Login request body:", body);
    } catch (parseErr) {
      console.error("❌ Body parse error:", parseErr);
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    console.log("Attempting login for:", cleanEmail);
    
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      console.log("❌ User not found for email:", cleanEmail);
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4️⃣ Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("❌ Invalid password for user:", email);
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5️⃣ JWT
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let token;
    try {
      token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    } catch (jwtErr) {
      console.error("❌ JWT signing error:", jwtErr);
      return new Response(
        JSON.stringify({ error: "Token generation failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6️⃣ Send response
    const { password: _, ...userData } = user.toObject();
    return new Response(
      JSON.stringify({ message: "Login success", user: { ...userData, subscribed: user.subscribed }, token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Unexpected login error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
