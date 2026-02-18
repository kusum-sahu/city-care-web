const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/roles", require("./routes/roles.routes"));//get
app.use("/api/users", require("./routes/users.routes"));//post
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/vendors", require("./routes/vendor.routes"));
app.use("/api", require("./routes/booking.routes"));
app.use("/api", require("./routes/availability.routes"));
app.use("/api", require("./routes/review.routes")); 
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

module.exports = app;
