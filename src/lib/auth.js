import jwt from "jsonwebtoken";
import User from "@/models/User";
import mongoose from "mongoose";

// Connect to MongoDB (if not already connected)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Function to get user from JWT token
export const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return user || null;
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }
};
