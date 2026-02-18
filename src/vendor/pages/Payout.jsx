import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Payout = () => {
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");

  const requestPayout = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return toast.error("Enter valid amount");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/vendor/request-payout",
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Payout request sent to admin");
      setAmount("");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Request failed"
      );
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" />

      <div className="max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-xl font-semibold mb-6 text-[#023a20]">
          Request Payout
        </h2>

        <form onSubmit={requestPayout} className="space-y-4">

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#023a20] text-white p-3 rounded-lg"
          >
            Request Withdrawal
          </button>

        </form>

        <div className="mt-6 text-sm text-gray-500">
          Payout requests are reviewed and approved by admin.
        </div>

      </div>
    </div>
  );
};

export default Payout;
