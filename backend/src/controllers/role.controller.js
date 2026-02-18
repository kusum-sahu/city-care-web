const db = require("../config/db");

exports.getAllRoles = (req, res) => {
  const sql = `
    SELECT 
      id, 
      name, 
      description, 
      created_at 
    FROM roles
    ORDER BY id ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch roles",
        error: err.message,
      });
    }
    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};
