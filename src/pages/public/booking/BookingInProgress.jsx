import { useNavigate } from "react-router-dom";

const BookingInProgress = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">

        {/* Illustration */}
        <img
          src="/images/clock.png"
          alt="Booking in Progress"
          className="w-28 h-28 mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold text-[#145A41] mb-3">
          Booking in Progress
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Your booking request has been received successfully.
          We are confirming your service provider.
        </p>

        <div className="bg-green-50 p-4 rounded-lg text-sm text-gray-700 mb-6">
          We will notify you once the booking is confirmed.
          You can track the booking status from your <b>profile</b>.
        </div>

        <button
          onClick={() => navigate("/booking/success")}
          className="w-full bg-[#145A41] hover:bg-[#0f4531] text-white py-3 rounded-lg mb-3 transition"
        >
          View Booking Status
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

export default BookingInProgress;
