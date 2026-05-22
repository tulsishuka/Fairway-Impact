

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  Store, 
  Heart, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  SlidersHorizontal, 
  MapPin,
  Leaf,
  Droplet
} from "lucide-react";

const UserCharity = () => {
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

      loading(true);
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
  

    <div className="min-h-screen bg-[#0A0E0C] text-white flex font-sans selection:bg-[#20E49B] selection:text-black">

  {/* MAIN AREA */}
  <main className="flex-1 pb-24 overflow-y-auto">

    {/* HERO SECTION */}
    <section className="relative min-h-[620px] md:h-[520px] flex items-center px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-gradient-to-b from-[#111A15] to-[#0A0E0C]">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute right-[-10%] top-[-20%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#20E49B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute right-[15%] bottom-[10%] w-[220px] md:w-[400px] h-[220px] md:h-[400px] bg-[#20E49B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(#16221B_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      {/* HERO CONTENT */}
      <div className="max-w-3xl relative z-10 space-y-5 md:space-y-6">

        <div className="inline-flex items-center gap-2 bg-[#1B2D24] border border-[#254234] text-[#20E49B] px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20E49B]" />
          Global Impact Initiative
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-[1.1] text-white">
          Every Swing{" "}
          <span className="text-[#20E49B] italic font-medium">
            Saves Lives.
          </span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
          Fairway Impact bridges the gap between competitive precision and humanitarian aid.
          Your performance on the course fuels clean water initiatives,
          education, and reforestation worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <button className="w-full sm:w-auto px-6 py-3 bg-[#20E49B] hover:bg-[#1BCB89] text-black font-bold rounded-xl transition-all shadow-lg shadow-[#20E49B]/20">
            Explore Charities
          </button>

          <button className="w-full sm:w-auto px-6 py-3 bg-[#161D19] hover:bg-[#1F2923] text-gray-300 font-semibold rounded-xl border border-[#25312A] transition-all">
            Impact Report 2026
          </button>
        </div>
      </div>
    </section>

    {/* CONTENT AREA */}
    <div className="px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto -mt-10 md:-mt-16 relative z-20 space-y-10 md:space-y-12">

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

        {/* CARD 1 */}
        <div className="bg-[#111613] border border-[#1B231E] p-5 sm:p-6 md:p-8 rounded-2xl shadow-md space-y-4">

          <span className="text-[10px] font-bold tracking-widest text-[#20E49B] uppercase">
            Total Ecosystem Contribution
          </span>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white break-words">
              $4,829,102.00
            </h3>

            <p className="text-xs text-[#20E49B] font-medium flex items-center gap-1">
              <span>↗</span> +12.4% from last month
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-[#161D19] text-gray-400 text-xs rounded-lg border border-[#222C27]">
              Clean Water
            </span>

            <span className="px-3 py-1 bg-[#161D19] text-gray-400 text-xs rounded-lg border border-[#222C27]">
              Education
            </span>

            <span className="px-3 py-1 bg-[#161D19] text-gray-400 text-xs rounded-lg border border-[#222C27]">
              Health
            </span>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#111613] border border-[#1B231E] p-5 sm:p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#1B2D24] border border-[#254234] rounded-xl flex items-center justify-center text-[#20E49B]">
            <Leaf size={20} />
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-black text-white tracking-tight">
              1.2M
            </h3>

            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
              Trees Planted
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#111613] border border-[#1B231E] p-5 sm:p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#172738] border border-[#1E354C] rounded-xl flex items-center justify-center text-blue-400">
            <Droplet size={20} />
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-black text-white tracking-tight">
              450K
            </h3>

            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
              Gallons Filtered
            </p>
          </div>
        </div>
      </div>

      {/* PARTNER SECTION */}
      <section className="space-y-6 pt-2 md:pt-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Partner Organizations
            </h2>

            <p className="text-sm text-gray-400 max-w-2xl">
              Vetted non-profits directly supported by our players' round entries
              and exclusive fairway drives.
            </p>
          </div>

          <button className="text-sm font-semibold text-[#20E49B] hover:text-[#1BCB89] flex items-center gap-1.5 transition-all">
            View All Partners <span>→</span>
          </button>
        </div>

        {/* CHARITIES */}
        {charities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">

            {charities.map((c) => {
              const isSelectedCharity = selected?._id === c._id;

              return (
                <div
                  key={c._id}
                  onClick={() => handleSelect(c)}
                  className={`group bg-[#111613] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between relative
                  ${
                    isSelectedCharity
                      ? "border-[#20E49B] shadow-lg shadow-[#20E49B]/5"
                      : "border-[#1B231E] hover:border-[#2B3830]"
                  }`}
                >

                  {/* IMAGE */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-800">

                    <img
                      src={
                        charityImages[c.name] ||
                        "https://images.unsplash.com/photo-1469571486040-0bd501b6693e?auto=format&fit=crop&w=1000&q=80"
                      }
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111613] via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-[#20E49B] uppercase tracking-wider">
                      {c.percentage}% Allocation
                    </div>

                    {isSelectedCharity && (
                      <div className="absolute inset-0 bg-[#20E49B]/10 backdrop-blur-[2px] flex items-center justify-center transition-all">
                        <div className="bg-[#20E49B] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col justify-between">

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#20E49B] transition-colors line-clamp-1">
                        {c.name}
                      </h3>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {c.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1B231E] flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          isSelectedCharity
                            ? "text-[#20E49B]"
                            : "text-gray-500"
                        }`}
                      >
                        {isSelectedCharity
                          ? "Selection Confirmed"
                          : "Click to Select Cause"}
                      </span>

                      <div
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isSelectedCharity
                            ? "bg-[#20E49B] scale-125"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111613] rounded-2xl border border-[#1B231E]">
            <p className="text-gray-400 text-sm italic font-medium">
              Fetching available charities...
            </p>
          </div>
        )}
      </section>

      {/* SAVE BUTTON */}
      {selected && (
        <div className="sticky bottom-4 md:bottom-6 flex flex-col items-center z-50 animate-fade-in-up px-2">

          <button
            onClick={saveCharity}
            disabled={loading}
            className={`w-full sm:w-auto px-6 sm:px-12 py-4 rounded-xl font-bold tracking-tight shadow-2xl transition-all transform active:scale-98 flex items-center justify-center gap-3 text-sm sm:text-base
            ${
              loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[#20E49B] text-black hover:bg-[#1BCB89] hover:-translate-y-0.5"
            }`}
          >
            <span>
              {loading
                ? "SAVING CHANGES..."
                : `CONFIRM ${selected.name.toUpperCase()}`}
            </span>

            {!loading && <span className="text-lg">→</span>}
          </button>

          {saved && (
            <div className="mt-3 bg-white text-black text-xs px-4 py-1.5 rounded-full shadow-md font-bold tracking-wide text-center">
              SUCCESSFULLY SAVED CHOICE ❤️
            </div>
          )}
        </div>
      )}
    </div>
  </main>
</div>
  );
};

export default UserCharity;