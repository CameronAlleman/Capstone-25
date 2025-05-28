const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
// const siteRoutes = require("./siteRoutes");
const reservationRoutes = require("./reservationRoutes");
const campgroundRoutes = require("./campgroundRoutes");
// const amenitiesRoutes = require("./amenitiesRoutes");

router.use("/users", userRoutes);
// router.use("/sites", siteRoutes);
router.use("/campgrounds", campgroundRoutes);
router.use("/reservations", reservationRoutes);
// router.use("/amenities", amenitiesRoutes);

module.exports = router;
