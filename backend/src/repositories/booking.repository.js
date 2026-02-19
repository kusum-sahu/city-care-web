const pool = require("../config/db.promise");

/**
 * @param {import("mysql2/promise").PoolConnection|null} [conn]
 * @returns {import("mysql2/promise").Pool|import("mysql2/promise").PoolConnection}
 */
function db(conn) {
  return conn || pool;
}

/**
 * Find booking by primary key.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findById(id, conn) {
  const [rows] = await db(conn).query("SELECT * FROM bookings WHERE id = ?", [id]);
  return rows[0] || null;
}

/**
 * Find booking by id with row lock (for use inside transaction).
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdForUpdate(id, conn) {
  const [rows] = await db(conn).query(
    "SELECT * FROM bookings WHERE id = ? FOR UPDATE",
    [id]
  );
  return rows[0] || null;
}

/**
 * Find booking with service details.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdWithService(id, conn) {
  const [rows] = await db(conn).query(
    `SELECT b.*, s.name AS service_name, s.duration_minutes, s.price AS service_price
     FROM bookings b
     JOIN services s ON b.service_id = s.id
     WHERE b.id = ?`,
    [id]
  );
  return rows[0] || null;
}

/**
 * Find booking with service and vendor (for commission: vendor.commission_rate).
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdWithVendor(id, conn) {
  const [rows] = await db(conn).query(
    `SELECT b.*, s.name AS service_name, v.commission_rate, v.wallet_balance, v.total_earnings
     FROM bookings b
     JOIN services s ON b.service_id = s.id
     LEFT JOIN vendors v ON b.vendor_id = v.id
     WHERE b.id = ?`,
    [id]
  );
  return rows[0] || null;
}

/**
 * Insert booking. Returns insertId.
 * @param {object} data - user_id, vendor_id?, service_id, booking_start, booking_end, total_amount, commission_amount?, vendor_earning?, start_otp?, end_otp?, payment_status?, booking_status?, razorpay_order_id?
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function insert(data, conn) {
  const [
    user_id,
    vendor_id,
    service_id,
    booking_start,
    booking_end,
    total_amount,
    commission_amount,
    vendor_earning,
    start_otp,
    end_otp,
    payment_status,
    booking_status,
    razorpay_order_id,
  ] = [
    data.user_id,
    data.vendor_id ?? null,
    data.service_id,
    data.booking_start,
    data.booking_end,
    data.total_amount,
    data.commission_amount ?? null,
    data.vendor_earning ?? null,
    data.start_otp ?? null,
    data.end_otp ?? null,
    data.payment_status ?? "pending",
    data.booking_status ?? "pending",
    data.razorpay_order_id ?? null,
  ];
  const [result] = await db(conn).query(
    `INSERT INTO bookings (
       user_id, vendor_id, service_id, booking_start, booking_end,
       total_amount, commission_amount, vendor_earning, start_otp, end_otp,
       payment_status, booking_status, razorpay_order_id
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      vendor_id,
      service_id,
      booking_start,
      booking_end,
      total_amount,
      commission_amount,
      vendor_earning,
      start_otp,
      end_otp,
      payment_status,
      booking_status,
      razorpay_order_id,
    ]
  );
  return result.insertId;
}

/**
 * Update booking by id. Returns affected rows.
 * @param {number} id
 * @param {object} data - booking_status?, payment_status?, vendor_id?, commission_amount?, vendor_earning?, razorpay_order_id?, razorpay_payment_id?, razorpay_signature?, start_otp?, end_otp?, cancelled_at?
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function update(id, data, conn) {
  const allowed = [
    "vendor_id",
    "booking_status",
    "total_amount",
    "commission_amount",
    "vendor_earning",
    "start_otp",
    "end_otp",
    "payment_status",
    "cancelled_at",
    "razorpay_order_id",
    "razorpay_payment_id",
    "razorpay_signature",
  ];
  const set = [];
  const values = [];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      set.push(`\`${key}\` = ?`);
      values.push(data[key]);
    }
  }
  if (set.length === 0) return 0;
  values.push(id);
  const [result] = await db(conn).query(
    `UPDATE bookings SET ${set.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
}

/**
 * Set payment success fields on booking.
 * @param {number} id
 * @param {string} razorpayPaymentId
 * @param {string} razorpaySignature
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function updatePaymentSuccess(id, razorpayPaymentId, razorpaySignature, conn) {
  const [result] = await db(conn).query(
    `UPDATE bookings
     SET payment_status = 'paid',
         razorpay_payment_id = ?,
         razorpay_signature = ?
     WHERE id = ?`,
    [razorpayPaymentId, razorpaySignature, id]
  );
  return result.affectedRows;
}

/**
 * Count active bookings for vendor on given date (assigned or in_progress).
 * @param {number} vendorId
 * @param {string} date - YYYY-MM-DD
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function countActiveByVendorAndDate(vendorId, date, conn) {
  const [rows] = await db(conn).query(
    `SELECT COUNT(*) AS cnt
     FROM bookings
     WHERE vendor_id = ?
       AND DATE(booking_start) = ?
       AND booking_status IN ('assigned', 'in_progress')`,
    [vendorId, date]
  );
  return rows[0]?.cnt ?? 0;
}

/**
 * List bookings by vendor and status list.
 * @param {number} vendorId
 * @param {string[]} statuses - e.g. ['assigned','in_progress','completed']
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function listByVendor(vendorId, statuses, conn) {
  if (!statuses || statuses.length === 0) return [];
  const placeholders = statuses.map(() => "?").join(",");
  const [rows] = await db(conn).query(
    `SELECT * FROM bookings
     WHERE vendor_id = ?
       AND booking_status IN (${placeholders})
     ORDER BY booking_start DESC`,
    [vendorId, ...statuses]
  );
  return rows;
}

/**
 * List bookings by user_id, optional status filter.
 * @param {number} userId
 * @param {string[]|null} statuses - if null, no filter
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function listByUser(userId, statuses = null, conn) {
  let sql = "SELECT * FROM bookings WHERE user_id = ?";
  const params = [userId];
  if (statuses && statuses.length > 0) {
    sql += ` AND booking_status IN (${statuses.map(() => "?").join(",")})`;
    params.push(...statuses);
  }
  sql += " ORDER BY booking_start DESC";
  const [rows] = await db(conn).query(sql, params);
  return rows;
}

/**
 * List pending unpaid bookings created more than N minutes ago (for auto-cancel cron).
 * @param {number} olderThanMinutes
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function listUnpaidPendingOlderThan(olderThanMinutes, conn) {
  const [rows] = await db(conn).query(
    `SELECT * FROM bookings
     WHERE booking_status = 'pending'
       AND payment_status = 'pending'
       AND created_at < DATE_SUB(NOW(), INTERVAL ? MINUTE)
     ORDER BY id`,
    [olderThanMinutes]
  );
  return rows;
}

module.exports = {
  findById,
  findByIdForUpdate,
  findByIdWithService,
  findByIdWithVendor,
  insert,
  update,
  updatePaymentSuccess,
  countActiveByVendorAndDate,
  listByVendor,
  listByUser,
  listUnpaidPendingOlderThan,
};
