const db = require("../config/db");

//!  CREATE BOOKING + BROADCAST TO VENDORS

exports.createBooking = (req, res) => {
  const { service_id, booking_date, start_time, total_amount } = req.body;
  const user_id = 1; // temporary

  if (!service_id || !booking_date || !start_time || !total_amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const serviceSql = `
    SELECT duration_minutes
    FROM services
    WHERE id = ?
  `;

  db.query(serviceSql, [service_id], (err, serviceResult) => {
    if (err || serviceResult.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    const duration = serviceResult[0].duration_minutes || 60;

    const bookingStart = new Date(`${booking_date}T${start_time}`);
    const bookingEnd = new Date(bookingStart.getTime() + duration * 60000);

    /* 🔥 INSERT BOOKING */

    const insertSql = `
      INSERT INTO bookings
      (user_id, service_id, vendor_id,
       booking_start, booking_end,
       total_amount, payment_status,
       booking_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      insertSql,
      [
        user_id,
        service_id,
        null,
        bookingStart,
        bookingEnd,
        total_amount,
        "pending",
        "searching",
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Booking failed" });
        }

        const bookingId = result.insertId;

        /* 🔥 BROADCAST TO ELIGIBLE VENDORS */

        const vendorSql = `
          SELECT v.id
          FROM vendors v
          JOIN vendor_services vs ON vs.vendor_id = v.id
          WHERE vs.service_id = ?
          AND v.is_online = 1
          ORDER BY v.rating DESC
          LIMIT 5
        `;

        db.query(vendorSql, [service_id], (err, vendors) => {
          if (err) {
            return res.status(500).json({ message: "Vendor search failed" });
          }

          if (vendors.length === 0) {
            return res.json({
              success: false,
              message: "No vendors available",
            });
          }

          vendors.forEach((vendor) => {
            db.query(
              `INSERT INTO booking_requests (booking_id, vendor_id)
               VALUES (?, ?)`,
              [bookingId, vendor.id],
            );
          });

          res.json({
            success: true,
            message: "Booking request sent to vendors",
            booking_id: bookingId,
          });
        });
      },
    );
  });
};

//!  GET VENDOR BOOKINGS (FIXED TOKEN ISSUE)

exports.getVendorBookings = (req, res) => {
  const vendorId = req.user.vendor_id;

  const sql = `
    SELECT b.*
    FROM booking_requests br
    JOIN bookings b ON b.id = br.booking_id
    WHERE br.vendor_id = ?
    AND br.status = 'pending'
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [vendorId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch bookings",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

//!  ACCEPT BOOKING (NO CHANGE)

// exports.acceptBooking = (req, res) => {

//   const { bookingId } = req.params;
//   const vendorId = req.user.vendor_id;

//   db.beginTransaction(err => {

//     if (err) {
//       return res.status(500).json({ success: false });
//     }

//     db.query(
//       `SELECT vendor_id, booking_start, booking_end
//        FROM bookings
//        WHERE id = ?
//        FOR UPDATE`,
//       [bookingId],
//       (err, result) => {

//         if (err || result.length === 0) {
//           return db.rollback(() =>
//             res.status(404).json({ success: false })
//           );
//         }

//         const booking = result[0];

//         if (booking.vendor_id !== null) {
//           return db.rollback(() =>
//             res.json({
//               success: false,
//               message: "Already accepted by another vendor"
//             })
//           );
//         }

//         /* 🔥 Vendor Slot Conflict Check */

//         db.query(
//           `SELECT id FROM bookings
//            WHERE vendor_id = ?
//            AND booking_start < ?
//            AND booking_end > ?
//            AND booking_status IN ('assigned','in_progress')`,
//           [vendorId, booking.booking_end, booking.booking_start],
//           (err, conflict) => {

//             if (conflict.length > 0) {
//               return db.rollback(() =>
//                 res.json({
//                   success: false,
//                   message: "You already have a booking at this time"
//                 })
//               );
//             }

//             /* 🔥 Assign Vendor */

//             db.query(
//               `UPDATE bookings
//                SET vendor_id = ?, booking_status = 'assigned'
//                WHERE id = ?`,
//               [vendorId, bookingId],
//               (err) => {

//                 if (err) {
//                   return db.rollback(() =>
//                     res.status(500).json({ success: false })
//                   );
//                 }

//                 db.query(
//                   `UPDATE booking_requests
//                    SET status = 'accepted'
//                    WHERE booking_id = ? AND vendor_id = ?`,
//                   [bookingId, vendorId]
//                 );

//                 db.query(
//                   `UPDATE booking_requests
//                    SET status = 'expired'
//                    WHERE booking_id = ?
//                    AND vendor_id != ?`,
//                   [bookingId, vendorId]
//                 );

//                 db.commit(() => {
//                   res.json({
//                     success: true,
//                     message: "Booking accepted successfully"
//                   });
//                 });

//               }
//             );

//           }
//         );

//       }
//     );

//   });
// };

exports.acceptBooking = (req, res) => {
  const { bookingId } = req.params;
  const vendorId = req.user.vendor_id;

  if (!req.user || !req.user.vendor_id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized vendor",
    });
  }

  db.getConnection((err, connection) => {
    if (err) {
      console.log("Connection error:", err);
      return res.status(500).json({ success: false });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ success: false });
      }

      connection.query(
        `SELECT vendor_id, booking_start, booking_end 
         FROM bookings 
         WHERE id = ? 
         FOR UPDATE`,
        [bookingId],
        (err, result) => {
          if (err || result.length === 0) {
            return connection.rollback(() => {
              connection.release();
              res.status(404).json({ success: false });
            });
          }

          const booking = result[0];

          if (booking.vendor_id !== null) {
            return connection.rollback(() => {
              connection.release();
              res.json({
                success: false,
                message: "Already accepted by another vendor",
              });
            });
          }

          connection.query(
            `UPDATE bookings
             SET vendor_id = ?, booking_status = 'assigned'
             WHERE id = ?`,
            [vendorId, bookingId],
            (err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  res.status(500).json({ success: false });
                });
              }

              connection.commit((err) => {
                connection.release();

                if (err) {
                  return res.status(500).json({ success: false });
                }

                res.json({
                  success: true,
                  message: "Booking accepted successfully",
                });
              });
            },
          );
        },
      );
    });
  });
};
// exports.declineBooking = (req, res) => {

//   const bookingId = req.params.id;
//   const vendorId = req.user.vendor_id; // from token

//   db.query(
//     `SELECT booking_status, vendor_id 
//      FROM bookings 
//      WHERE id = ?`,
//     [bookingId],
//     (err, result) => {

//       if (err) {
//         console.log(err);
//         return res.status(500).json({ success: false });
//       }

//       if (result.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: "Booking not found"
//         });
//       }

//       const booking = result[0];

//       // ❌ If already assigned
//       if (booking.vendor_id !== null) {
//         return res.status(400).json({
//           success: false,
//           message: "Booking already accepted"
//         });
//       }

//       // ❌ Only new/searching booking can be declined
//       if (booking.booking_status !== "searching") {
//         return res.status(400).json({
//           success: false,
//           message: "Cannot decline this booking"
//         });
//       }

//       // ✅ Update status to cancelled
//       db.query(
//         `UPDATE bookings 
//          SET booking_status = 'cancelled' 
//          WHERE id = ?`,
//         [bookingId],
//         (err) => {

//           if (err) {
//             return res.status(500).json({ success: false });
//           }

//           res.json({
//             success: true,
//             message: "Booking declined successfully"
//           });
//         }
//       );

//     }
//   );
// };

//!  UPDATE BOOKING AFTER PAYMENT VERIFICATION
exports.declineBooking = (req, res) => {

  const bookingId = req.params.id;
  const vendorId = req.user.vendor_id;

  // 1️⃣ Check booking exists & still searching
  db.query(
    `SELECT id, booking_status, vendor_id 
     FROM bookings 
     WHERE id = ?`,
    [bookingId],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }

      const booking = result[0];

      // ❌ If already assigned
      if (booking.vendor_id !== null) {
        return res.status(400).json({
          success: false,
          message: "Booking already accepted"
        });
      }

      // ❌ If not searching
      if (booking.booking_status !== "searching") {
        return res.status(400).json({
          success: false,
          message: "Cannot decline this booking"
        });
      }

      // 2️⃣ Check already declined
      db.query(
        `SELECT id 
         FROM booking_vendor_actions
         WHERE booking_id = ? AND vendor_id = ?`,
        [bookingId, vendorId],
        (err, actionResult) => {

          if (err) {
            return res.status(500).json({ success: false });
          }

          if (actionResult.length > 0) {
            return res.json({
              success: false,
              message: "Already declined"
            });
          }

          // 3️⃣ Insert decline record
          db.query(
            `INSERT INTO booking_vendor_actions
             (booking_id, vendor_id, action, created_at)
             VALUES (?, ?, 'declined', NOW())`,
            [bookingId, vendorId],
            (err) => {

              if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
              }

              res.json({
                success: true,
                message: "Booking declined"
              });

            }
          );

        }
      );

    }
  );

};

exports.markBookingPaid = (
  booking_id,
  razorpay_payment_id,
  razorpay_signature,
  callback,
) => {
  const updateSql = `
    UPDATE bookings
    SET payment_status = 'paid',
        booking_status = 'confirmed',
        razorpay_payment_id = ?,
        razorpay_signature = ?
    WHERE id = ?
  `;

  db.query(
    updateSql,
    [razorpay_payment_id, razorpay_signature, booking_id],
    callback,
  );
};

//!  START JOB

exports.startJob = (req, res) => {
  const { bookingId, otp } = req.body;

  const sql = `SELECT start_otp FROM bookings WHERE id = ?`;

  db.query(sql, [bookingId], (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ success: false });

    if (result[0].start_otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    db.query(
      `UPDATE bookings SET booking_status = 'in_progress' WHERE id = ?`,
      [bookingId],
      () => {
        return res.json({ success: true, message: "Job Started" });
      },
    );
  });
};

//!  COMPLETE JOB

exports.completeJob = (req, res) => {
  const { bookingId, otp } = req.body;

  const bookingSql = `
    SELECT b.*, s.commission_percent
    FROM bookings b
    JOIN services s ON s.id = b.service_id
    WHERE b.id = ?
  `;

  db.query(bookingSql, [bookingId], (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ success: false });

    const booking = result[0];

    if (booking.end_otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const commission =
      (booking.total_amount * booking.commission_percent) / 100;

    const vendorEarning = booking.total_amount - commission;

    db.query(
      `UPDATE bookings 
       SET booking_status = 'completed',
           commission_amount = ?,
           vendor_earning = ?
       WHERE id = ?`,
      [commission, vendorEarning, bookingId],
      () => {
        return res.json({
          success: true,
          message: "Job Completed",
          commission,
          vendorEarning,
        });
      },
    );
  });
};

exports.getAssignedBookings = (req, res) => {
  const vendorId = req.user.vendor_id;

  const sql = `
    SELECT *
    FROM bookings
    WHERE vendor_id = ?
    AND booking_status IN ('assigned','in_progress','completed')
    ORDER BY created_at DESC
  `;

  db.query(sql, [vendorId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch assigned bookings",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

//!  CANCEL BOOKING

exports.cancelBooking = (req, res) => {
  const { bookingId, cancelledBy } = req.body;

  const status =
    cancelledBy === "user" ? "cancelled_by_user" : "cancelled_by_vendor";

  db.query(
    `UPDATE bookings 
     SET booking_status = ?, payment_status = 'refunded'
     WHERE id = ?`,
    [status, bookingId],
    (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        message: "Booking Cancelled",
      });
    },
  );
};
