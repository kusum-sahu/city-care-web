const userRepository = require("../repositories/user.repository");
const vendorRepository = require("../repositories/vendor.repository");
const bookingRepository = require("../repositories/booking.repository");
const { calculateDistance } = require("../utils/geo");
const { NotFoundError } = require("../utils/errors");

/**
 * Auto-assign best available vendor for a booking.
 * Uses GPS-based distance, rating, active bookings, and max_daily_jobs.
 *
 * @param {number} userId - User ID
 * @param {number} serviceId - Service ID
 * @param {string} bookingDate - Booking date (YYYY-MM-DD)
 * @param {import("mysql2/promise").PoolConnection} [conn] - Optional transaction connection
 * @returns {Promise<number|null>} Best vendor_id or null if none available
 */
async function assignBestVendor(userId, serviceId, bookingDate, conn = null) {
  // 1. Fetch user coordinates
  const user = await userRepository.findById(userId, conn);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!user.latitude || !user.longitude) {
    // User has no location data - cannot assign vendor automatically
    return null;
  }

  const userLat = parseFloat(user.latitude);
  const userLon = parseFloat(user.longitude);

  // 2. Find vendors offering this service (is_online = 1)
  const vendors = await vendorRepository.findByServiceId(serviceId, true, conn);

  if (vendors.length === 0) {
    return null;
  }

  // 3. Filter vendors within 5km and calculate distance
  const vendorsWithDistance = [];
  for (const vendor of vendors) {
    if (!vendor.latitude || !vendor.longitude) {
      continue; // Skip vendors without location
    }

    const vendorLat = parseFloat(vendor.latitude);
    const vendorLon = parseFloat(vendor.longitude);

    const distance = calculateDistance(userLat, userLon, vendorLat, vendorLon);

    if (distance <= 5) {
      // Within 5km
      vendorsWithDistance.push({
        vendor,
        distance,
      });
    }
  }

  if (vendorsWithDistance.length === 0) {
    return null;
  }

  // 4. Count active bookings for each vendor on bookingDate
  const vendorsWithActiveBookings = await Promise.all(
    vendorsWithDistance.map(async ({ vendor, distance }) => {
      const activeBookings = await bookingRepository.countActiveByVendorAndDate(
        vendor.id,
        bookingDate,
        conn
      );

      return {
        vendor,
        distance,
        activeBookings,
      };
    })
  );

  // 5. Filter vendors where active bookings < max_daily_jobs
  const eligibleVendors = vendorsWithActiveBookings.filter(
    ({ vendor, activeBookings }) => activeBookings < vendor.max_daily_jobs
  );

  if (eligibleVendors.length === 0) {
    return null;
  }

  // 6. Sort by:
  //    - rating DESC
  //    - active bookings ASC (less busy first)
  //    - distance ASC (closer first)
  eligibleVendors.sort((a, b) => {
    // First: rating DESC
    const ratingDiff = (b.vendor.rating || 0) - (a.vendor.rating || 0);
    if (ratingDiff !== 0) {
      return ratingDiff;
    }

    // Second: active bookings ASC
    const bookingsDiff = a.activeBookings - b.activeBookings;
    if (bookingsDiff !== 0) {
      return bookingsDiff;
    }

    // Third: distance ASC
    return a.distance - b.distance;
  });

  // 7. Return best vendor_id
  return eligibleVendors[0].vendor.id;
}

module.exports = {
  assignBestVendor,
};
