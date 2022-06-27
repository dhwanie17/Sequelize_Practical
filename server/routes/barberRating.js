const express = require("express");
const barber = require("../controllers/barberRating.js")
const router = express.Router();
router.get("/get",barber.GetAllBarberRatings)
module.exports= router;