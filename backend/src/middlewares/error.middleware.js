const { AppError } = require("../utils/errors");
const { error } = require("../utils/response");

/**
 * Central error handling middleware.
 * Must be registered after all routes.
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return error(res, err.statusCode, err.message, err.details);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return error(res, 401, "Invalid token");
  }
  if (err.name === "TokenExpiredError") {
    return error(res, 401, "Token expired");
  }

  // Log unexpected errors
  console.error("[error.middleware]", err);

  return error(res, 500, "Internal server error");
};

module.exports = errorHandler;
