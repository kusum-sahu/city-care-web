const db = require("../config/db");

exports.addReview = (req, res) => {
  const { bookingId, userId, vendorId, rating, comment } = req.body;

  const insertSql = `
    INSERT INTO reviews (booking_id, user_id, vendor_id, rating, comment)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertSql, [bookingId, userId, vendorId, rating, comment], (err) => {
    if (err) return res.status(500).json({ success: false });

    const avgSql = `
      SELECT AVG(rating) as avg_rating, COUNT(*) as total
      FROM reviews
      WHERE vendor_id = ?
    `;

    db.query(avgSql, [vendorId], (err, result) => {
      const avg = result[0].avg_rating;
      const total = result[0].total;

      db.query(
        `UPDATE vendors SET rating = ?, total_reviews = ? WHERE id = ?`,
        [avg, total, vendorId],
        () => {
          res.json({ success: true, message: "Review added" });
        }
      );
    });
  });
};
