const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.registerVendor = async (req, res) => {
  const {
    business_name,
    contact_person,
    email,
    password,
    mobile,
    district,
    service_area,
    experience_years,
    bank_name,
    account_number,
    ifsc_code
  } = req.body;

  if (!business_name || !email || !password || !mobile) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing"
    });
  }

  try {

    // 🔎 Check existing email
    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      async (err, existingUser) => {

        if (err) {
          return res.status(500).json({ success: false, message: "DB Error" });
        }

        if (existingUser.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already registered"
          });
        }

        // 🔎 Get Vendor Role ID
        db.query(
          "SELECT id FROM roles WHERE name = 'Vendor'",
          async (err, roleResult) => {

            if (err || roleResult.length === 0) {
              return res.status(500).json({
                success: false,
                message: "Vendor role not found"
              });
            }

            const roleId = roleResult[0].id;
            const hashedPassword = await bcrypt.hash(password, 10);

            // 👤 Create User
            db.query(
              `INSERT INTO users (role_id, name, email, mobile, password, status)
               VALUES (?, ?, ?, ?, ?, 'active')`,
              [roleId, contact_person, email, mobile, hashedPassword],
              (err, userResult) => {

                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: "User creation failed"
                  });
                }

                const userId = userResult.insertId;

                // 🏢 Create Vendor Profile
                db.query(
                  `INSERT INTO vendors
                  (user_id, business_name, contact_person, district, service_area,
                   experience_years, bank_name, account_number, ifsc_code,
                   verification_status)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
                  [
                    userId,
                    business_name,
                    contact_person,
                    district,
                    service_area,
                    experience_years || 0,
                    bank_name,
                    account_number,
                    ifsc_code
                  ],
                  (err) => {

                    if (err) {
                      return res.status(500).json({
                        success: false,
                        message: "Vendor profile creation failed"
                      });
                    }

                    return res.status(201).json({
                      success: true,
                      message: "Vendor registered successfully. Waiting for admin approval."
                    });
                  }
                );
              }
            );
          }
        );
      }
    );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
