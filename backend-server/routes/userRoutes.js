const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;
