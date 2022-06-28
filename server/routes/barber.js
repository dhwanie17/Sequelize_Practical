const express = require("express");
const barber = require("../controllers/barber.js")
const router = express.Router();
router.get("/get", barber.GetAllBarbers)
module.exports = router;