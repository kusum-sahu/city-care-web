const db = require("../config/db");

exports.getNextAvailable = (req, res) => {
  const { vendorId, serviceId } = req.params;

  // 1️⃣ Check Vendor
  const vendorSql = `
    SELECT is_online, max_daily_jobs, service_type_id
    FROM vendors
    WHERE id = ?
  `;

  db.query(vendorSql, [vendorId], (err, vendorResult) => {
    if (err) return res.status(500).json({ success: false });

    if (vendorResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    const vendor = vendorResult[0];

    if (!vendor.is_online) {
      return res.json({
        success: false,
        message: "Vendor is offline"
      });
    }

    // 2️⃣ Validate Vendor Service Type
    const typeCheckSql = `
      SELECT sc.service_type_id
      FROM services s
      JOIN service_categories sc ON sc.id = s.category_id
      WHERE s.id = ?
    `;

    db.query(typeCheckSql, [serviceId], (err, typeResult) => {
      if (err) return res.status(500).json({ success: false });

      if (typeResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      const serviceType = typeResult[0].service_type_id;

      if (vendor.service_type_id !== serviceType) {
        return res.json({
          success: false,
          message: "Vendor does not provide this service"
        });
      }

      // 3️⃣ Check Today's Booking Count
      const countSql = `
        SELECT COUNT(*) as total
        FROM bookings
        WHERE vendor_id = ?
        AND DATE(booking_start) = CURDATE()
        AND status IN ('assigned','in_progress','completed')
      `;

      db.query(countSql, [vendorId], (err, countResult) => {
        if (err) return res.status(500).json({ success: false });

        if (countResult[0].total >= vendor.max_daily_jobs) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(9, 0, 0, 0);

          return res.json({
            success: true,
            next_available: tomorrow,
            message: "Max daily jobs reached. Scheduled for next day."
          });
        }

        // 4️⃣ Get Service Duration
        const serviceSql = `
          SELECT duration_minutes, buffer_minutes
          FROM services
          WHERE id = ?
        `;

        db.query(serviceSql, [serviceId], (err, serviceResult) => {
          if (err) return res.status(500).json({ success: false });

          const service = serviceResult[0];
          const duration = service.duration_minutes;
          const buffer = service.buffer_minutes || 30;

          // 5️⃣ Get Latest Booking End
          const bookingSql = `
            SELECT booking_end
            FROM bookings
            WHERE vendor_id = ?
            AND status IN ('assigned','in_progress')
            ORDER BY booking_end DESC
            LIMIT 1
          `;

          db.query(bookingSql, [vendorId], (err, bookingResult) => {
            if (err) return res.status(500).json({ success: false });

            let startTime = new Date();

            if (bookingResult.length > 0) {
              const lastEnd = new Date(bookingResult[0].booking_end);
              startTime = new Date(lastEnd.getTime() + buffer * 60000);
            }

            const endTime = new Date(
              startTime.getTime() + duration * 60000
            );

            return res.json({
              success: true,
              next_available: startTime,
              estimated_end: endTime
            });
          });
        });
      });
    });
  });
};
