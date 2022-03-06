const router = require('express').Router();



const home = require('./home');
const categories = require('./categories');



router.use('/',categories)


router.use('/',home)


module.exports = router;
