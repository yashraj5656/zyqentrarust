"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { syncLocalStorageToDB } from "@/utils/syncLocalStorage";



const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Save once on page load
    syncLocalStorageToDB();
  
    // Watch for changes to localStorage
    const handleStorageChange = () => {
      syncLocalStorageToDB();
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Restore user’s saved localStorage from DB
  const restoreLocalStorage = async (token) => {
    try {
      const res = await fetch("/api/fetch-localstorage", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.localStorageData) {
          Object.entries(data.localStorageData).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
        }
      }
    } catch (err) {
      console.error("Failed to restore localStorage:", err);
    }
  };

  // ✅ Save current localStorage to DB
  const saveLocalStorage = async (token) => {
    try {
      const localData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "token") {
          localData[key] = localStorage.getItem(key);
        }
      }

      await fetch("/api/save-localstorage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ localStorageData: localData }),
      });
    } catch (err) {
      console.error("Failed to save localStorage:", err);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.error || "Login failed" };

      localStorage.setItem("token", data.token);
      setUser({ email: data.user.email, subscribed: data.user.subscribed });

      // 🔹 Restore saved localStorage after login
      await restoreLocalStorage(data.token);

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login failed:", error.message);
      return { success: false, message: error.message };
    }
  };

  // ✅ Signup
  const signup = async (email, password) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.error || "Signup failed" };

      localStorage.setItem("token", data.token);
      setUser({ email: data.user.email, subscribed: data.user.subscribed });

      // 🔹 Restore saved localStorage after signup
      await restoreLocalStorage(data.token);

      return { success: true, message: "Account created successfully" };
    } catch (error) {
      console.error("Signup failed:", error.message);
      return { success: false, message: error.message };
    }
  };

  // ✅ Logout
  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) await saveLocalStorage(token); // save before logout
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "session@restored.com", subscribed: false });
      restoreLocalStorage(token); // restore localStorage from DB
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
