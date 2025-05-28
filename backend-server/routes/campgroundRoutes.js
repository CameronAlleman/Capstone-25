const express = require("express");
const router = express.Router();
const campgroundController = require("../controllers/campgroundController");

router.get("/", campgroundController.getCampgrounds);
router.get("/:id", campgroundController.getCampgroundById);
router.post("/", campgroundController.createCampground);
router.put("/:id", campgroundController.updateCampground);
router.delete("/:id", campgroundController.deleteCampground);

module.exports = router;
