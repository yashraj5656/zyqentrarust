import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id);

    return NextResponse.json({ localStorageData: user.localStorageData || {} });
  } catch (err) {
    console.error("Fetch-localstorage error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  // 🔑 Make sure you are logged in and have a token in localStorage
const token = localStorage.getItem("token");

if (!token) {
  console.error("⚠️ No token found in localStorage. Please log in first.");
} else {
  fetch("http://localhost:3000/api/fetch-localstorage", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 important
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Response from fetch-localstorage:", data);
    })
    .catch((err) => {
      console.error("❌ Fetch error:", err);
    });
}


}
