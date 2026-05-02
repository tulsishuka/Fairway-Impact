
import React, { useEffect, useState } from "react";
import axios from "axios";

const Charity = () => {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = localStorage.getItem("token");

  // 🔥 FETCH CHARITIES
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/charity");

        console.log("CHARITIES:", res.data);

        setCharities(res.data.data || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchCharities();
  }, []);

  // 👉 SELECT CHARITY
  const handleSelect = (charity) => {
    setSelected(charity);
    setSaved(false);
  };

  // ❤️ SAVE CHARITY TO USER
  const saveCharity = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      if (!selected) {
        alert("Select a charity first");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/charity/select",
        {
          charityId: selected._id,
          percentage: selected.percentage, // important
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("SAVE RESPONSE:", res.data);

      setSaved(true);
      alert(res.data.message || "Charity selected successfully ❤️");

    } catch (err) {
      console.log("Save error:", err);
      alert("Failed to save charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">
        Choose Your Charity ❤️
      </h1>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {charities.length > 0 ? (
          charities.map((c) => (
            <div
              key={c._id}
              onClick={() => handleSelect(c)}
              className={`p-5 border rounded-lg cursor-pointer transition
              ${
                selected?._id === c._id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold">{c.name}</h2>

              <p className="text-gray-600 mt-2">
                {c.description}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Contribution: {c.percentage}%
              </p>

              {selected?._id === c._id && (
                <p className="text-green-600 font-bold mt-2">
                  Selected ✔
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No charities available</p>
        )}

      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <button
          onClick={saveCharity}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Charity"}
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <p className="mt-4 text-green-600 font-semibold">
          ❤️ Charity saved successfully
        </p>
      )}

    </div>
  );
};

export default Charity;