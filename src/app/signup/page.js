"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext"; 
import { useRouter } from "next/navigation";

export default function LoginSignup() {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ loader state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ show loader
    try {
      if (isLogin) {
        const { success, message } = await login(formData.email, formData.password);
        if (success) {
          alert("✅ Login successful!");
          router.push("/");
        } else {
          alert(`❌ Login failed: ${message}`);
        }
      } else {
        const { success, message } = await signup(formData.email, formData.password);
        if (success) {
          alert("🎉 Account created successfully!");
          router.push("/");
        } else {
          alert(`❌ Signup failed: ${message}`);
        }
      }
    } catch (err) {
      console.error("Auth failed:", err);
      alert("❌ Something went wrong. Check console.");
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className="glitch-form-wrapper min-h-screen flex items-center justify-center relative">
      
      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="banter-loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        </div>
      )}

      <form className="glitch-card" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="card-header">
          <div className="card-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z" />
            </svg>
            <span>{isLogin ? "SECURE_LOGIN" : "CREATE_ACCOUNT"}</span>
          </div>
          <div className="card-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder=""
            />
            <label htmlFor="email" className="form-label" data-text="email">
              email
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              placeholder=""
            />
            <label
              htmlFor="password"
              className="form-label"
              data-text="ACCESS_KEY"
            >
              ACCESS_KEY
            </label>
          </div>

          <button
            data-text={isLogin ? "INITIATE_CONNECTION" : "REGISTER_ACCOUNT"}
            type="submit"
            className="submit-btn"
            disabled={loading} // ✅ prevent double submit
          >
            <span className="btn-text">
              {isLogin ? "INITIATE_CONNECTION" : "REGISTER_ACCOUNT"}
            </span>
          </button>

          <div className="card-footer">
            <button
              type="button"
              className="switch-btn"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading} // ✅ disable while loading
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
