const {SaloonRating} = require('../models');

exports.GetAllSaloonRatings = async(req,res,next)=>{
        try {
          const saloonRating = await SaloonRating.findAll();
          return res.status(200).json({ success: true, saloonRating });
        } catch (error) {
            console.log(error)
          return res.status(500).json({ success: false, error: error })
        }
}
