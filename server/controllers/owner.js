const { Owner, Saloon, Barber } = require('../models');
const jwt = require("jsonwebtoken")
exports.SignUp = async (req, res) => {
    //add new owner and return 201
    console.log("Signning in")
    email = req.body.email,
        dup_email = await Owner.findOne({ where: { email: email } })
    if (dup_email) {
        res.status(400).json("Duplicate Entry");
    } else {
        var owner = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            mobile_number: req.body.mobile_number,
        }
        created_owner = await Owner.create(owner);
        res.status(201).json(created_owner);
    }
}

exports.GetAllOwners = async (req, res, next) => {
    try {
        const owners = await Owner.findAll();
        return res.status(200).json({ success: true, owners });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}

exports.LogIn = async (req, res, next) => {
    const SECRET_KEY = 'some-secret-key';
    email = req.body.email,
        password = req.body.password,

        loggin_owner = await Owner.findOne({ where: { email: email, password: password } })
    if (loggin_owner) {
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
        return res.status(400).json({ success: false, message: "Invalid Password or Email or Owner Does not exists " });
    }
}

exports.add_saloon = async (req, res) => {
    const SECRET_KEY = 'some-secret-key';

    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        const there = Owner.findAll({ where: { email: decoded.email, password: decoded.password } })
        console.log("trying")
        if (there) {
            var saloon = {
                owner_id: req.body.owner_id,
                saloon_name: req.body.saloon_name,
                mobile_number: req.body.mobile_number,
                rating: req.body.rating
            }
            created_saloon = await Saloon.create(saloon);
            console.log("Looking")
            res.status(201).json(created_saloon);
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Owner is not registered" });
    }
}
