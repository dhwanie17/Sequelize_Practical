const express = require("express");
const user = require("../controllers/user.js")
const router = express.Router();
router.post('/create', user.SignUp)
router.post('/login', user.LogIn)
router.get("/get", user.GetAllUsers)
router.get("/getsaloons", user.GetSaloons)
router.get("/getbarbers", user.GetBarbers)
router.put("/ratesaloon", user.RateSaloon)
router.put("/ratebarber", user.RateBarber)

module.exports = router;