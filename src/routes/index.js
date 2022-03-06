const router = require('express').Router();

const BrandRouter = require('./brand');
const RoleRouter = require('./role');
const vehicleType = require('./VehicleType');
const Vehicle = require('./vehicle');
const VehicleCode = require('./vehicleCode');
const User = require('./user');
const UserReport = require('./userReport');
const transaction = require('./transaction');
const auth = require('./Auth');
const profile = require('./userProfile')






router.use('/brand', BrandRouter);
router.use('/role', RoleRouter);
router.use('/vehicleType', vehicleType);
router.use('/vehicle', Vehicle);
router.use('/vehicleCode', VehicleCode);
router.use('/user', User);
router.use('/userReport', UserReport);
router.use('/transaction', transaction);
router.use('/auth', auth);
router.use('/userprofile',profile)



module.exports = router;