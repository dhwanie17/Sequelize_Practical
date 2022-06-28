const express = require("express");
const owner = require("../controllers/owner.js")
const router = express.Router();
router.post('/create', owner.SignUp)
router.post('/login', owner.LogIn)
router.get("/get", owner.GetAllOwners)
router.post('/add_saloon', owner.add_saloon)

module.exports = router;