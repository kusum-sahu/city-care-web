const db = require("../config/db");
exports.getServicesByType = (req, res) => {
  const { type } = req.params;

  const sql = `
    SELECT 
      s.id,
      s.name,
      s.description,
      s.price,
      s.duration_minutes,
      s.image,
      c.name AS category_name,
      c.slug AS category_slug
    FROM services s
    JOIN service_categories c ON s.category_id = c.id
    JOIN service_types t ON c.service_type_id = t.id
    WHERE t.slug = ?
    AND s.is_available = 1
    ORDER BY c.id ASC
  `;

  db.query(sql, [type], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    // 🔥 Add badges logic here
    const formatted = rows.map((item) => ({
      ...item,

      // Full image path
      image: item.image, 

      // Dummy rating
      rating: 4.8,
      reviews: 120,

      // 🔥 Badge logic (customize later)
      badges: {
        trust: true,
        verify: true,
        topSearch: item.price > 3000, 
      },

      actions: {
        enquiry: true,
        call: true,
        whatsapp: true,
      },
    }));

    res.json({
      success: true,
      data: formatted,
    });
  });
};

exports.getServiceDetails = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      s.id,
      s.name,
      s.description,
      s.price,
      s.duration_minutes,
      c.name AS category_name,
      c.slug AS category_slug
    FROM services s
    JOIN service_categories c ON s.category_id = c.id
    WHERE s.id = ?
    AND s.is_available = 1
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  });
};
