const { Reservation } = require("../models");

// Create a reservation
const createReservation = async (req, res) => {
  try {
    const { userId, campgroundId, arrivalDate, departureDate } = req.body;

    //check for valid data
    if (!userId || !campgroundId || !arrivalDate || !departureDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const reservation = await Reservation.create({
      userId,
      campgroundId,
      arrivalDate,
      departureDate,
    });

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (err) {
    console.error("Create reservation error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all reservations for a user
const getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.findAll({
      where: { userId },
    });

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Fetch reservations error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Cancel a reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await Reservation.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    console.error("Delete reservation error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { arrivalDate, departureDate, status } = req.body;

    const updated = await Reservation.update(
      { arrivalDate, departureDate, status },
      { where: { id }, returning: true }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res
      .status(200)
      .json({ message: "Reservation updated", reservation: updated[1][0] });
  } catch (err) {
    console.error("Update reservation error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  deleteReservation,
  updateReservation,
};
