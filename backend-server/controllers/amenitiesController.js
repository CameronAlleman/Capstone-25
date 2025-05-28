"use strict";

const { Amenities } = require("../models");
// display all amenities
const getAmenities = (res) => {
  Amenities.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
// c
const createAmenities = (data, res) => {
  Amenities.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
//use JSON from req.body to update amenities params
const updateAmenities = (req, res) => {
  Amenities.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.messageS });
    });
};

module.exports = {
  getAmenities,
  createAmenities,
  updateAmenities,
};

module.exports = { getAmenities, createAmenities, updateAmenities };
