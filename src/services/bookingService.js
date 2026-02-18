import axios from "axios";

export const getBookings = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/vendors/bookings",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
  return res.data.data;
};
/* ================= ACCEPT BOOKING ================= */
export const acceptBooking = async (bookingId) => {
  return axios.put(
    `http://localhost:5000/api/bookings/${bookingId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
export const declineBooking = async (id) => {
  const response = await axios.put(
    `http://localhost:5000/api/bookings/${id}/decline`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
  return response.data;
};
/* ================= START JOB (OTP VERIFY) ================= */
export const verifyStartOtp = async (bookingId, otp) => {
  return axios.put(`${API}/start`, {
    bookingId,
    otp,
  });
};
/* ================= COMPLETE JOB (OTP VERIFY) ================= */
export const verifyEndOtp = async (bookingId, otp) => {
  return axios.put(`${API}/complete`, {
    bookingId,
    otp,
  });
};
