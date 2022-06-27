const express = require("express");
const saloonRating = require("../controllers/saloonRating.js")
const router = express.Router();
router.get("/get",saloonRating.GetAllSaloonRatings)
module.exports= router;