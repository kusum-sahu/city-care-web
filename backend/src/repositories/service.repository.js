const pool = require("../config/db.promise");

/**
 * @param {import("mysql2/promise").PoolConnection|null} [conn]
 * @returns {import("mysql2/promise").Pool|import("mysql2/promise").PoolConnection}
 */
function db(conn) {
  return conn || pool;
}

/**
 * Find service by primary key.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findById(id, conn) {
  const [rows] = await db(conn).query("SELECT * FROM services WHERE id = ?", [id]);
  return rows[0] || null;
}

/**
 * Find service by id where is_available = 1.
 * @param {number} id
 * @param {import("mysql2/promise").PoolConnection} [conn]
 * @returns {Promise<object|null>}
 */
async function findByIdAndAvailable(id, conn) {
  const [rows] = await db(conn).query(
    "SELECT * FROM services WHERE id = ? AND is_available = 1",
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  findById,
  findByIdAndAvailable,
};
