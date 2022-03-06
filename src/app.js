const express = require("express");
const { join } = require("path");
const path = require("path")
const expressHBS = require("express-handlebars");


const session = require("express-session");

require('dotenv').config();

const router = require('./routes');
const webRouter = require('./routes/web')
const cors = require('cors')


const sequelize = require("./database/config/database");
const user = require("./models/user");
const brand = require("./models/brand");
const role = require("./models/role");
const transaction = require("./models/transaction");
const userReport = require("./models/userReport");
const vecTran = require("./models/vecTran");
const vehicle = require("./models/vehicle");
const vehicleCode = require("./models/vehicleCode");
const vehicleType = require("./models/vehicleType");
const multer = require("multer");

vehicle.belongsTo(brand);
vehicle.belongsTo(vehicleType);
vehicleType.hasMany(vehicle);
user.belongsTo(role, {
    foreignKey: 'role_id'
});
transaction.belongsTo(user, {
    foreignKey: 'user_id'
});

transaction.belongsToMany(vehicleCode, { through: vecTran })
vehicleCode.belongsToMany(transaction, { through: vecTran })

userReport.belongsTo(user, {
    foreignKey: 'user_id'
});
vehicle.hasMany(vehicleCode, {
    foreignKey: 'vehicle_id'

})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', expressHBS());
app.set('view engine', 'handlebars');
app.set("views", join(__dirname, "views"));
app.use(cors())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true
}));
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
//   });
// app.use(
//     multer({ storage: fileStorage, }).single('image')
// );
app.use(express.static(join(__dirname, '..', 'public')))
app.use(express.static(join(__dirname, 'admin-panel', 'public')))
app.use('/images', express.static(path.join('images')));


app.use('/api', router);
app.use('/web', webRouter);
app.use(express.static(join(__dirname, '..', 'admin-panel', 'build')))
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'admin-panel', 'build', 'index.html'));
});


app.get("/a", (req, res) => {
    res.write("<h1> haaaaaaaaaaaaaaai</>");
});

sequelize
    .sync()
    .then((results) => {
        // console.log(results);
        console.log('hakuna matata');

    })
    .catch((err) => {
        console.log(err);
    });
console.log(express.static('public'));

// app.use()
app.set("port", process.env.PORT || 3000);
module.exports = app;