const { User, Saloon, Barber, SaloonRating, BarberRating  } = require('../models');
const jwt = require("jsonwebtoken")
exports.SignUp = async (req, res) => {
    //add new user and return 201
    email = req.body.email,
        dup_email = await User.findOne({ where: { email: email } })
    if (dup_email) {
        res.status(400).json("Duplicate Entry");
    } else {
        var usr = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            mobile_number: req.body.mobile_number,
        }
        created_user = await User.create(usr);
        res.status(201).json(created_user);
    }
}

exports.GetAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}

exports.LogIn = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    email = req.body.email,
        password = req.body.password,

        loggin_user = await User.findOne({ where: { email: email, password: password } })
    if (loggin_user) {
        var usr = {
            email: req.body.email,
            password: req.body.password,
        }
        const authToken = jwt.sign(usr, SECRET_KEY);
        req.authToken = authToken;
        return res.status(200).json({
            success: true, authorization: req.authToken,
        });
    } else {
        return res.status(400).json({ success: false, message: "Invalid Password or Email or User Does not exists " });
    }
}

exports.GetSaloons = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    if (!req.headers['authorization']) {
        console.log("JWT")
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        const there = User.findAll({ where: { email: decoded.email, password: decoded.password } })
        if (there) {
            const saloons = await Saloon.findAll();
            return res.status(200).json({ success: true, saloons });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}

exports.GetBarbers = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    if (!req.headers['authorization']) {
        console.log("JWT")
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        const there = User.findAll({ where: { email: decoded.email, password: decoded.password } })
        if (there) {
            const barbers = await Barber.findAll();
            return res.status(200).json({ success: true, barbers });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}

exports.RateBarber = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        const there = User.findAll({ where: { email: decoded.email, password: decoded.password } })
        if (there) {
            barber_id = req.body.barber_id
            rating = req.body.rating;
            if(rating <= 5){
                const rate = await Barber.findOne({where: {id : barber_id} });

     const z = rate.rating;
     if(z=="0"){
        const find1 = await Barber.update({rating: rating},{where: {id : barber_id} })
        if(find1){
            const barber = await Barber.findOne({where: {id : barber_id} });
    return res.status(200).json({ success: true, barber });
            }
     }
    const Updaterate = (rating+ z)/2;
            const find = await Barber.update({rating: Updaterate},{where: {id : barber_id} })
          if(find){
        const barber = await Barber.findOne({where: {id : barber_id} });
return res.status(200).json({ success: true, barber });
        }
    }else{
        return res.status(400).json({ success: false, message: 'Rate between 1 -  5' });
    }
    }
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message:"Barber is not registred"  })
    }   
}

exports.RateSaloon = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        const there = User.findAll({ where: { email: decoded.email, password: decoded.password } })
        if (there) {
            saloon_id = req.body.saloon_id
            rating = req.body.rating;
            if(rating <= 5){
                const rate = await Saloon.findOne({where: {id : saloon_id} });
     const z = rate.rating;
     if(z=="0"){
        const find1 = await Saloon.update({rating: rating},{where: {id : saloon_id} })
        if(find1){
            const barber = await Saloon.findOne({where: {id : saloon_id} });
    return res.status(200).json({ success: true, barber });
            }
     }
    const Updaterate = (rating+ z)/2;
            const find = await Saloon.update({rating: Updaterate},{where: {id : saloon_id} })
          if(find){
        const saloon = await Saloon.findOne({where: {id : saloon_id} });
return res.status(200).json({ success: true, saloon });
        }
    }else{
        return res.status(400).json({ success: false, message: 'Rate between 1 -  5' });
    }
    }
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error:error  })
    }
}