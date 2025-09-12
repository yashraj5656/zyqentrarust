"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

// AuthContext.js
const login = async (email, password) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error || "Login failed" };
    }

    localStorage.setItem("token", data.token);
    setUser({ email: data.user.email, subscribed: data.user.subscribed });

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login failed:", error.message);
    return { success: false, message: error.message };
  }
};

const signup = async (email, password) => {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error || "Signup failed" };
    }

    localStorage.setItem("token", data.token);
    setUser({ email: data.user.email, subscribed: data.user.subscribed });

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.error("Signup failed:", error.message);
    return { success: false, message: error.message };
  }
};


  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ideally, fetch user info from backend using token
      // For now, placeholder (you can replace with actual fetch)
      setUser({ email: "session@restored.com", subscribed: false });
    }
  }, []);

  // ✅ Update subscription status (after payment)
  const updateSubscription = (status = true) => {
    setUser((prev) => prev ? { ...prev, subscribed: status } : null);
  };

  const verifyPayment = async (paymentData) => {
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
  
      const data = await res.json();
  
      if (res.ok && data.subscribed) {
        setUser((prev) => ({
          ...prev,
          subscribed: true,
          rzp_checkout_anon_id: data.rzp_checkout_anon_id,
          rzp_device_id: data.rzp_device_id,
          rzp_stored_checkout_id: data.rzp_stored_checkout_id,
        }));
  
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Payment verification failed:", err);
      return { success: false, message: "Payment verification error" };
    }
  };
  
  

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateSubscription, verifyPayment }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
