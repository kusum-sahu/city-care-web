const pool = require("../config/db.promise");

/**
 * @param {import("mysql2/promise").PoolConnection|null} [conn]
 * @returns {import("mysql2/promise").Pool|import("mysql2/promise").PoolConnection}
 */
function db(conn) {
  return conn || pool;
}

/**
 * Find user by primary key.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findById(id, conn) {
  const [rows] = await db(conn).query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
}

/**
 * Find user by email.
 * @param {string} email
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByEmail(email, conn) {
  const [rows] = await db(conn).query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

/**
 * Find user by mobile.
 * @param {string} mobile
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByMobile(mobile, conn) {
  const [rows] = await db(conn).query("SELECT * FROM users WHERE mobile = ?", [mobile]);
  return rows[0] || null;
}

/**
 * Find user by email with role name (join roles).
 * @param {string} email
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByEmailWithRole(email, conn) {
  const [rows] = await db(conn).query(
    `SELECT u.*, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
    [email]
  );
  return rows[0] || null;
}

/**
 * Find user by id with role name.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdWithRole(id, conn) {
  const [rows] = await db(conn).query(
    `SELECT u.*, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0] || null;
}

/**
 * Insert user. Returns insertId.
 * @param {object} data - role_id, name, email, mobile, password, is_verified?, status?, latitude?, longitude?
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function insert(data, conn) {
  const [
    role_id,
    name,
    email,
    mobile,
    password,
    is_verified = 0,
    status = "active",
    latitude = null,
    longitude = null,
  ] = [
    data.role_id,
    data.name,
    data.email,
    data.mobile,
    data.password,
    data.is_verified,
    data.status,
    data.latitude,
    data.longitude,
  ];
  const [result] = await db(conn).query(
    `INSERT INTO users (role_id, name, email, mobile, password, is_verified, status, latitude, longitude)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [role_id, name, email, mobile, password, is_verified, status, latitude, longitude]
  );
  return result.insertId;
}

/**
 * Update user by id. Returns affected rows.
 * @param {number} id
 * @param {object} data - fields to update (e.g. name, email, status, password, latitude, longitude)
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function update(id, data, conn) {
  const allowed = [
    "role_id",
    "name",
    "email",
    "mobile",
    "password",
    "is_verified",
    "status",
    "latitude",
    "longitude",
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
    `UPDATE users SET ${set.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
}

/**
 * Update user coordinates.
 * @param {number} id
 * @param {number|null} latitude
 * @param {number|null} longitude
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<number>}
 */
async function updateCoordinates(id, latitude, longitude, conn) {
  const [result] = await db(conn).query(
    "UPDATE users SET latitude = ?, longitude = ? WHERE id = ?",
    [latitude, longitude, id]
  );
  return result.affectedRows;
}

module.exports = {
  findById,
  findByEmail,
  findByMobile,
  findByEmailWithRole,
  findByIdWithRole,
  insert,
  update,
  updateCoordinates,
};
