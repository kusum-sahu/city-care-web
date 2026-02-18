exports.vendorRespondBooking = (req, res) => {
  const { bookingId } = req.params;
  const { action } = req.body; // accept | reject

  if (!["accept", "reject"].includes(action)) {
    return res.status(400).json({ success: false, message: "Invalid action" });
  }

  const status = action === "accept" ? "accepted" : "cancelled";

  const sql = `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, bookingId], (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    res.json({
      success: true,
      message: `Booking ${status}`,
    });
  });
};
