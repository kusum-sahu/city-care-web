// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const axios = require("axios");

// /* ---------------- HELPER FUNCTIONS ---------------- */

// const validateMobile = (mobile) => {
//   const cleaned = mobile.replace(/^(\+91)/, "");
//   const mobileRegex = /^[6-9]\d{9}$/;
//   return mobileRegex.test(cleaned);
// };

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const generateToken = (id, role) => {
//   return jwt.sign(
//     { id, role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );
// };

// /* ---------------- WHATSAPP SEND FUNCTION ---------------- */
// const sendWhatsAppMessage = async (mobile, otp) => {
//   try {
//     const accessToken = process.env.WHATSAPP_TOKEN;
//     const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
//     const version = process.env.WHATSAPP_VERSION;

//     const response = await axios.post(
//       `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to: `91${mobile}`,
//         type: "template",
//         template: {
//           name: "otp_template", // must match your Meta template name
//           language: { code: "en" },
//           components: [
//             {
//               type: "body",
//               parameters: [
//                 {
//                   type: "text",
//                   text: otp,
//                 },
//               ],
//             },
//           ],
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return { success: true, data: response.data };

//   } catch (error) {
//     console.error("WhatsApp Error:", error.response?.data || error.message);
//     return { success: false };
//   }
// };

// /* ---------------- SEND OTP ---------------- */

// exports.sendOtp = async (req, res) => {
//   const { mobile } = req.body;

//   if (!mobile) {
//     return res.status(400).json({ success: false, message: "Mobile required" });
//   }

//   if (!validateMobile(mobile)) {
//     return res.status(400).json({ success: false, message: "Invalid mobile" });
//   }

//   const checkSql = `
//     SELECT created_at FROM otp_verifications 
//     WHERE mobile = ?
//     ORDER BY created_at DESC 
//     LIMIT 1
//   `;

//   db.query(checkSql, [mobile], async (err, rows) => {
//     if (err) return res.status(500).json({ success: false });

//     if (rows.length > 0) {
//       const lastOtpTime = new Date(rows[0].created_at);
//       const secondsPassed = (new Date() - lastOtpTime) / 1000;

//       if (secondsPassed < 60) {
//         return res.status(429).json({
//           success: false,
//           message: `Wait ${Math.ceil(60 - secondsPassed)} seconds`,
//         });
//       }
//     }

//     const otp = generateOTP();
//     const hashedOtp = await bcrypt.hash(otp, 10);
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     // Invalidate old OTPs
//     await new Promise((resolve, reject) => {
//       db.query(
//         `UPDATE otp_verifications SET verified = TRUE WHERE mobile = ?`,
//         [mobile],
//         (err) => (err ? reject(err) : resolve())
//       );
//     });

//     const insertSql = `
//       INSERT INTO otp_verifications (mobile, otp, expires_at)
//       VALUES (?, ?, ?)
//     `;

//     db.query(insertSql, [mobile, hashedOtp, expiresAt], async (err) => {
//       if (err) return res.status(500).json({ success: false });

//       const whatsappResponse = await sendWhatsAppMessage(mobile, otp);

//       if (!whatsappResponse.success) {
//         return res.status(500).json({
//           success: false,
//           message: "OTP failed to send via WhatsApp",
//         });
//       }

//       return res.json({
//         success: true,
//         message: "OTP sent successfully",
//       });
//     });
//   });
// };
// exports.resendOtp = (req, res) => {
//   exports.sendOtp(req, res);
// };

// /* ---------------- VERIFY OTP ---------------- */

// exports.verifyOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   if (!mobile || !otp) {
//     return res.status(400).json({
//       success: false,
//       message: "Mobile and OTP required",
//     });
//   }

//   if (!validateMobile(mobile)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid mobile",
//     });
//   }

//   const sql = `
//     SELECT * FROM otp_verifications 
//     WHERE mobile = ? AND verified = FALSE
//     ORDER BY created_at DESC 
//     LIMIT 1
//   `;

//   db.query(sql, [mobile], async (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     const record = results[0];

//     if (new Date(record.expires_at) < new Date()) {
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     const isOtpValid = await bcrypt.compare(otp, record.otp);

//     if (!isOtpValid) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     db.query(`UPDATE otp_verifications SET verified = TRUE WHERE id = ?`, [record.id]);

//     // Check user
//     db.query(
//       `SELECT users.*, roles.name AS role 
//        FROM users 
//        JOIN roles ON users.role_id = roles.id 
//        WHERE users.mobile = ?`,
//       [mobile],
//       (err, userRes) => {
//         if (err) return res.status(500).json({ success: false });

//         if (userRes.length === 0) {
//           // Create new user
//           db.query(`SELECT id FROM roles WHERE name = 'User'`, (err, roleRes) => {
//             if (err || roleRes.length === 0)
//               return res.status(500).json({ success: false });

//             const roleId = roleRes[0].id;

//             db.query(
//               `INSERT INTO users (role_id, name, mobile, status) 
//                VALUES (?, ?, ?, 'active')`,
//               [roleId, "New User", mobile],
//               (err, insertRes) => {
//                 if (err) return res.status(500).json({ success: false });

//                 const token = generateToken(insertRes.insertId, "User");

//                 return res.json({
//                   success: true,
//                   message: "Account created & logged in",
//                   token,
//                 });
//               }
//             );
//           });
//         } else {
//           const user = userRes[0];

//           if (user.status === "blocked") {
//             return res.status(403).json({
//               success: false,
//               message: "Account blocked",
//             });
//           }

//           const token = generateToken(user.id, user.role);

//           return res.json({
//             success: true,
//             message: "Login successful",
//             token,
//           });
//         }
//       }
//     );
//   });
// };

//   //  🔹 2️⃣ VENDOR / ADMIN LOGIN (EMAIL + PASSWORD)
// exports.login = async (req, res) => {

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Email & password required",
//     });
//   }

//   const sql = `
//     SELECT users.*, roles.name AS role
//     FROM users
//     JOIN roles ON users.role_id = roles.id
//     WHERE users.email = ?
//   `;

//   db.query(sql, [email], async (err, result) => {

//     if (err) {
//       return res.status(500).json({ success: false });
//     }

//     if (result.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const user = result[0];

//     // Block check
//     if (user.status === "blocked") {
//       return res.status(403).json({
//         success: false,
//         message: "Account blocked by admin",
//       });
//     }

//     // Password match
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // 🔹 Vendor Approval Check
//     if (user.role === "Vendor") {

//       const vendorSql = `
//   SELECT verification_status
//   FROM vendors
//   WHERE user_id = ?
// `;


//       db.query(vendorSql, [user.id], (err, vendorRes) => {

//         if (err) {
//           return res.status(500).json({ success: false });
//         }

//         const token = generateToken(user.id, user.role);

//         return res.json({
//           success: true,
//           message: "Login successful",
//           token,
//         });
//       });

//     } else {
//       // 🔹 Admin Login
//       const token = generateToken(user.id, user.role);

//       return res.json({
//         success: true,
//         message: "Login successful",
//         token,
//       });
//     }
//   });
// };


const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* -------- TOKEN GENERATOR -------- */

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

/* -------- USER SIGNUP -------- */

// exports.signup = async (req, res) => {
//   const { name, email, mobile, password } = req.body;

//   if (!name || !email || !mobile || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields required",
//     });
//   }

//   db.query(
//     "SELECT id FROM users WHERE email = ? OR mobile = ?",
//     [email, mobile],
//     async (err, result) => {
//       if (err)
//         return res.status(500).json({ success: false, error: err.message });

//       if (result.length > 0) {
//         return res.status(409).json({
//           success: false,
//           message: "User already exists",
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       db.query(
//         "SELECT id FROM roles WHERE name = 'User'",
//         (err, roleRes) => {
//           if (err || roleRes.length === 0)
//             return res.status(500).json({
//               success: false,
//               message: "User role not found",
//             });

//           const roleId = roleRes[0].id;

//           db.query(
//             `INSERT INTO users (role_id, name, email, mobile, password, status)
//              VALUES (?, ?, ?, ?, ?, 'active')`,
//             [roleId, name, email, mobile, hashedPassword],
//             (err, insertRes) => {
//               if (err)
//                 return res.status(500).json({
//                   success: false,
//                   error: err.message,
//                 });

//               const token = generateToken(insertRes.insertId, "User");

//               res.status(201).json({
//                 success: true,
//                 message: "User registered successfully",
//                 token,
//               });
//             }
//           );
//         }
//       );
//     }
//   );
// };


exports.signup = async (req, res) => {
  const { name, email, mobile, password, role_id } = req.body;

  if (!name || !email || !mobile || !password || !role_id) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  // ❌ Prevent Admin creation from frontend
  if (parseInt(role_id) === 1) {
    return res.status(403).json({
      success: false,
      message: "Admin cannot be created from signup",
    });
  }

  db.query(
    "SELECT id FROM users WHERE email = ? OR mobile = ?",
    [email, mobile],
    async (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });

      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO users (role_id, name, email, mobile, password, status)
         VALUES (?, ?, ?, ?, ?, 'active')`,
        [role_id, name, email, mobile, hashedPassword],
        (err, insertRes) => {
          if (err)
            return res.status(500).json({
              success: false,
              error: err.message,
            });

          db.query(
            "SELECT name FROM roles WHERE id = ?",
            [role_id],
            (err, roleRes) => {
              const roleName = roleRes[0].name;

              const token = jwt.sign(
                { id: insertRes.insertId, role: roleName },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );

              res.status(201).json({
                success: true,
                message: "Account created successfully",
                token,
              });
            }
          );
        }
      );
    }
  );
};
/* -------- LOGIN -------- */

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Email & password required",
//     });
//   }

//   const sql = `
//     SELECT users.*, roles.name AS role
//     FROM users
//     JOIN roles ON users.role_id = roles.id
//     WHERE users.email = ?
//   `;

//   db.query(sql, [email], async (err, result) => {
//     if (err)
//       return res.status(500).json({ success: false });

//     if (result.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const user = result[0];

//     if (user.status === "blocked") {
//       return res.status(403).json({
//         success: false,
//         message: "Account blocked",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const token = generateToken(user.id, user.role);

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//     });
//   });
// };


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email & password required",
    });
  }

  const sql = `
    SELECT users.*, roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.email = ?
  `;

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false });

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let vendorId = null;

    // 🔥 If role is Vendor → get vendor_id
    if (user.role === "Vendor") {
      const vendorQuery = `SELECT id FROM vendors WHERE user_id = ?`;

      const vendorResult = await new Promise((resolve, reject) => {
        db.query(vendorQuery, [user.id], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });

      if (vendorResult.length > 0) {
        vendorId = vendorResult[0].id;
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        vendor_id: vendorId   // 👈 only vendor gets value
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  });
};
