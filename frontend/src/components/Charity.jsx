
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Charity = () => {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const charityImages = {
    "Education For All": "/images/education.webp",
    "Happy Childhood Trust": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    "Village Growth Mission": "/images/village.webp",
    "Green Earth Initiative": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    "Food For All": "/images/hungry.webp",
    "Women Rise Foundation": "/women edu.webp"
  };

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await axios.get("https://givehope-platform-4.onrender.com/api/charity");
        setCharities(res.data.data || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchCharities();
  }, []);

  const handleSelect = (charity) => {
    setSelected(charity);
    setSaved(false);
  };

  const saveCharity = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { alert("Please login first"); return; }
      if (!selected) { alert("Select a charity first"); return; }

      setLoading(true);
      await axios.post(
        "https://givehope-platform-4.onrender.com/api/charity/select",
        { charityId: selected._id, percentage: selected.percentage || 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSaved(true);
      alert("Charity saved successfully ❤️");
      setTimeout(() => navigate("/dashboard", { replace: true }), 500);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B3E]  py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-white font-bold tracking-widest uppercase text-sm">Make an Impact</span>
          <h1 className="text-6xl font-black text-white mt-2 mb-6">
            Choose Your Cause 
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every selection counts. Choose the mission that aligns with your values and help us build a better world.
          </p>
        </div>

        <div className="space-y-32">
          {charities.length > 0 ? (
            charities.map((c, index) => (
              <div
                key={c._id}
                onClick={() => handleSelect(c)}
                className={`group flex flex-col md:items-center gap-12 transition-all duration-700 cursor-pointer
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} 
                ${selected?._id === c._id ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {/* Image Container with Hover Effect */}
                <div className="w-full md:w-1/2 relative">
                  <div className={`absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 ${selected?._id === c._id ? "opacity-60" : ""}`}></div>
                  <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-white aspect-[4/3]">
                    <img
                      src={charityImages[c.name] || "https://images.unsplash.com/photo-1469571486040-0bd501b6693e?auto=format&fit=crop&w=1000&q=80"}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {selected?._id === c._id && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-[2px]">
                         <div className="bg-white/90 p-4 rounded-full shadow-xl">
                            <span className="text-3xl">✅</span>
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-black uppercase tracking-wider">
                    {c.percentage}% Allocation
                  </div>
                  <h2 className="text-4xl font-black text-slate-800 group-hover:text-green-600 transition-colors">
                    {c.name}
                  </h2>
                  <p className="text-slate-500 text-xl leading-relaxed font-medium">
                    {c.description}
                  </p>
                  
                  <div className={`h-1 w-20 transition-all duration-500 rounded-full 
                    ${selected?._id === c._id ? "w-full bg-green-500" : "bg-slate-300 group-hover:w-40"}`}>
                  </div>

                  <p className={`text-lg font-bold transition-all duration-300 ${selected?._id === c._id ? "text-green-600" : "text-slate-400"}`}>
                    {selected?._id === c._id ? "Selection Confirmed" : "Click to Select Cause"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200">
              <p className="text-slate-400 text-lg font-medium italic">Fetching available charities...</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-10 mt-24 flex flex-col items-center z-50">
          <button
            onClick={saveCharity}
            disabled={loading}
            className={`group relative px-10 py-5 rounded-2xl text-xl font-black tracking-tighter shadow-2xl transition-all active:scale-95
            ${loading ? "bg-slate-400" : "bg-slate-900 text-white hover:bg-black hover:-translate-y-2"}`}
          >
            <span className="relative z-10 flex items-center gap-2 text-green-500">
              {loading ? "SAVING..." : "CONFIRM DONATION CHOICE"}
              {!loading && <span className="group-hover:translate-x-2 transition-transform">→</span>}
            </span>
            <div className="absolute inset-0 bg-green-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </button>
          
          {saved && (
            <div className="mt-6 animate-bounce bg-white px-8 py-3 rounded-2xl shadow-xl border border-green-500 text-green-600 font-black">
              SUCCESSFULLY SAVED ❤️
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charity;