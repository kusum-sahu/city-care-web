const db = require("../config/db");
exports.getServiceSlots = (req, res) => {
  const { serviceId } = req.params;

  const serviceSql = `
    SELECT name, price, duration_minutes
    FROM services
    WHERE id = ?
  `;

  db.query(serviceSql, [serviceId], (err, result) => {
    if (err) return res.status(500).json({ success: false });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const service = result[0];

    const startHour = 10;
    const endHour = 20;
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        start_time: `${hour}:00:00`,
        end_time: `${hour + 1}:00:00`,
        label: `${formatTime(hour)} - ${formatTime(hour + 1)}`
      });
    }

    res.json({
      success: true,
      service_name: service.name,
      service_price: service.price,
      service_duration: service.duration_minutes,
      slots
    });
  });
};

function formatTime(hour) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${ampm}`;
}
