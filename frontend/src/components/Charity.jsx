
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Charity = () => {
//   const navigate = useNavigate();

//   const [charities, setCharities] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [percentage, setPercentage] = useState(50);
//   const [loading, setLoading] = useState(false);

//   // 🔥 FETCH CHARITIES
//   useEffect(() => {
//     const fetchCharities = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/charity");
//         setCharities(res.data.data || []);
//       } catch (err) {
//         console.log("Error fetching charities:", err);
//       }
//     };

//     fetchCharities();
//   }, []);

//   // 👉 SELECT CHARITY
//   const handleSelect = (charity) => {
//     setSelected(charity);
//   };

//   // ❤️ SAVE CHARITY + PERCENTAGE
//   const doCharity = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first");
//         navigate("/login");
//         return;
//       }

//       if (!selected) {
//         alert("Please select a charity");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:3000/api/charity/select",
//         {
//           charityId: selected._id,
//           percentage: Number(percentage), // ✅ IMPORTANT
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(res.data.message || "Charity saved successfully ❤️");

//       navigate("/Dashboard");

//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Failed to save charity");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-3xl font-bold text-center mb-8">
//         Choose Your Charity ❤️
//       </h1>

//       {/* CHARITY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {charities.map((c) => (
//           <div
//             key={c._id}
//             onClick={() => handleSelect(c)}
//             className={`cursor-pointer p-6 rounded-xl shadow-md bg-white border-2 transition ${
//               selected?._id === c._id
//                 ? "border-green-500"
//                 : "border-transparent"
//             }`}
//           >
//             <h2 className="text-xl font-bold">
//               {c.name}
//             </h2>

//             <p className="text-gray-600 mt-2">
//               {c.description}
//             </p>

//             {selected?._id === c._id && (
//               <p className="text-green-600 font-semibold mt-3">
//                 Selected ✔
//               </p>
//             )}
//           </div>
//         ))}

//       </div>

//       {/* PERCENTAGE SLIDER */}
//       {selected && (
//         <div className="mt-10 text-center">

//           <p className="font-semibold mb-2">
//             Select Donation Percentage: {percentage}%
//           </p>

//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={percentage}
//             onChange={(e) => setPercentage(e.target.value)}
//             className="w-1/2"
//           />

//           <div className="flex justify-center gap-10 text-sm text-gray-600 mt-2">
//             <span>0%</span>
//             <span>50%</span>
//             <span>100%</span>
//           </div>

//         </div>
//       )}

//       {/* BUTTON */}
//       {selected && (
//         <div className="text-center mt-10">
//           <button
//             onClick={doCharity}
//             disabled={loading}
//             className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Do Charity ❤️"}
//           </button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Charity;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Charity = () => {
  const navigate = useNavigate();

  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH CHARITIES
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/charity");
        setCharities(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCharities();
  }, []);

  // 👉 SELECT CARD
  const handleSelect = (charity) => {
    setSelected(charity);
  };

  // ❤️ SAVE CHARITY
  const doCharity = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (!selected) {
        alert("Select a charity first");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/charity/select",
        {
          charityId: selected._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Charity selected ❤️");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        Choose Charity ❤️
      </h1>

      {/* CHARITY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {charities.map((c) => (
          <div
            key={c._id}
            onClick={() => handleSelect(c)}
            className={`cursor-pointer p-6 rounded-xl shadow-md bg-white border-2 transition ${
              selected?._id === c._id
                ? "border-green-500"
                : "border-transparent"
            }`}
          >
            <h2 className="text-xl font-bold">{c.name}</h2>

            <p className="text-gray-600 mt-2">{c.description}</p>

            {/* 💰 PERCENTAGE DISPLAY */}
            <p className="text-sm text-gray-500 mt-2">
              Donation Share: {c.percentage}%
            </p>

            {selected?._id === c._id && (
              <p className="text-green-600 font-semibold mt-3">
                Selected ✔
              </p>
            )}
          </div>
        ))}

      </div>

      {/* BUTTON */}
      {selected && (
        <div className="text-center mt-10">
          <button
            onClick={doCharity}
            disabled={loading}
            className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
          >
            {loading ? "Processing..." : "Confirm Charity ❤️"}
          </button>
        </div>
      )}

    </div>
  );
};

export default Charity;