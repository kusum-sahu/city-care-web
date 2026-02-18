const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.registerVendor = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const checkSql = `SELECT id FROM users WHERE email = ? OR mobile = ?`;

  db.query(checkSql, [email, mobile], async (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (result.length > 0) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleSql = `SELECT id FROM roles WHERE name = 'Vendor'`;

    db.query(roleSql, (err, roleRes) => {
      if (err || roleRes.length === 0) {
        return res.status(500).json({
          success: false,
          message: "Vendor role not found",
        });
      }

      const roleId = roleRes[0].id;

      const userSql = `
        INSERT INTO users (role_id, name, email, mobile, password, status)
        VALUES (?, ?, ?, ?, ?, 'active')
      `;

      db.query(
        userSql,
        [roleId, name, email, mobile, hashedPassword],
        (err, userRes) => {
          if (err) return res.status(500).json({ success: false, error: err.message });

          const vendorSql = `
            INSERT INTO vendors (user_id, approval_status)
            VALUES (?, 'pending')
          `;

          db.query(vendorSql, [userRes.insertId], (err) => {
            if (err) return res.status(500).json({ success: false, error: err.message });

            res.status(201).json({
              success: true,
              message: "Vendor registered successfully. Awaiting admin approval",
            });
          });
        }
      );
    });
  });
};

// exports.getVendorBookings = (req, res) => {
//   const vendorUserId = req.user.id;

//   const sql = `
//     SELECT b.*
//     FROM bookings b
//     JOIN vendors v ON b.vendor_id = v.id
//     WHERE v.user_id = ?
//     ORDER BY b.created_at DESC
//   `;

//   db.query(sql, [vendorUserId], (err, data) => {
//     if (err) return res.status(500).json({ success: false, error: err.message });

//     res.json({ success: true, data });
//   });
// };
exports.uploadDocuments = (req, res) => {
  const userId = req.user.id;

  const { service_category, experience_years } = req.body;

  const aadhaar = req.files?.aadhaar_doc?.[0]?.filename || null;
  const pan = req.files?.pan_doc?.[0]?.filename || null;
  const license = req.files?.license_doc?.[0]?.filename || null;
  const profile_img = req.files?.profile_img?.[0]?.filename || null;

  const sql = `
    UPDATE vendors
    SET 
      service_type_id = ?,
      experience_years = ?,
      aadhaar_doc = ?,
      pan_doc = ?,
      license_doc = ?,
      profile_img = ?,
      profile_completed = 1,
      verification_status = 'pending'
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [
      service_category,
      experience_years,
      aadhaar,
      pan,
      license,
      profile_img,
      userId,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database update failed",
        });
      }

      res.json({
        success: true,
        message: "Profile submitted successfully",
      });
    }
  );
};

exports.getVendorProfileStatus = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT profile_completed, verification_status
    FROM vendors
    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({ success: false });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      data: result[0]
    });

  });
};

/* ===== Vendor Earnings Summary ===== */
exports.getVendorEarnings = (req, res) => {
  const { vendorId } = req.params;

  const sql = `
    SELECT 
      COUNT(*) as total_jobs,
      SUM(vendor_earning) as total_earnings,
      SUM(commission_amount) as total_commission
    FROM bookings
    WHERE vendor_id = ?
    AND status = 'completed'
  `;

  db.query(sql, [vendorId], (err, result) => {
    if (err) return res.status(500).json({ success: false });

    res.json({
      success: true,
      data: result[0]
    });
  });
};
/* ===== Vendor Live Status Control ===== */
exports.toggleOnlineStatus = (req, res) => {
  const { vendorId, status } = req.body;

  db.query(
    `UPDATE vendors SET is_online = ? WHERE id = ?`,
    [status, vendorId],
    (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        message: status ? "Vendor is Online" : "Vendor is Offline"
      });
    }
  );
};
