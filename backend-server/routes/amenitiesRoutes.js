const express = require("express");
const router = express.Router();
const Controllers = require("controllers");

router.get("/", (req, res) => {
  Controllers.amenitiesController.getAmenities(res);
});

router.post("/create", (req, res) => {
  Controllers.amenitiesController.createAmenities(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.amenitiesController.updateAmenities(req, res);
});

module.exports = router;
