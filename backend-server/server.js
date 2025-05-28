const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./dbConnect"); //

app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 8081;

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

//sync DB then start server
sequelize
  .sync({ force: false }) //update force to true if tables are not synced
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
