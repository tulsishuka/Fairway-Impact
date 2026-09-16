/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

const UserResults = () => {

  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const fetchResults = async () => {

    try {

    const res = await axios.get(
  "https://fairway-impact.onrender.com/api/results/my-results",
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



const uploadProof = async (resultId, file) => {

  try {

    const formData = new FormData();

    formData.append("image", file);

    await axios.post(
      `https://fairway-impact.onrender.com/api/results/upload-proof/${resultId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Proof uploaded");

    fetchResults();

  } catch (error) {
    console.log(error);
    alert("Upload failed");
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        My Draw Results
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
                  {r.rewardType.toUpperCase()}
                </h2>

                <p className="text-gray-400 mt-2">
                  Matched Numbers: {r.matchedNumbers}
                </p>

                <p className="text-emerald-400 font-bold mt-2">
                  ₹{r.winnings}
                </p>

                <p className="mt-3">
                  Verification:
                  <span className="ml-2 text-yellow-400">
                    {r.verificationStatus}
                  </span>
                </p>

              </div>

              <div>

                {r.rewardType !== "none" &&
                 r.verificationStatus === "not_submitted" && (

                  <input
                    type="file"
                    onChange={(e) =>
                      uploadProof(r._id, e.target.files[0])
                    }
                    className="text-sm"
                  />

                )}

                {r.proofImage && (
             
                <img
  src={`https://givehope-platform-4.onrender.com/uploads/${r.proofImage}`}
  alt="proof"
  className="max-w-[300px] max-h-[300px] object-contain rounded-2xl mt-4 border border-gray-700 bg-black"
/>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default UserResults;