const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res) => {
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
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, count: results.length, data: results });
  });
};

exports.createUser = async (req, res) => {
  const { name, email, mobile, password, role_id } = req.body;

  if (!name || !email || !mobile || !password || !role_id) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const checkSql = "SELECT id FROM users WHERE email=? OR mobile=?";
  db.query(checkSql, [email, mobile], async (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    if (result.length > 0) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = `
      INSERT INTO users (role_id, name, email, mobile, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [role_id, name, email, mobile, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user_id: result.insertId,
      });
    });
  });
};
// exports.getUserProfile = (req, res) => {
//   const sql = "SELECT id, name, email, address FROM users WHERE id = ?";
//   db.query(sql, [req.user.id], (err, result) => {
//     if (err) return res.status(500).json({ message: "DB error" });
//     if (result.length === 0) return res.status(404).json({ message: "User not found" });

//     res.json({ user: result[0] });
//   });
// };
