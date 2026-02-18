const cron = require("node-cron");
const db = require("../config/db");

cron.schedule("*/1 * * * *", () => {
  console.log("Running auto cancel check...");

  const sql = `
    UPDATE bookings
    SET booking_status = 'cancelled',
        cancelled_at = NOW()
    WHERE booking_status = 'pending'
    AND booking_start < NOW()
    AND TIMESTAMPDIFF(MINUTE, booking_start, NOW()) > 1
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Auto cancel error:", err);
      return;
    }

    if (result.affectedRows > 0) {
      console.log(`Auto cancelled bookings: ${result.affectedRows}`);
    } else {
      console.log("No bookings to cancel");
    }
  });
});
