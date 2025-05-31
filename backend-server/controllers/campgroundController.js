"use strict";

const { Campground } = require("../models");

// Get all campgrounds
const getCampgrounds = async (req, res) => {
  try {
    const campgrounds = await Campground.findAll();
    res.status(200).json(campgrounds);
  } catch (err) {
    console.error("Failed to fetch campgrounds:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get one campground by ID
const getCampgroundById = async (req, res) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findByPk(id);

    if (!campground) return res.status(404).json({ error: "Not found" });

    res.status(200).json(campground);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create new campground
const createCampground = async (req, res) => {
  try {
    const { name, location, description, parkMap, phone, email } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required" });
    }

    const newCampground = await Campground.create({
      name,
      parkMap,
      description,
      location,
      phone,
      email,
    });

    res.status(201).json(newCampground);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create campground" });
  }
};

// Update campground
const updateCampground = async (req, res) => {
  try {
    const { id } = req.params;

    const [updatedCount] = await Campground.update(req.body, {
      where: { id },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ error: "Campground not found" });
    }

    const updatedCampground = await Campground.findByPk(id);
    res.status(200).json(updatedCampground);
  } catch (err) {
    console.error("Failed to update campground:", err);
    res.status(500).json({ error: "Failed to update campground" });
  }
};

// Delete campground
const deleteCampground = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Campground.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Not found" });

    res.status(200).json({ message: "Campground deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete campground" });
  }
};

module.exports = {
  getCampgrounds,
  getCampgroundById,
  createCampground,
  updateCampground,
  deleteCampground,
};
