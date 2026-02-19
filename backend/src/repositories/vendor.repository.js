const pool = require("../config/db.promise");

/**
 * @param {import("mysql2/promise").PoolConnection|null} [conn]
 * @returns {import("mysql2/promise").Pool|import("mysql2/promise").PoolConnection}
 */
function db(conn) {
  return conn || pool;
}

/**
 * Find vendor by primary key.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findById(id, conn) {
  const [rows] = await db(conn).query("SELECT * FROM vendors WHERE id = ?", [id]);
  return rows[0] || null;
}

/**
 * Find vendor by user_id.
 * @param {number} userId
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByUserId(userId, conn) {
  const [rows] = await db(conn).query("SELECT * FROM vendors WHERE user_id = ?", [userId]);
  return rows[0] || null;
}

/**
 * Find vendor by id with user and role (join users, roles).
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdWithUser(id, conn) {
  const [rows] = await db(conn).query(
    `SELECT v.*, u.name AS user_name, u.email, u.mobile, r.name AS role
     FROM vendors v
     JOIN users u ON v.user_id = u.id
     JOIN roles r ON u.role_id = r.id
     WHERE v.id = ?`,
    [id]
  );
  return rows[0] || null;
}

/**
 * Vendor ids that offer a service (via vendor_services). No other filters.
 * @param {number} serviceId
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number[]>}
 */
async function findVendorIdsByServiceId(serviceId, conn) {
  const [rows] = await db(conn).query(
    "SELECT vendor_id FROM vendor_services WHERE service_id = ?",
    [serviceId]
  );
  return rows.map((r) => r.vendor_id);
}

/**
 * Vendors that offer service_id, with optional is_online filter. Returns full vendor rows.
 * @param {number} serviceId
 * @param {boolean|null} isOnline - if null, no filter
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object[]>}
 */
async function findByServiceId(serviceId, isOnline = null, conn) {
  let sql = `SELECT v.*
             FROM vendors v
             INNER JOIN vendor_services vs ON vs.vendor_id = v.id
             WHERE vs.service_id = ?`;
  const params = [serviceId];
  if (isOnline !== null) {
    sql += " AND v.is_online = ?";
    params.push(isOnline ? 1 : 0);
  }
  const [rows] = await db(conn).query(sql, params);
  return rows;
}

/**
 * Insert vendor. Returns insertId.
 * @param {object} data - user_id, business_name?, contact_person?, district?, service_area?, experience_years?, bank_name?, account_number?, ifsc_code?, rating?, commission_rate?, service_type_id?, ...
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function insert(data, conn) {
  const [
    user_id,
    business_name,
    contact_person,
    district,
    service_area,
    experience_years,
    bank_name,
    account_number,
    ifsc_code,
    rating,
    commission_rate,
    service_type_id,
    is_online,
    max_daily_jobs,
    latitude,
    longitude,
    start_work_time,
    end_work_time,
  ] = [
    data.user_id,
    data.business_name ?? null,
    data.contact_person ?? null,
    data.district ?? null,
    data.service_area ?? null,
    data.experience_years ?? null,
    data.bank_name ?? null,
    data.account_number ?? null,
    data.ifsc_code ?? null,
    data.rating ?? 0,
    data.commission_rate ?? 10,
    data.service_type_id ?? null,
    data.is_online ?? 1,
    data.max_daily_jobs ?? 5,
    data.latitude ?? null,
    data.longitude ?? null,
    data.start_work_time ?? "09:00:00",
    data.end_work_time ?? "20:00:00",
  ];
  const [result] = await db(conn).query(
    `INSERT INTO vendors (
       user_id, business_name, contact_person, district, service_area,
       experience_years, bank_name, account_number, ifsc_code, rating,
       commission_rate, service_type_id, is_online, max_daily_jobs,
       latitude, longitude, start_work_time, end_work_time
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      business_name,
      contact_person,
      district,
      service_area,
      experience_years,
      bank_name,
      account_number,
      ifsc_code,
      rating,
      commission_rate,
      service_type_id,
      is_online,
      max_daily_jobs,
      latitude,
      longitude,
      start_work_time,
      end_work_time,
    ]
  );
  return result.insertId;
}

/**
 * Update vendor by id. Returns affected rows.
 * @param {number} id
 * @param {object} data - fields to update
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function update(id, data, conn) {
  const allowed = [
    "business_name",
    "contact_person",
    "district",
    "service_area",
    "experience_years",
    "bank_name",
    "account_number",
    "ifsc_code",
    "rating",
    "commission_rate",
    "total_earnings",
    "verification_status",
    "bank_verified",
    "wallet_balance",
    "total_withdrawn",
    "profile_completed",
    "service_type_id",
    "is_online",
    "max_daily_jobs",
    "latitude",
    "longitude",
    "total_reviews",
    "start_work_time",
    "end_work_time",
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
    `UPDATE vendors SET ${set.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
}

/**
 * Increment vendor wallet_balance and total_earnings (e.g. after earning credit).
 * @param {number} vendorId
 * @param {number} walletDelta - amount to add to wallet_balance
 * @param {number} earningsDelta - amount to add to total_earnings
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function updateWalletAndEarnings(vendorId, walletDelta, earningsDelta, conn) {
  const [result] = await db(conn).query(
    `UPDATE vendors
     SET wallet_balance = wallet_balance + ?,
         total_earnings = total_earnings + ?
     WHERE id = ?`,
    [walletDelta, earningsDelta, vendorId]
  );
  return result.affectedRows;
}

module.exports = {
  findById,
  findByUserId,
  findByIdWithUser,
  findVendorIdsByServiceId,
  findByServiceId,
  insert,
  update,
  updateWalletAndEarnings,
};
