const pool = require("../config/db.promise");
const serviceRepository = require("../repositories/service.repository");
const bookingRepository = require("../repositories/booking.repository");
const bookingSlotRepository = require("../repositories/bookingSlot.repository");
const vendorAssignmentService = require("./vendorAssignment.service");
const { NotFoundError, ConflictError } = require("../utils/errors");

/**
 * Format date as YYYY-MM-DD.
 * @param {Date} d
 * @returns {string}
 */
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Format time as HH:mm:ss.
 * @param {Date} d
 * @returns {string}
 */
function formatTime(d) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/**
 * Create a booking with optional vendor auto-assignment and slot lock.
 *
 * @param {object} params
 * @param {number} params.userId
 * @param {number} params.serviceId
 * @param {string} params.bookingDate - YYYY-MM-DD
 * @param {string} params.startTime - HH:mm or HH:mm:ss
 * @param {string} [params.couponCode]
 * @returns {Promise<object>} Booking summary
 */
async function createBooking({ userId, serviceId, bookingDate, startTime, couponCode }) {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Fetch service (must be available)
    const service = await serviceRepository.findByIdAndAvailable(serviceId, conn);
    if (!service) {
      throw new NotFoundError("Service not found or not available");
    }

    const durationMinutes = Number(service.duration_minutes) || 60;
    const bufferMinutes = Number(service.buffer_minutes) || 0;

    // 2. Compute booking_start and booking_end
    const startTimeNormalized = startTime.length === 5 ? `${startTime}:00` : startTime;
    const bookingStart = new Date(`${bookingDate}T${startTimeNormalized}`);
    if (Number.isNaN(bookingStart.getTime())) {
      throw new ConflictError("Invalid booking date or time");
    }

    const bookingEnd = new Date(
      bookingStart.getTime() + (durationMinutes + bufferMinutes) * 60 * 1000
    );

    // 3. Auto-assign vendor
    const vendorId = await vendorAssignmentService.assignBestVendor(
      userId,
      serviceId,
      bookingDate,
      conn
    );

    // 4. If vendor found, check overlapping slots
    const slotDate = formatDate(bookingStart);
    const startTimeStr = formatTime(bookingStart);
    const endTimeStr = formatTime(bookingEnd);

    if (vendorId) {
      const overlapping = await bookingSlotRepository.findOverlapping(
        vendorId,
        slotDate,
        startTimeStr,
        endTimeStr,
        null,
        conn
      );
      if (overlapping.length > 0) {
        throw new ConflictError("Slot already taken");
      }
    }

    // 5. Insert booking
    const totalAmount = Number(service.price) ?? 0;
    const bookingStatus = vendorId ? "assigned" : "pending";

    const bookingId = await bookingRepository.insert(
      {
        user_id: userId,
        vendor_id: vendorId ?? null,
        service_id: serviceId,
        booking_start: bookingStart,
        booking_end: bookingEnd,
        total_amount: totalAmount,
        payment_status: "pending",
        booking_status: bookingStatus,
      },
      conn
    );

    // 6. If vendor found, lock slot (10 minutes)
    if (vendorId) {
      const lockedUntil = new Date(Date.now() + 10 * 60 * 1000);
      await bookingSlotRepository.insert(
        {
          vendor_id: vendorId,
          booking_id: bookingId,
          slot_date: slotDate,
          start_time: startTimeStr,
          end_time: endTimeStr,
          status: "locked",
          locked_until: lockedUntil,
        },
        conn
      );
    }

    await conn.commit();

    return {
      bookingId,
      userId,
      serviceId,
      vendorId: vendorId ?? null,
      bookingStart,
      bookingEnd,
      totalAmount,
      bookingStatus,
      paymentStatus: "pending",
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = {
  createBooking,
};
