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

  // 💳 PAYMENT LOGIC (Unchanged)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050B3E] p-3 font-sans text-white">

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
                <div className="hidden md:flex flex-col items-start space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Unlock <span className="text-green-400">Premium</span> <br /> Access Today.
          </h1>
          <p className="text-blue-100/70 text-lg max-w-sm">
            Join the elite community of Digital Heroes. Secure payments, instant access, and 24/7 support.
          </p>
         
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-8 md:hidden text-center">Choose Your Plan</h2>
          
          <div className="flex flex-col gap-5">
            {Object.keys(plans).map((key) => (
              <div
                key={key}
                onClick={() => setPlan(key)}
                className={`relative cursor-pointer p-8 rounded-3xl transition-all duration-300 border-2 
                ${plan === key 
                  ? "border-green-400 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(74,222,128,0.2)]" 
                  : "border-white/10 bg-white/5 hover:bg-white/10"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${plan === key ? "text-green-400" : "text-white"}`}>
                      {plans[key].label}
                    </h3>
                    <p className="text-sm text-blue-100/60 mt-1">{plans[key].desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${plan === key ? "border-green-400" : "border-white/30"}`}>
                    {plan === key && <div className="w-3 h-3 bg-green-400 rounded-full" />}
                  </div>
                </div>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹{plans[key].price}</span>
                  <span className="text-blue-100/50 text-sm">/ {key === 'yearly' ? 'year' : 'month'}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => makePayment(plan)}
            disabled={loading}
            className={`mt-10 w-full py-4 rounded-2xl text-lg font-bold transition-all transform active:scale-95 shadow-xl
            ${loading 
              ? "bg-gray-600 cursor-not-allowed opacity-50" 
              : "bg-green-500 hover:bg-green-400 text-[#050B3E] hover:shadow-green-500/20"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#050B3E]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Complete Payment for ${plan.charAt(0).toUpperCase() + plan.slice(1)}`
            )}
          </button>
          
         
        </div>
      </div>
    </div>
  );
};

export default Subscription;