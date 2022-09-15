const express = require("express");
const app = express();
const db = require("./models");

const path = require("path");
const UserRouter = require(__dirname + "/routes/user.js");
const isAbsolute = path.isAbsolute(__dirname + "/routes/user.js");
console.log("Is path Absolute? ", isAbsolute);
const OwnerRouter = require("./routes/owner.js");
const SaloonRouter = require("./routes/saloon.js");
const BarberRouter = require("./routes/barber.js");

const logger = require("./config/logger.js");
const morgan = require("morgan");

var router = express.Router();

const { I18n } = require("i18n");

const i18n = new I18n();

/**
 * later in code configure
 */
i18n.configure({
  locales: ["en", "de"],
  directory: path.join(__dirname, "locales"),
});
app.use(i18n.init);

// const i18next = require("i18next");
// const middleware = require("i18next-http-middleware");
// const Backend = require("i18next-fs-backend");
// app.use(middleware.handle(i18next));
// i18next
//   .use(Backend)
//   .use(middleware.LanguageDetector)
//   .init({
//     fallbackLng: "en",
//     defaultLocale: "en",
//     header: "accept-language",
//     backend: {
//       loadPath: "./locales/en/en.json",
//     },
//   });

app.use(router);
app.use(express.json());
app.use(morgan("tiny", ":method :url"));

app.use("/user", UserRouter);
app.use("/owner", OwnerRouter);
app.use("/saloon", SaloonRouter);
app.use("/barber", BarberRouter);

db.Owner.hasMany(db.Saloon, { foreignKey: "owner_id" });
db.Saloon.belongsTo(db.Owner, { foreignKey: "owner_id" });

db.Saloon.hasOne(db.Barber, { foreignKey: "saloon_id" });
db.Barber.belongsTo(db.Saloon, { foreignKey: "saloon_id" });

db.sequelize.sync().then((req) => {
  app.listen(5000, () => {
    // logger.info("App is listening to port 5000");
  });
});
