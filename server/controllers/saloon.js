const {Saloon,Barber} = require('../models');
const jwt = require("jsonwebtoken")


exports.GetAllSaloons = async(req,res,next)=>{
        try {
          const saloons = await Saloon.findAll();
          return res.status(200).json({ success: true, saloons });
        } catch (error) {
            console.log(error)
          return res.status(500).json({ success: false, error: error })
        }
}


exports.add_barber = async (req, res) => {
  try {
      saloon_id = req.body.saloon_id;
      //add new barber and return 201
      const there = Saloon.findAll({ where: { id: saloon_id } })
      if (there) {
          var barber = {
              saloon_id: req.body.saloon_id,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              rating: req.body.rating
          }
          created_barber = await Barber.create(barber);
          res.status(201).json(created_barber);
      }
  } catch (err) {
      return res.status(401).json({ success: false, message: "Saloon is not Registered" });
  }
}
