const { Barber, Saloon } = require('../models');


exports.GetAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll();
        return res.status(200).json({ success: true, barbers });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}