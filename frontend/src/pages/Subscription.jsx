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
      desc: "Perfect for getting started and exploring all features.",
    },
    yearly: {
      price: 4999,
      label: "Yearly Plan",
      desc: "The best value for power users. Save over 15% annually.",
    },
  };

  // const makePayment = async (selectedPlan) => {
  //   try {
  //     if (!token) {
  //       alert("Please login first");
  //       navigate("/login");
  //       return;
  //     }

  //     setLoading(true);
  //     const amount = plans[selectedPlan].price;

  //     const { data } = await createOrder({
  //       amount,
  //       plan: selectedPlan,
  //     });

  //     const options = {
  //       key: data.key,
  //       amount: data.order.amount,
  //       currency: "INR",
  //       name: "Digital Heroes",
  //       order_id: data.order.id,

  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await fetch(
  //             "https://givehope-platform-4.onrender.com/api/payment/verify",
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //               body: JSON.stringify(response),
  //             }
  //           );

  //           const verifyData = await verifyRes.json();

  //           if (verifyData.success) {
  //             alert("Payment Successful 🎉");
  //             setTimeout(() => {
  //               navigate("/charity", { replace: true });
  //             }, 500);
  //           } else {
  //             alert(verifyData.message || "Payment failed");
  //           }
  //         } catch (err) {
  //           alert("Verification error");
  //         }
  //       },
  //     };

  //     const razor = new window.Razorpay(options);
  //     razor.open();
  //   } catch (err) {
  //     console.log(err);
  //     alert(err?.response?.data?.message || "Payment failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const makePayment = async (selectedPlan) => {
  if (loading) return;

  try {
    setLoading(true);

    const amount = plans[selectedPlan].price;
    const { data } = await createOrder({ amount, plan: selectedPlan });

    if (!data?.order?.id) throw new Error("Order ID missing");

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: "INR",
      name: "Digital Heroes",   // 🔥 REQUIRED for stability
      order_id: data.order.id,

      handler: async function (response) {
        try {
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

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment Successful 🎉");
            navigate("/charity", { replace: true });
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          console.log(err);
          alert("Verification error");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};


  return (


    <div className="min-h-screen bg-[#06110D] text-white px-4 py-6 flex items-center justify-center overflow-hidden">

  <div className="w-full max-w-7xl flex flex-col items-center">

    {/* HEADING */}
    <div className="text-center mb-16">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
        Impact{" "}
        <span className="text-[#38BDF8]">
          Precision
        </span>{" "}
        Pricing
      </h1>

      <p className="mt-6 text-[#C9FCE1] text-sm sm:text-base max-w-2xl mx-auto leading-7">
        Join an elite community of golfers blending championship
        performance with cinematic social impact. Choose your tier
        of influence.
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

          {/* MOST POPULAR */}
          {key === "yearly" && (
            <div className="absolute top-5 right-5 bg-green-400 text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
              MOST POPULAR
            </div>
          )}

          {/* TITLE */}
          <h3
            className={`text-2xl font-bold ${
              plan === key
                ? "text-white/90"
                : "text-white"
            }`}
          >
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

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-green-400 flex items-center justify-center text-xs text-green-400">
                ✓
              </div>

              <p className="text-[#BDFFDE] text-sm">
                Standard Jackpot Access
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-green-400 flex items-center justify-center text-xs text-green-400">
                ✓
              </div>

              <p className="text-[#BDFFDE] text-sm">
                Premium Analytics Dashboard
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-green-400 flex items-center justify-center text-xs text-green-400">
                ✓
              </div>

              <p className="text-[#BDFFDE] text-sm">
                Priority Community Access
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => makePayment(key)}
            disabled={loading}
            className={`mt-12 w-full py-4 rounded-2xl font-bold transition-all duration-300

            ${
              plan === key
                ? "bg-green-400 hover:bg-green-300 text-black shadow-[0_0_25px_rgba(74,222,128,0.3)]"
                : "border border-green-400/20 text-green-300 hover:bg-green-400/10"
            }`}
          >
            {loading
              ? "Processing..."
              : key === "monthly"
              ? "Start Pro Trial"
              : "Go Elite Now"}
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


  );
};


export default Subscription;

