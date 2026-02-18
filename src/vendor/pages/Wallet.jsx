import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Wallet = () => {
  const [wallet, setWallet] = useState({
    wallet_balance: 0,
    total_earnings: 0,
    total_withdrawn: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/vendor/wallet",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWallet(res.data.data);

    } catch (err) {
      toast.error("Failed to load wallet");
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" />

      <h2 className="text-2xl font-semibold mb-6 text-[#023a20]">
        Wallet Overview
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Wallet Balance */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Available Balance</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹ {wallet.wallet_balance}
          </p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Total Earnings</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ₹ {wallet.total_earnings}
          </p>
        </div>

        {/* Withdrawn */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Total Withdrawn</h3>
          <p className="text-2xl font-bold text-red-500 mt-2">
            ₹ {wallet.total_withdrawn}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Wallet;
