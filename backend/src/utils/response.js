/**
 * Centralized response helpers for consistent API format.
 */

const ok = (res, data = null, message = "OK") => {
  return res.status(200).json({ success: true, message, data });
};

const created = (res, data = null, message = "Created") => {
  return res.status(201).json({ success: true, message, data });
};

const error = (res, statusCode, message, details = null) => {
  const payload = { success: false, message };
  if (details != null) {
    payload.details = details;
  }
  return res.status(statusCode).json(payload);
};

module.exports = {
  ok,
  created,
  error,
};
