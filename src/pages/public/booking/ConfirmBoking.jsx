// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { ArrowLeft } from "lucide-react";

// const ConfirmBooking = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation(); // ✅ slot + serviceId
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
//   const [address, setAddress] = useState(
//     "Priyabrata Kar\nPlot Number-101, Market Street,\nSahid Nagar, Bhubaneswar – 751007"
//   );

//   // 🔥 CONFIRM BOOKING
//   const handleConfirmBooking = async () => {
//     if (!state?.serviceId || !state?.slot) {
//       alert("Invalid booking data");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:5000/api/bookings",
//         {
//           service_id: state.serviceId,
//           booking_date: new Date().toISOString().split("T")[0],
//           slot_label: state.slot,
//           address,
//           payment_method: selectedPaymentMethod,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Booking Confirmed 🎉");
//       navigate("/my-bookings");
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100"
//           >
//             <ArrowLeft size={16} className="text-green-700" />
//           </button>

//           <h2 className="text-base font-semibold">Confirm Booking</h2>
//           <div className="w-8 h-8" />
//         </div>

//         <p className="text-xs text-gray-500 mb-3 text-center">
//           Step 1 of 2
//         </p>

//         <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
//           <div className="bg-[#145A41] h-2 rounded-full w-1/2" />
//         </div>

//         {/* ADDRESS */}
//         <div className="border border-gray-300 rounded-xl p-4 mb-5 bg-gray-50/30">
//           <h3 className="font-medium mb-2">Booking Address</h3>
//           <p className="text-sm text-gray-700 whitespace-pre-line">
//             {address}
//           </p>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-sm text-[#145A41] mt-2"
//           >
//             + Change / Edit Address
//           </button>
//         </div>

//         {/* PAYMENT */}
//         <div className="border border-gray-300 rounded-xl p-4 bg-gray-50/30">
//           <h3 className="font-medium mb-3">Select Payment Method</h3>

//           {["netbanking", "upi", "cash"].map((method) => (
//             <label
//               key={method}
//               className={`flex items-center gap-2 mb-2 text-sm p-3 rounded-lg border cursor-pointer
//                 ${
//                   selectedPaymentMethod === method
//                     ? "bg-green-100 border-[#145A41]"
//                     : "border-gray-200 bg-white"
//                 }`}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value={method}
//                 checked={selectedPaymentMethod === method}
//                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//               />
//               {method === "cash"
//                 ? "Cash on Service"
//                 : method.toUpperCase()}
//             </label>
//           ))}
//         </div>

//         {/* CONTINUE */}
//         <button
//           onClick={handleConfirmBooking}
//           disabled={loading}
//           className="mt-6 w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg transition disabled:opacity-50"
//         >
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>

//         {/* EDIT ADDRESS MODAL */}
//         {isEditing && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl w-full max-w-xs">
//               <h3 className="font-semibold mb-3">Edit Address</h3>
//               <textarea
//                 className="w-full border border-gray-300 rounded p-2 text-sm mb-4"
//                 rows="4"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1 py-2 bg-gray-200 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1 py-2 bg-[#145A41] text-white rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ConfirmBooking;


// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import axios from "axios";
// import useBookingData from "../../../hooks/useBookingData";

// const ConfirmBooking = () => {
  
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
//   const [address, setAddress] = useState(
//     "Priyabrata Kar\nPlot Number-101, Market Street,\nSahid Nagar, Bhubaneswar – 751007"
//   );

//   const { serviceInfo, slot, selectedDate } = useBookingData();
// console.log("SERVICE INFO:", serviceInfo);
// console.log("SLOT OBJECT:", slot);
// console.log("SELECTED DATE:", selectedDate);

//   const handlePayment = async () => {
//     try {
//       // 1️⃣ Create Booking First
// const bookingRes = await axios.post(
//   "http://localhost:5000/api/bookings/create",
//   {
//     service_id: serviceInfo.id,
//     booking_date: selectedDate,
//     start_time: slot.start_time,
//     total_amount: serviceInfo.price
//   }
// );

//       const booking_id = bookingRes.data.booking_id;

//       // 🔵 IF CASH
//       if (selectedPaymentMethod === "cash") {

//         navigate("/booking/success", {
//           state: {
//             booking_id,
//             total_amount: serviceInfo.price
//           }
//         });

//         return;
//       }

//       // 2️⃣ Create Razorpay Order
//       const orderRes = await axios.post(
//         "http://localhost:5000/api/payment/create-order",
//         {
//           amount: serviceInfo.price,
//           booking_id
//         }
//       );

//       const order = orderRes.data.order;

//       const options = {
//         key: "YOUR_RAZORPAY_KEY",
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,

//         handler: async function (response) {

//           await axios.post(
//             "http://localhost:5000/api/payment/verify-payment",
//             {
//               booking_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature
//             }
//           );

//           navigate("/booking/success", {
//             state: {
//               booking_id,
//               total_amount: serviceInfo.price
//             }
//           });
//         },
//         theme: {
//           color: "#145A41"
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.log(err);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100"
//           >
//             <ArrowLeft size={16} className="text-green-700" />
//           </button>

//           <h2 className="text-base font-semibold">Confirm Booking</h2>
//           <div className="w-8 h-8" />
//         </div>

//         <p className="text-xs text-gray-500 mb-3 text-center">
//           Step 2 of 2
//         </p>

//         {/* PROGRESS */}
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
//           <div className="bg-[#145A41] h-2 rounded-full w-full" />
//         </div>

//         {/* ADDRESS */}
//         <div className="border border-gray-300 rounded-xl p-4 mb-5 bg-gray-50/30">
//           <h3 className="font-medium mb-2">Booking Address</h3>
//           <p className="text-sm text-gray-700 whitespace-pre-line">
//             {address}
//           </p>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-sm text-[#145A41] mt-2"
//           >
//             + Change / Edit Address
//           </button>
//         </div>

//         {/* PAYMENT */}
//         <div className="border border-gray-300 rounded-xl p-4 bg-gray-50/30">
//           <h3 className="font-medium mb-3">Select Payment Method</h3>

//           <label
//             className={`flex items-center gap-2 mb-2 text-sm p-3 rounded-lg border cursor-pointer transition
//               ${selectedPaymentMethod === "netbanking"
//                 ? "bg-green-100 border-[#145A41]"
//                 : "border-gray-200 bg-white"
//               }`}
//           >
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="netbanking"
//               checked={selectedPaymentMethod === "netbanking"}
//               onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//             />
//             Net Banking
//           </label>

//           <label
//             className={`flex items-center gap-2 mb-2 text-sm p-3 rounded-lg border cursor-pointer transition
//               ${selectedPaymentMethod === "upi"
//                 ? "bg-green-100 border-[#145A41]"
//                 : "border-gray-200 bg-white"
//               }`}
//           >
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="upi"
//               checked={selectedPaymentMethod === "upi"}
//               onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//             />
//             UPI
//           </label>

//           <label
//             className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition
//               ${selectedPaymentMethod === "cash"
//                 ? "bg-green-100 border-[#145A41]"
//                 : "border-gray-200 bg-white"
//               }`}
//           >
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="cash"
//               checked={selectedPaymentMethod === "cash"}
//               onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//             />
//             <div>
//               <p className="font-medium text-sm">Cash on Service</p>
//               <p className="text-xs text-gray-500">
//                 Pay after the service is done
//               </p>
//             </div>
//           </label>
//         </div>

//         {/* CONTINUE */}
//         <button
//           // onClick={() => navigate("/booking/in-progress")}
//           onClick={handlePayment}
//           className="mt-6 w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg transition"
//         >
//           Confirm Booking
//         </button>

//         {/* EDIT ADDRESS MODAL */}
//         {isEditing && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl w-full max-w-xs">
//               <h3 className="font-semibold mb-3">Edit Address</h3>
//               <textarea
//                 className="w-full border border-gray-300 rounded p-2 text-sm mb-4"
//                 rows="4"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1 py-2 bg-gray-200 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1 py-2 bg-[#145A41] text-white rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ConfirmBooking;


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import useBookingData from "../../../hooks/useBookingData";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { serviceInfo, slot, selectedDate } = useBookingData();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [address, setAddress] = useState(
    "Priyabrata Kar\nPlot Number-101, Market Street,\nSahid Nagar, Bhubaneswar – 751007"
  );

  /* ================= SAFETY CHECK ================= */

  if (!serviceInfo || !slot || !selectedDate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid booking flow. Please select service again.</p>
      </div>
    );
  }

  /* ================= HANDLE PAYMENT ================= */

  const handlePayment = async () => {
    try {
      const payload = {
        service_id: serviceInfo.id, // MUST exist
        booking_date: selectedDate,
        start_time: slot.start_time,
        total_amount: Number(serviceInfo.price)
      };

      console.log("📦 Booking Payload:", payload);

      if (!payload.service_id) {
        alert("Service ID missing. Please reselect service.");
        return;
      }

      /* 1️⃣ CREATE BOOKING FIRST */
      const bookingRes = await axios.post(
        "http://localhost:5000/api/bookings/create",
        payload
      );

      const booking_id = bookingRes.data.booking_id;

      console.log("✅ Booking Created:", booking_id);

      /* ================= CASH FLOW ================= */

      if (selectedPaymentMethod === "cash") {
        navigate("/booking/success", {
          state: {
            booking_id,
            total_amount: payload.total_amount
          }
        });
        return;
      }

      /* ================= RAZORPAY FLOW ================= */

      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: payload.total_amount,
          booking_id
        }
      );

      const order = orderRes.data.order;

      const options = {
        key: "rzp_test_1234567890", // temporary test key
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "City Care",
        description: serviceInfo.title,

        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                booking_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            );

            navigate("/booking/success", {
              state: {
                booking_id,
                total_amount: payload.total_amount
              }
            });

          } catch (err) {
            console.log("Payment verification failed:", err);
            alert("Payment verification failed.");
          }
        },

        theme: {
          color: "#145A41"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log("❌ Booking Error:", err);

      if (err.response) {
        console.log("Server Message:", err.response.data);
        alert(err.response.data.message || "Booking failed");
      } else {
        alert("Something went wrong");
      }
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100"
          >
            <ArrowLeft size={16} className="text-green-700" />
          </button>

          <h2 className="text-base font-semibold">Confirm Booking</h2>
          <div className="w-8 h-8" />
        </div>

        <p className="text-xs text-gray-500 mb-3 text-center">
          Step 2 of 2
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-[#145A41] h-2 rounded-full w-full" />
        </div>

        {/* ADDRESS */}
        <div className="border border-gray-300 rounded-xl p-4 mb-5 bg-gray-50/30">
          <h3 className="font-medium mb-2">Booking Address</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {address}
          </p>
        </div>

        {/* PAYMENT */}
        <div className="border border-gray-300 rounded-xl p-4 bg-gray-50/30">
          <h3 className="font-medium mb-3">Select Payment Method</h3>

          {["netbanking", "upi", "cash"].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-2 mb-2 text-sm p-3 rounded-lg border cursor-pointer transition
                ${
                  selectedPaymentMethod === method
                    ? "bg-green-100 border-[#145A41]"
                    : "border-gray-200 bg-white"
                }`}
            >
              <input
                type="radio"
                value={method}
                checked={selectedPaymentMethod === method}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              {method === "cash" ? "Cash on Service" : method.toUpperCase()}
            </label>
          ))}
        </div>

        {/* CONFIRM BUTTON */}
        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg transition"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default ConfirmBooking;
