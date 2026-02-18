const db = require("../config/db");

// ---------------- USERS ----------------
exports.getAllUsersAdmin = (req, res) => {
  const sql = `
    SELECT 
      users.id,
      users.name,
      users.email,
      users.mobile,
      users.status,
      users.created_at,
      roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    ORDER BY users.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: results.length, data: results });
  });
};

exports.toggleUserStatus = (req, res) => {
  const { userId } = req.params;
  const { status } = req.body; // active | blocked

  if (!["active", "blocked"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be 'active' or 'blocked'",
    });
  }

  const sql = `UPDATE users SET status = ? WHERE id = ?`;

  db.query(sql, [status, userId], (err, result) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message:
        status === "active"
          ? "User unblocked successfully"
          : "User blocked successfully",
    });
  });
};

exports.getAllVendors = (req, res) => {
  const sql = `
  SELECT 
    vendors.id AS vendor_id,
    users.name,
    users.email,
    users.mobile,
    vendors.verification_status,
    vendors.created_at
  FROM vendors
  JOIN users ON vendors.user_id = users.id
  ORDER BY vendors.created_at DESC
`;

  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

exports.verifyVendor = (req, res) => {
  const { vendorId } = req.params;
  const { verification_status } = req.body;

  if (!["verified", "rejected"].includes(verification_status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be verified or rejected",
    });
  }

  const bankVerified = verification_status === "verified" ? 1 : 0;
  const sql = `
    UPDATE vendors
SET verification_status = ?,
    bank_verified = ?,
    profile_completed = 1
WHERE id = ?
  `;

  db.query(
    sql,
    [verification_status, bankVerified, vendorId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      res.json({
        success: true,
        message: `Vendor ${verification_status} successfully`,
      });
    },
  );
};

exports.assignVendorToBooking = (req, res) => {
  const { bookingId } = req.params;
  const { vendor_id } = req.body;
  const sql = `
    UPDATE bookings
    SET vendor_id = ?, status = 'VENDOR_ASSIGNED'
    WHERE id = ?
  `;

  db.query(sql, [vendor_id, bookingId], (err, result) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Vendor assigned to booking",
    });
  });
};

exports.completeBooking = (req, res) => {
  const { bookingId } = req.params;

  const sql = `
    UPDATE bookings
    SET status = 'completed'
    WHERE id = ?
  `;

  db.query(sql, [bookingId], (err) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });

    res.json({
      success: true,
      message: "Booking completed successfully",
    });
  });
};
exports.verifyBankDetails = (req, res) => {
  const { vendorId } = req.body;

  db.query(
    `UPDATE vendors SET bank_verified = TRUE WHERE user_id = ?`,
    [vendorId],
    (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        message: "Bank details verified",
      });
    },
  );
};
