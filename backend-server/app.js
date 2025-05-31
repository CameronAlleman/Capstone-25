const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
const userRoute = require("./routes/userRoutes");
app.use("/api/users", userRoute);

const reservationRoute = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoute);

const campgroundRoutes = require("./routes/campgroundRoutes");
app.use("/api/campgrounds", campgroundRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my My campSphere application." });
});

module.exports = app;
