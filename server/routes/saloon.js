const express = require("express");
const saloon = require("../controllers/saloon.js")
const router = express.Router();
router.get("/get", saloon.GetAllSaloons)
router.post('/add_barber', saloon.add_barber)

module.exports = router;