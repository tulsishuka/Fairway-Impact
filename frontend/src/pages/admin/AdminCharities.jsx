


import { useEffect, useState } from "react";
import axios from "axios";

const AdminCharities = () => {
  const [charities, setCharities] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get(
        "https://givehope-platform-4.onrender.com/api/admin/charity",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCharities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
           Charities Dashboard
        </h1>
      
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {charities.length > 0 ? (
          charities.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-5 flex flex-col gap-3"
            >
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {c.name}
              </h2>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${c.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Contribution:{" "}
                <span className="font-semibold text-green-600">
                  {c.percentage}%
                </span>
              </p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Active Charity
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No charities found
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminCharities;