const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');
const db = require("./models");
const { Saloon, User, Barber, Owner, Sequelize } = require('./models');
const jwt = require("jsonwebtoken")
const UserRouter = require("./routes/user.js");
const OwnerRouter = require("./routes/owner.js");
const SaloonRouter = require("./routes/saloon.js")
const BarberRouter = require("./routes/barber.js")


var router = express.Router();

app.use(router);
app.use(express.json());

app.use("/user", UserRouter);
app.use("/owner", OwnerRouter);
app.use("/saloon", SaloonRouter);
app.use("/barber", BarberRouter);

  
  db.Owner.hasMany(db.Saloon,{foreignKey: "owner_id"});
  db.Saloon.belongsTo(db.Owner,{foreignKey: "owner_id"})

  db.Saloon.hasOne(db.Barber,{foreignKey: "saloon_id"});
  db.Barber.belongsTo(db.Saloon,{foreignKey: "saloon_id"})


db.sequelize.sync().then((req) => {
  app.listen(5000, () => {
    console.log("App is listening to port 5000");
  });
}); 