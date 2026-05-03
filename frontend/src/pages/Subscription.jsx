/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Subscription = () => {
  const [plan, setPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const plans = {
    monthly: {
      price: 499,
      label: "Monthly Plan",
      desc: "Billed every month",
    },
    yearly: {
      price: 4999,
      label: "Yearly Plan",
      desc: "Save more with yearly subscription",
    },
  };

  // 💳 PAYMENT
  const makePayment = async (selectedPlan) => {
    try {
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      setLoading(true);

      const amount = plans[selectedPlan].price;

      const { data } = await createOrder({
        amount,
        plan: selectedPlan,
      });

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Digital Heroes",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful 🎉");

              setTimeout(() => {
                navigate("/charity", { replace: true });
              }, 500);
            } else {
              alert(verifyData.message || "Payment failed");
            }
          } catch (err) {
            alert("Verification error");
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-10">
        Choose Your Plan
      </h1>

      <div className="flex gap-6">

        {/* MONTHLY */}
        <div
          onClick={() => setPlan("monthly")}
          className={`cursor-pointer p-6 w-72 rounded-2xl shadow-lg border 
          ${plan === "monthly" ? "border-black bg-white" : "bg-white/70"}`}
        >
          <h2 className="text-xl font-bold">{plans.monthly.label}</h2>
          <p className="text-gray-500 mt-2">{plans.monthly.desc}</p>
          <p className="text-2xl font-bold mt-4">
            ₹{plans.monthly.price}
          </p>

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
          <p className="text-2xl font-bold mt-4">
            ₹{plans.yearly.price}
          </p>

          {plan === "yearly" && (
            <p className="text-green-600 mt-2">Selected ✔</p>
          )}
        </div>
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={() => makePayment(plan)}
        disabled={loading}
        className={`mt-10 px-8 py-3 rounded-xl text-white 
        ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}
      >
        {loading ? "Processing..." : `Pay for ${plan}`}
      </button>

    </div>
  );
};

export default Subscription;