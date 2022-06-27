const {BarberRating} = require('../models');

exports.GetAllBarberRatings = async(req,res,next)=>{
        try {
          const barberRating = await BarberRating.findAll();
          return res.status(200).json({ success: true, barberRating });
        } catch (error) {
            console.log(error)
          return res.status(500).json({ success: false, error: error })
        }
}
