// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";

// const BookingSummary = () => {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([
//     {
//       id: 1,
//       name: "Switchbox installation (15+ amp)",
//       price: 239,
//       qty: 1,
//       img: "/images/switch.png",
//     },
//     {
//       id: 2,
//       name: "Switchbox installation (18+ amp)",
//       price: 139,
//       qty: 1,
//       img: "/images/switch.png",
//     },
//   ]);

//   const updateQty = (id, type) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               qty:
//                 type === "inc"
//                   ? item.qty + 1
//                   : item.qty > 1
//                   ? item.qty - 1
//                   : 1,
//             }
//           : item
//       )
//     );
//   };

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100"
//           >
//             <ArrowLeft size={16} className="text-green-700" />
//           </button>

//           <h2 className="text-sm font-semibold">Confirm Booking</h2>

//           <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
//             ✓
//           </div>
//         </div>

//         <p className="text-xs text-gray-500 mb-4">Step 2 of 2</p>

//         {/* PROGRESS */}
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
//           <div className="bg-[#145A41] h-2 rounded-full w-full"></div>
//         </div>

//         {/* TITLE */}
//         <h3 className="font-semibold mb-3">Booking Summary</h3>

//         {/* ITEMS */}
//         <div className="space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="flex gap-4 border rounded-xl p-4"
//             >
//               {/* IMAGE */}
//               <img
//                 src={item.img}
//                 alt="service"
//                 className="w-12 h-12 rounded border"
//               />

//               {/* INFO */}
//               <div className="flex-1">
//                 <p className="text-sm font-medium">{item.name}</p>
//                 <p className="text-sm font-semibold">
//                   ₹ {item.price}
//                   <span className="text-xs text-gray-400 font-normal">
//                     {" "} (Response within 35 mins)
//                   </span>
//                 </p>
//               </div>

//               {/* COUNTER */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => updateQty(item.id, "dec")}
//                   className="w-6 h-6 border rounded text-sm"
//                 >
//                   −
//                 </button>
//                 <span className="text-sm">{item.qty}</span>
//                 <button
//                   onClick={() => updateQty(item.id, "inc")}
//                   className="w-6 h-6 border rounded text-sm"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* TOTAL */}
//         <div className="flex justify-between text-sm mt-5">
//           <span>Subtotal</span>
//           <span>₹ {subtotal}</span>
//         </div>

//         <div className="flex justify-between font-semibold text-sm mt-2">
//           <span>Total</span>
//           <span>₹ {subtotal}</span>
//         </div>

//         {/* CONFIRM */}
//         <button
//           onClick={() => navigate("/booking/in-progress")}
//          className="mt-6 w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg transition"
//         >
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSummary;


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import useBookingData from "../../../hooks/useBookingData";

const BookingSummary = () => {
  const navigate = useNavigate();
  const { serviceInfo, slot, selectedDate } = useBookingData();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Switchbox installation (15+ amp)",
      price: 239,
      qty: 1,
      img: "/images/switch.png",
    },
    {
      id: 2,
      name: "Switchbox installation (18+ amp)",
      price: 139,
      qty: 1,
      img: "/images/switch.png",
    },
  ]);

  const updateQty = (id, type) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            qty:
              type === "inc"
                ? item.qty + 1
                : item.qty > 1
                  ? item.qty - 1
                  : 1,
          }
          : item
      )
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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

          <h2 className="text-base font-semibold">Booking Summery</h2>

          <div className="w-8 h-8">
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-3 text-center">
          Step 1 of 2
        </p>

        {/* PROGRESS */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-[#145A41] h-2 rounded-full w-1/2" />
        </div>

        {/* TITLE */}
        <h3 className="font-medium mb-4">Booking Summary</h3>

        {/* ITEMS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-300 rounded-xl p-4 bg-gray-50/30"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                alt="service"
                className="w-12 h-12 rounded-lg border border-gray-300 bg-white"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm font-semibold">
                  ₹ {item.price}
                  <span className="text-xs text-gray-400 font-normal">
                    {" "} (Response within 35 mins)
                  </span>
                </p>
              </div>

              {/* COUNTER */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, "dec")}
                  className="w-7 h-7 border border-gray-300 rounded-md text-sm bg-white"
                >
                  −
                </button>
                <span className="text-sm">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, "inc")}
                  className="w-7 h-7 border border-gray-300 rounded-md text-sm bg-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-sm mt-6">
          <span className="text-gray-600">Subtotal</span>
          <span>₹ {subtotal}</span>
        </div>

        <div className="flex justify-between font-semibold text-sm mt-2">
          <span>Total</span>
          <span>₹ {subtotal}</span>
        </div>

        {/* CONFIRM */}
        <button
          onClick={() => navigate("/booking/confirm", {
            state: {
              serviceInfo,
              slot,
              selectedDate
            }
          })
          }
          className="mt-6 w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
