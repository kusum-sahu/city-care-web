const pool = require("../config/db.promise");

/**
 * @param {import("mysql2/promise").PoolConnection|null} [conn]
 * @returns {import("mysql2/promise").Pool|import("mysql2/promise").PoolConnection}
 */
function db(conn) {
  return conn || pool;
}

/**
 * Find slot by primary key.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findById(id, conn) {
  const [rows] = await db(conn).query("SELECT * FROM booking_slots WHERE id = ?", [id]);
  return rows[0] || null;
}

/**
 * Find slots that overlap with given window for a vendor on a date.
 * Overlap: slot.start_time < end_time AND slot.end_time > start_time.
 * Optionally exclude slot_id (e.g. when updating same slot).
 * @param {number} vendorId
 * @param {string} slotDate - YYYY-MM-DD
 * @param {string} startTime - HH:MM:SS
 * @param {string} endTime - HH:MM:SS
 * @param {number|null} excludeSlotId
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function findOverlapping(vendorId, slotDate, startTime, endTime, excludeSlotId = null, conn) {
  let sql = `SELECT * FROM booking_slots
             WHERE vendor_id = ?
               AND slot_date = ?
               AND status IN ('locked', 'booked')
               AND end_time > ?
               AND start_time < ?`;
  const params = [vendorId, slotDate, startTime, endTime];
  if (excludeSlotId != null) {
    sql += " AND id != ?";
    params.push(excludeSlotId);
  }
  const [rows] = await db(conn).query(sql, params);
  return rows;
}

/**
 * Find available slot for vendor on date with exact start_time/end_time (for locking).
 * @param {number} vendorId
 * @param {string} slotDate - YYYY-MM-DD
 * @param {string} startTime - HH:MM:SS
 * @param {string} endTime - HH:MM:SS
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findAvailableByVendorDateTime(vendorId, slotDate, startTime, endTime, conn) {
  const [rows] = await db(conn).query(
    `SELECT * FROM booking_slots
     WHERE vendor_id = ?
       AND slot_date = ?
       AND start_time = ?
       AND end_time = ?
       AND status = 'available'
     LIMIT 1`,
    [vendorId, slotDate, startTime, endTime]
  );
  return rows[0] || null;
}

/**
 * Insert booking_slot. Returns insertId.
 * @param {object} data - vendor_id, booking_id?, slot_date, start_time, end_time, status, locked_until?
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function insert(data, conn) {
  const [vendor_id, booking_id, slot_date, start_time, end_time, status, locked_until] = [
    data.vendor_id,
    data.booking_id ?? null,
    data.slot_date,
    data.start_time,
    data.end_time,
    data.status ?? "available",
    data.locked_until ?? null,
  ];
  const [result] = await db(conn).query(
    `INSERT INTO booking_slots (vendor_id, booking_id, slot_date, start_time, end_time, status, locked_until)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [vendor_id, booking_id, slot_date, start_time, end_time, status, locked_until]
  );
  return result.insertId;
}

/**
 * Update slot by id. Returns affected rows.
 * @param {number} id
 * @param {object} data - status?, locked_until?, booking_id?
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function update(id, data, conn) {
  const allowed = ["vendor_id", "booking_id", "slot_date", "start_time", "end_time", "status", "locked_until"];
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
    `UPDATE booking_slots SET ${set.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
}

/**
 * Set slot status (and optional locked_until, booking_id).
 * @param {number} id
 * @param {string} status - 'available' | 'locked' | 'booked'
 * @param {object} opts - { locked_until?, booking_id? }
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function updateStatus(id, status, opts = {}, conn) {
  const { locked_until, booking_id } = opts;
  let sql = "UPDATE booking_slots SET status = ?";
  const values = [status];
  if (locked_until !== undefined) {
    sql += ", locked_until = ?";
    values.push(locked_until);
  }
  if (booking_id !== undefined) {
    sql += ", booking_id = ?";
    values.push(booking_id);
  }
  sql += " WHERE id = ?";
  values.push(id);
  const [result] = await db(conn).query(sql, values);
  return result.affectedRows;
}

/**
 * List slots that are locked and locked_until < NOW() (for unlock cron).
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function listLockedExpired(conn) {
  const [rows] = await db(conn).query(
    `SELECT * FROM booking_slots
     WHERE status = 'locked'
       AND locked_until IS NOT NULL
       AND locked_until < NOW()
     ORDER BY id`,
    []
  );
  return rows;
}

/**
 * Release a locked slot: set status available, clear booking_id and locked_until.
 * @param {number} slotId
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function releaseLock(slotId, conn) {
  const [result] = await db(conn).query(
    `UPDATE booking_slots
     SET status = 'available', booking_id = NULL, locked_until = NULL
     WHERE id = ? AND status = 'locked'`,
    [slotId]
  );
  return result.affectedRows;
}

/**
 * List slots by vendor and date.
 * @param {number} vendorId
 * @param {string} slotDate - YYYY-MM-DD
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function listByVendorAndDate(vendorId, slotDate, conn) {
  const [rows] = await db(conn).query(
    `SELECT * FROM booking_slots
     WHERE vendor_id = ? AND slot_date = ?
     ORDER BY start_time`,
    [vendorId, slotDate]
  );
  return rows;
}

module.exports = {
  findById,
  findOverlapping,
  findAvailableByVendorDateTime,
  insert,
  update,
  updateStatus,
  listLockedExpired,
  releaseLock,
  listByVendorAndDate,
};
