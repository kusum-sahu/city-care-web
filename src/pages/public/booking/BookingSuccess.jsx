// import { useNavigate } from "react-router-dom";

// const BookingSuccess = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg text-center">

//       {/* Success Icon */}
//       <img src="/images/successful.png" alt="Booking Confirmed" className="w-16 h-16 mx-auto mb-4" />

//       <h2 className="text-xl font-semibold mb-2">
//         Booking Confirmed!
//       </h2>

//       <p className="text-sm text-gray-500 mb-6">
//         Your booking #23560 has been confirmed.
//       </p>

//       <div className="p-4 rounded text-sm text-left mb-6" style={{ backgroundColor: '#f0f9f0' }}>
//         <p><strong>Priyabrata Kar</strong></p>
//         <p>+91 9872XXXX49</p>
//         <p className="mt-2">
//           Plot Number-101, Market Street,<br />
//           Sahid Nagar, Bhubaneswar – 751007
//         </p>
//       </div>

//       <div className="flex justify-between font-semibold mb-6">
//         <span>Total Amount</span>
//         <span>₹378</span>
//       </div>

//       <button onClick={() => navigate("/")} className="w-full text-white py-3 rounded mb-3" style={{ backgroundColor: '#145A41' }}>
//         Continue Exploring
//       </button>

//       <button onClick={() => navigate("/")} className="text-sm" style={{ color: '#145A41' }}>
//         Return to Home
//       </button>
//     </div>
//   );
// };

// export default BookingSuccess;



import { useNavigate,useLocation } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { booking_id, total_amount } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">

        {/* Illustration */}
        <img
          src="/images/successful.png"
          alt="Booking Confirmed"
          className="w-28 h-28 mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold text-[#145A41] mb-2">
          Booking Confirmed!
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Your booking <b> #{booking_id}</b> has been confirmed.
        </p>

        <div className="bg-green-50 p-4 rounded-lg text-sm text-left mb-6 text-gray-700">
          <p className="font-semibold">Priyabrata Kar</p>
          <p>+91 9872XXXX49</p>
          <p className="mt-2">
            Plot Number-101, Market Street,<br />
            Sahid Nagar, Bhubaneswar – 751007
          </p>
        </div>

        <div className="flex justify-between font-semibold mb-6 text-gray-800">
          <span>Total Amount</span>
          <span>₹{total_amount}</span>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg mb-3 transition"
        >
          Continue Exploring
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-[#145A41] hover:underline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
