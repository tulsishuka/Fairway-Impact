
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Subscription = () => {
  const [plan, setPlan] = useState("monthly");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const razorRef = useRef(null);
  const lockRef = useRef(false);

  const plans = {
    monthly: {
      price: 499,
      label: "Monthly Plan",
      desc: "Perfect for getting started and exploring all features.",
    },

    yearly: {
      price: 4999,
      label: "Yearly Plan",
      desc: "The best value for power users. Save over 15% annually.",
    },
  };

  const makePayment = async (selectedPlan) => {
    // prevent double click
    if (lockRef.current) return;

    // token check
    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    try {
      lockRef.current = true;

      setLoadingPlan(selectedPlan);

      console.log("Initiating payment for:", selectedPlan);

      const amount = plans[selectedPlan].price;

      console.log("Creating order for amount:", amount);

      // create order
      const { data } = await createOrder({
        amount,
        plan: selectedPlan,
      });

      console.log("Order created:", data);

      if (!data?.order?.id) {
        throw new Error("Order ID missing");
      }

      // clear previous instance
      if (razorRef.current) {
        razorRef.current.close?.();
        razorRef.current = null;
      }
console.log("Razorpay instance cleared");
      await new Promise((res) => setTimeout(res, 300));

      const options = {
        key: data.key,

        amount: data.order.amount,

        currency: "INR",

        name: "Digital Heroes",

        order_id: data.order.id,

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },


        theme: {
          color: "#38BDF8",
        },

        modal: {
          ondismiss: function () {
            console.log("Checkout closed");

            setLoadingPlan(null);

            lockRef.current = false;
          },

        },


        handler: async function (response) {
          try {
            console.log("Payment Success Response:", response);

            const verifyRes = await fetch(
              "https://givehope-platform-4.onrender.com/api/payment/verify",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify(response),
              }
            );
console.log("KEY USED IN FRONTEND =>", data.key);
console.log("ORDER ID =>", data.order.id);

            const verifyData = await verifyRes.json();

            console.log("VERIFY RESPONSE:", verifyData);

            if (verifyData.success) {
              alert("Payment Successful 🎉");

              navigate("/charity");
            } else {
              alert(
                verifyData.message || "Payment verification failed"
              );
            }
          } catch (err) {
            console.log("Verification Error:", err);

            alert("Verification failed");
          } finally {
            setLoadingPlan(null);

            lockRef.current = false;
          }
        },
      };



console.log("Razorpay options prepared:", options);
   
      const rzp = new window.Razorpay(options);
console.log(window.Razorpay);
      // payment failed listener
      rzp.on("payment.failed", function (response) {
        console.log("PAYMENT FAILED:", response.error);

        alert(response.error.description);

        setLoadingPlan(null);

        lockRef.current = false;
      });

      razorRef.current = rzp;

      rzp.open();
    } catch (err) {
      console.log("Payment Error:", err);

      alert("Something went wrong");
      
      setLoadingPlan(null);

      lockRef.current = false;
    }
    console.log("makePayment function completed for:", selectedPlan);
    console.log(window.Razorpay);
  };

  return (
    <div className="min-h-screen bg-[#06110D] text-white px-4 py-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Impact{" "}
            <span className="bg-gradient-to-r from-[#39E596] to-[#2B82F6] bg-clip-text text-transparent">
              Precision
            </span>{" "}
            Pricing
          </h1>

          <p className="mt-6 text-[#C9FCE1] text-sm sm:text-base max-w-xl mx-auto leading-7">
            Join an elite community of golfers blending championship
            performance with cinematic social impact.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

          {Object.keys(plans).map((key) => (
            <div
              key={key}
              onClick={() => setPlan(key)}
              className={`relative cursor-pointer rounded-[32px] border p-8 sm:p-10 transition-all duration-300
              ${
                plan === key
                  ? "border-[#74FAC4] bg-[#000000] shadow-[0_0_35px_rgba(74,222,128,0.2)]"
                  : "border-[#74FAC4] bg-[#000000] hover:bg-[#000000]/50"
              }`}
            >

              {key === "yearly" && (
                <div className="absolute top-5 right-5 bg-green-400 text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">
                {plans[key].label}
              </h3>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-extrabold text-[#55DDAA]">
                  ₹{plans[key].price}
                </span>

                <span className="text-gray-500 mb-2 text-sm">
                  /{key === "yearly" ? "year" : "month"}
                </span>
              </div>

              <p className="mt-5 text-[#BDFFDE] leading-7 text-sm">
                {plans[key].desc}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  makePayment(key);
                }}
                disabled={loadingPlan === key}
                className="mt-6 w-full py-3 bg-green-400 text-black font-bold rounded-xl disabled:opacity-50"
              >
                {loadingPlan === key
                  ? "Processing..."
                  : "Pay Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;