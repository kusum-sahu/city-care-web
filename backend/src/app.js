const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/roles", require("./routes/roles.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/vendors", require("./routes/vendor.routes"));
app.use("/api", require("./routes/booking.routes"));
app.use("/api", require("./routes/availability.routes"));
app.use("/api", require("./routes/review.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

// Central error handler (must be last)
app.use(errorHandler);

module.exports = app;
