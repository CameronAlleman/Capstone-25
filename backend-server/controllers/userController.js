"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const { User, Reservation } = require("../models");

// finds all users in DB, then sends array as response
const getUsers = (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // or use findOne if needed
    if (!user) {
      return res.status(404).json({ result: 404, error: "User not found." });
    }
    return res.status(200).json({ result: 200, data: user });
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({ result: 500, error: err.message });
  }
};

// uses JSON from request body to create new user in DB
const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!password || !userName) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// uses JSON from request body to update user ID from params
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      console.log("body: ", req.body);

      await user.update(req.body);
      console.log("updatedUser:  ", user);
    } else {
      return res
        .status(401)
        .json({
          result: 401,
          error: `User with id "${req.params.id}" not found.`,
        });
    }

    return res.status(200).json({ result: 200, data: user });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ result: 500, error: err.message });
  }
};
// deletes user matching ID from params

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userExists = await User.findOne({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    //check for outstanding reservations

    const hasReservation = await Reservation.findAll({
      where: { user_id: userId },
    });

    if (hasReservation.length > 0) {
      return res.status(400).json({
        error: "User has a reservation and cannot be deleted",
      });
    }

    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//Validate User

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log("Login attempt:", { userName, passwordProvided: !!password });

    if (!userName || !password) {
      console.log("Missing username or password");
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ where: { userName } });
    console.log("User found:", user ? user.toJSON() : null);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Double-check field name:

    const hashedPassword = user.password;
    console.log("Hashed password:", hashedPassword);

    if (!hashedPassword) {
      console.log("No hashed password found for user");
      return res.status(500).json({ error: "User has no password set." });
    }
    console.log("Comparing password:", password);
    console.log("against hashed password", hashedPassword);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    console.log("Login successful, sending token");

    return res.status(200).json({
      message: "Login successful",
      token,
      userName: user.userName,
      userId: user.id,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
