"use client";
import { useEffect, useState } from "react";
import SubscribePlans from "@/components/SubscribePlans";
import { useAuth } from "@/components/AuthContext";

export default function Subscribe() {
  const [loaded, setLoaded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { user, verifyPayment } = useAuth();

const handlePaymentSuccess = async (paymentData) => {
  const result = await verifyPayment(paymentData);
  if (result.success) {
    alert("🎉 Subscription activated!");
  } else {
    alert("❌ " + result.message);
  }
};

  // Load current user and subscription status
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setCurrentUser(JSON.parse(stored));
    setSubscribed(localStorage.getItem("subscribed") === "true");
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="">
      <div className="">
        <h1 className="header">
          {subscribed ? "You're Subscribed 🎉" : "Choose a Plan – INR or USD"}
        </h1>

        {subscribed ? (
          <div className="">
            <p className="">
              Thanks for subscribing, <span className="font-semibold">{currentUser?.name || "User"}</span>!
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("subscribed");
                setSubscribed(false);
              }}
              className=""
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <SubscribePlans />
        )}

        {loadingPayment && (
          <p className="">
            Processing your payment...
          </p>
        )}
      </div>
    </main>
  );
}
