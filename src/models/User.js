import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    username: { type: String, trim: true },
    subscribed: { type: Boolean, default: false },

    // Razorpay identifiers
    rzp_checkout_anon_id: { type: String, default: null },
    rzp_device_id: { type: String, default: null },
    rzp_stored_checkout_id: { type: String, default: null },

    // Store localStorage data as JSON
    localStorageData: { type: mongoose.Schema.Types.Mixed, default: {} }, 
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
