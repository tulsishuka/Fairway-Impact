/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

const WinnerVerification = () => {

  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const fetchResults = async () => {

    try {

      const res = await axios.get(
        "https://fairway-impact.onrender.com/api/results/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data.results);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const verifyWinner = async (id, status) => {

    try {

      await axios.put(
        `https://fairway-impact.onrender.com/api/results/verify/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Winner ${status}`);

      fetchResults();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        Winner Verification
      </h1>

      <div className="space-y-6">

        {results.map((r) => (

          <div
            key={r._id}
            className="bg-black border border-[#2a2a2a] rounded-3xl p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  {r.userId?.name}
                </h2>

                <p className="text-gray-400">
                  {r.userId?.email}
                </p>

                <p className="mt-2">
                  Reward:
                  <span className="text-emerald-400 ml-2">
                    {r.rewardType}
                  </span>
                </p>

                <p>
                  Winnings:
                  <span className="text-yellow-400 ml-2">
                    ₹{r.winnings}
                  </span>
                </p>

                <p className="mt-2">
                  Status:
                  <span className="ml-2 text-cyan-400">
                    {r.verificationStatus}
                  </span>
                </p>

              </div>

              <div>

                {r.proofImage && (
              
                    <img
  src={`https://fairway-impact.onrender.com/uploads/${r.proofImage}`}
  alt="proof"
  className="max-w-[300px] max-h-[300px] object-contain rounded-2xl mt-4 border border-gray-700 bg-black"
/>
                )}

                {r.verificationStatus === "pending" && (

                  <div className="flex gap-4 mt-4">

                    <button
                      onClick={() =>
                        verifyWinner(r._id, "approved")
                      }
                      className="bg-emerald-500 px-5 py-2 rounded-xl text-black font-bold"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        verifyWinner(r._id, "rejected")
                      }
                      className="bg-red-500 px-5 py-2 rounded-xl text-white font-bold"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default WinnerVerification;