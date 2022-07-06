const { Barber, Saloon } = require('../models');
const logger = require("../config/logger.js")


exports.GetAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll();
        logger.info("Successfully got the list of barbers")
        return res.status(200).json({ success: true, barbers });
    } catch (error) {
        console.log(error)
        logger.error("Some error occured")
        return res.status(500).json({ success: false, error: error })
    }
}