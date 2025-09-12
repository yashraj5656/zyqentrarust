"use client";
import { useState } from "react";

export default function SubscribePlans() {
  const [loading, setLoading] = useState(false);

  // Two subscription plans
  const plans = [
    {
      name: "Full Access",
      amount: 499, // INR
      currency: "INR",
      description:
        "The world of code is quiet… but those who master Rust shape it. Will you?",
    },
    {
      name: "Full Access",
      amount: 9.99, // USD
      currency: "USD",
      description:
        "The world of code is quiet… but those who master Rust shape it. Will you?",
    },
  ];

  const handleSubscribe = async (plan) => {
    try {
      setLoading(true);

      // Create order on server
      const res = await fetch(`/api/create-order?currency=${plan.currency}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.amount }),
      });

      const order = await res.json();

      // Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Rust Learning ",
        description: `Subscription ${plan.currency} ${plan.amount}`,
        order_id: order.id,
        handler: function (response) {
          alert(
            `Payment successful! ID: ${response.razorpay_payment_id}`
          );
          localStorage.setItem("subscribed", "true"); // unlock content
        },
        theme: { color: "#00cba9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hasa" style={{marginRight:"1.7rem"}}>
      {loading ? 
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
</div> : ""}
      <div className="sub-wrapper">
        {plans.map((plan, idx) => (
          <div className="sub-card" key={idx}>
            <div className="sub-header">
              <h3 className="sub-name" data-text={plan.name}>
                {plan.name}
              </h3>
            </div>
            
            <div className="sub-body">
              <p className="sub-des">{plan.description}</p>
              <p
                className="sub-amo"
                data-text={
                  plan.currency === "INR"
                    ? `₹${plan.amount}`
                    : `$${plan.amount}`
                }
              >
                {plan.currency === "INR"
                  ? `₹${plan.amount}`
                  : `$${plan.amount}`}
              </p>

              {/* ✅ Features list */}
              <ul className="sub-list">
                <li className="sub-item">
                  <span className="check">✔</span> Unlock All Lessons
                </li>
                <li className="sub-item">
                  <span className="check">✔</span> Become a Rust Pro
                </li>
                <li className="sub-item">
                  <span className="check">✔</span> Certification
                </li>
              </ul>

              {/* ✅ Button */}
              <button
                data-text="Subscribe Now"
                onClick={() => handleSubscribe(plan)}
                disabled={loading}
              >
                {loading ? "Processing..." : <span>Subscribe Now</span>}
              </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
