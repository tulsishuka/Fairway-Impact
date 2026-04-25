
/* eslint-disable no-undef */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Subscription = () => {
  const [plan, setPlan] = useState("monthly");
  const navigate = useNavigate();

  const plans = {
    monthly: {
      price: 499,
      label: "Monthly Plan",
      desc: "Billed every month. Cancel anytime.",
    },
    yearly: {
      price: 4999,
      label: "Yearly Plan",
      desc: "Save more with yearly subscription.",
    },
  };

  const makePayment = async (selectedPlan) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ STEP 1: LOGIN CHECK
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const amount = plans[selectedPlan].price;

      console.log("👉 Payment started");

      // ✅ STEP 2: CREATE ORDER (NO userId)
      const { data } = await createOrder({
        amount,
        plan: selectedPlan,
      });

      console.log("👉 Backend response:", data);

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Digital Heroes",
        order_id: data.order.id,

        handler: async function (response) {
          console.log("👉 Payment Success:", response);

          // ✅ STEP 3: VERIFY PAYMENT WITH TOKEN
          const verifyRes = await fetch(
            "http://localhost:3000/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
              },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment Successful 🎉");

            // ✅ REDIRECT
            navigate("/Charity");
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-10">Choose Your Plan</h1>

      <div className="flex gap-6">

        {/* MONTHLY */}
        <div
          onClick={() => setPlan("monthly")}
          className={`cursor-pointer p-6 w-72 rounded-2xl shadow-lg border 
          ${plan === "monthly" ? "border-black bg-white" : "bg-white/70"}`}
        >
          <h2 className="text-xl font-bold">{plans.monthly.label}</h2>
          <p className="text-gray-500 mt-2">{plans.monthly.desc}</p>
          <p className="text-2xl font-bold mt-4">₹{plans.monthly.price}</p>

          {plan === "monthly" && (
            <p className="text-green-600 mt-2">Selected ✔</p>
          )}
        </div>

        {/* YEARLY */}
        <div
          onClick={() => setPlan("yearly")}
          className={`cursor-pointer p-6 w-72 rounded-2xl shadow-lg border 
          ${plan === "yearly" ? "border-black bg-white" : "bg-white/70"}`}
        >
          <h2 className="text-xl font-bold">{plans.yearly.label}</h2>
          <p className="text-gray-500 mt-2">{plans.yearly.desc}</p>
          <p className="text-2xl font-bold mt-4">₹{plans.yearly.price}</p>

          {plan === "yearly" && (
            <p className="text-green-600 mt-2">Selected ✔</p>
          )}
        </div>

      </div>

      <button
        onClick={() => makePayment(plan)}
        className="mt-10 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
      >
        Pay for {plan === "monthly" ? "Monthly" : "Yearly"}
      </button>
    </div>
  );
};

export default Subscription;







